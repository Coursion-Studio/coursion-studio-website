(function () {
  var SIZES = { mac: [880, 550], phone: [300, 620] };
  var defs = {};
  var runs = new Map();

  function wait(ms, signal) {
    return new Promise(function (resolve, reject) {
      if (signal.aborted) return reject(signal.reason);
      var t = setTimeout(resolve, ms);
      signal.addEventListener("abort", function () { clearTimeout(t); reject(signal.reason); }, { once: true });
    });
  }

  async function type(el, text, signal, cps) {
    var gap = 1000 / (cps || 16);
    el.textContent = "";
    for (var i = 0; i < text.length; i++) {
      el.textContent += text[i];
      await wait(gap, signal);
    }
  }

  function fit() {
    document.querySelectorAll(".scene").forEach(function (s) {
      var box = s.parentElement;
      if (!box) return;
      var size = SIZES[s.dataset.kind] || SIZES.mac;
      var top = parseFloat(getComputedStyle(box).getPropertyValue("--scene-top")) || 52;
      var bottom = parseFloat(getComputedStyle(box).getPropertyValue("--scene-bottom")) || 110;
      var k = Math.min(box.clientWidth / size[0], (box.clientHeight - top - bottom) / size[1], 1.15);
      s.style.setProperty("--k", Math.max(k, 0.2).toFixed(4));
    });
  }

  function mount(root) {
    var def = defs[root.dataset.demo];
    if (!def || root.dataset.mounted) return;
    root.dataset.kind = def.kind || "mac";
    root.innerHTML = def.html;
    root.dataset.mounted = "1";
    fit();
  }

  function setCaption(cap, def, i) {
    if (!cap) return;
    var text = cap.querySelector("[data-cap-text]");
    var dots = cap.querySelector("[data-cap-dots]");
    text.textContent = i < 0 ? def.summary || "" : def.steps[i].caption;
    dots.innerHTML = def.steps.map(function (_, j) { return "<i" + (j === i ? ' class="on"' : "") + "></i>"; }).join("");
    cap.style.opacity = "1";
  }

  async function sequence(root, def, cap, signal, loop) {
    do {
      if (def.reset) def.reset(root);
      root.dataset.step = "0";
      await wait(60, signal);
      for (var i = 0; i < def.steps.length; i++) {
        var step = def.steps[i];
        root.dataset.step = String(i + 1);
        setCaption(cap, def, i);
        var work = step.run ? step.run(root, signal) : null;
        await Promise.all([work, wait(step.dur || 2200, signal)]);
      }
      await wait(def.hold || 1400, signal);
      if (loop.done) loop.done();
    } while (loop.again);
  }

  function stop(box) {
    runs.forEach(function (r, key) {
      if (box && key !== box) return;
      r.abort("stop");
      runs.delete(key);
    });
  }

  function play(root, cap, opts) {
    stop(root.parentElement);
    var def = defs[root.dataset.demo];
    if (!def) return;
    mount(root);
    if (opts && opts.still) {
      if (def.reset) def.reset(root);
      root.dataset.step = String(def.steps.length);
      if (def.still) def.still(root);
      setCaption(cap, def, -1);
      return;
    }
    var ctrl = new AbortController();
    var loop = { again: !(opts && opts.onDone), done: opts && opts.onDone };
    runs.set(root.parentElement, ctrl);
    sequence(root, def, cap, ctrl.signal, loop).catch(function () {});
  }

  window.addEventListener("resize", fit);
  window.Demos = {
    register: function (id, def) { defs[id] = def; },
    mountAll: function () { document.querySelectorAll(".scene[data-demo]").forEach(mount); },
    play: play,
    stop: stop,
    fit: fit,
    wait: wait,
    type: type
  };
})();
