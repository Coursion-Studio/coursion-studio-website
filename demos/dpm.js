(function () {
  var N = 60;
  var SPIKE = 47;
  var METRICS = {
    mem: { min: 150, max: 330 },
    cpu: { min: 0, max: 80 },
    fps: { min: 20, max: 64 }
  };

  function bump(i, c, w) { return Math.exp(-((i - c) * (i - c)) / w); }
  var DATA = { mem: [], cpu: [], fps: [], thr: [] };
  for (var i = 0; i < N; i++) {
    var s = i < 44 ? 0 : 66 * (1 - Math.exp(-(i - 43) / 1.2));
    var rel = i < 52 ? 0 : 26 * (1 - Math.exp(-(i - 51) / 2));
    DATA.mem.push(182 + i * 0.45 + Math.sin(i * 1.3) * 1.3 + s - rel);
    DATA.cpu.push(9 + Math.sin(i * 0.9) * 2 + 52 * bump(i, 46, 8));
    DATA.fps.push(59.3 + Math.sin(i * 1.7) * 0.6 - 24 * bump(i, 47, 6));
    DATA.thr.push(41 + Math.floor(i / 12) + (i > 46 ? 3 : 0));
  }

  function plot(title, sub, key, color, cls, ylabels, legend) {
    return '<div class="dp-panel dp-' + key + ' ' + cls + '">' +
      '<div class="dp-ph"><b>' + title + '</b><small>' + sub + '</small><span class="dp-leg" style="--c:' + color + '"><i></i>' + legend + '</span></div>' +
      '<div class="dp-y">' + ylabels.map(function (y) { return '<span>' + y + '</span>'; }).join("") + '</div>' +
      '<div class="dp-plot" style="--c:' + color + '">' +
        '<svg viewBox="0 0 100 100" preserveAspectRatio="none"><path class="a"/><path class="l"/></svg>' +
        '<i class="dp-dot"></i>' +
        '<div class="dp-flag dp-flag-' + key + '"><span></span></div>' +
      '</div></div>';
  }

  var html =
    '<div class="mw dp-win">' +
      '<div class="mw-bar"><span class="mw-lights"><i></i><i></i><i></i></span>Device Performance Monitor</div>' +
      '<div class="mw-body dp-body">' +
        '<div class="dp-head">' +
          '<img src="assets/icons/dpm.webp" alt="" width="34" height="34" />' +
          '<div class="dp-app"><b>Shop</b><small>com.example.shop</small></div>' +
          '<span class="dp-live"><i></i>Live</span>' +
        '</div>' +
        '<div class="dp-bar">' +
          '<div class="dp-lab"><small>Platform</small><div class="dp-seg"><span class="on">Android</span><span>iOS Simulator</span><span>iPhone / iPad</span></div></div>' +
          '<div class="dp-lab"><small>Device</small><div class="dp-dev"><span class="dp-none">No device found</span><span class="dp-name">Pixel 9 Pro · Android 15</span></div></div>' +
          '<div class="dp-lab dp-every"><small>Sample every</small><div class="dp-seg"><span class="on">1s</span><span>2s</span><span>5s</span></div></div>' +
        '</div>' +
        '<div class="dp-toast"><span class="dp-ph-ic"></span>Pixel 9 Pro connected over USB</div>' +
        '<div class="dp-cards">' +
          '<div class="dp-card" style="--c:#5cc8ff"><small>App memory</small><b><span data-v="mem">—</span><em>MB</em></b></div>' +
          '<div class="dp-card" style="--c:#c79bff"><small>App CPU</small><b><span data-v="cpu">—</span><em>%</em></b></div>' +
          '<div class="dp-card dp-fpsc" style="--c:#5be7b0"><small>Frame rate</small><b><span data-v="fps">—</span><em>fps</em></b><u>Jank</u></div>' +
          '<div class="dp-card" style="--c:#ffc46b"><small>Threads</small><b><span data-v="thr">—</span></b></div>' +
        '</div>' +
        plot("Memory over time", "Live samples from the device", "mem", "#5cc8ff", "dp-big", ["330", "240", "150"], "App memory") +
        plot("CPU", "Share of one core", "cpu", "#c79bff", "dp-sm", ["80%", "40", "0"], "App CPU") +
        plot("Frames per second", "Target 60", "fps", "#5be7b0", "dp-sm dp-fps2", ["60", "40", "20"], "FPS") +
      '</div>' +
    '</div>';

  function clear(root) {
    root.className = root.className.replace(/\bdp-on-\S+/g, "").replace(/\s+/g, " ").trim();
  }
  function on(root, c) { root.classList.add("dp-on-" + c); }

  function xy(key, i, v) {
    var m = METRICS[key];
    return [(i / (N - 1)) * 100, 100 - ((v - m.min) / (m.max - m.min)) * 100];
  }

  function draw(root, upto) {
    ["mem", "cpu", "fps"].forEach(function (key) {
      var panel = root.querySelector(".dp-panel.dp-" + key);
      var l = panel.querySelector(".l"), a = panel.querySelector(".a"), dot = panel.querySelector(".dp-dot");
      if (upto < 1) { l.setAttribute("d", ""); a.setAttribute("d", ""); dot.style.opacity = "0"; return; }
      var d = "";
      for (var i = 0; i < upto; i++) {
        var p = xy(key, i, DATA[key][i]);
        d += (i ? "L" : "M") + p[0].toFixed(2) + " " + p[1].toFixed(2);
      }
      var last = xy(key, upto - 1, DATA[key][upto - 1]);
      l.setAttribute("d", d);
      a.setAttribute("d", d + "L" + last[0].toFixed(2) + " 100L0 100Z");
      dot.style.opacity = "1";
      dot.style.left = last[0] + "%";
      dot.style.top = last[1] + "%";
    });
    if (upto > 0) {
      var k = upto - 1;
      root.querySelector('[data-v="mem"]').textContent = DATA.mem[k].toFixed(1);
      root.querySelector('[data-v="cpu"]').textContent = DATA.cpu[k].toFixed(1);
      root.querySelector('[data-v="fps"]').textContent = String(Math.round(DATA.fps[k]));
      root.querySelector('[data-v="thr"]').textContent = String(DATA.thr[k]);
    }
  }

  async function stream(root, from, to, gap, signal) {
    for (var i = from; i <= to; i++) {
      draw(root, i + 1);
      if (i === SPIKE) on(root, "warn");
      await Demos.wait(gap, signal);
    }
  }

  Demos.register("dpm", {
    kind: "mac",
    summary: "Plug in a phone and watch its memory, CPU and frame rate stream in live. A frame drop or memory spike is flagged right on the timeline.",
    html: html,
    reset: function (root) {
      clear(root);
      on(root, "nt");
      draw(root, 0);
      ["mem", "cpu", "fps", "thr"].forEach(function (k) { root.querySelector('[data-v="' + k + '"]').textContent = "—"; });
      void root.offsetWidth;
    },
    steps: [
      {
        caption: "Plug in a phone and it connects",
        dur: 3000,
        run: async function (root, signal) {
          root.classList.remove("dp-on-nt");
          await Demos.wait(350, signal);
          on(root, "toast");
          await Demos.wait(700, signal);
          on(root, "live");
          draw(root, 1);
          await Demos.wait(1200, signal);
          root.classList.remove("dp-on-toast");
        }
      },
      {
        caption: "Memory, CPU and FPS stream in live",
        dur: 3700,
        run: async function (root, signal) {
          await stream(root, 1, 34, 105, signal);
        }
      },
      {
        caption: "Spikes and drops get flagged",
        dur: 3900,
        run: async function (root, signal) {
          await stream(root, 35, 46, 125, signal);
          on(root, "flags");
          await stream(root, 47, N - 1, 85, signal);
        }
      }
    ],
    still: function (root) {
      on(root, "live");
      on(root, "flags");
      on(root, "warn");
      draw(root, N);
    },
    hold: 1800
  });
})();
