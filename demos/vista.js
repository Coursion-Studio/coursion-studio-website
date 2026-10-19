(function () {
  var BASE = "assets/demos/vista/";
  var LT_KEY = "body.shoulders";
  var lottieState = 0;
  var EYES = [["Find the furthest thing you can see", 6], ["Let your eyes rest on it", 8], ["Soften your jaw and shoulders", 6]];
  var BODY = [["Roll your shoulders back, ten times", 30], ["Open your chest, hands behind you", 30], ["Drop your ears to each shoulder", 40]];

  var EYE = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 5.5C6.8 5.5 3.2 9.6 2 12c1.2 2.4 4.8 6.5 10 6.5S20.8 14.4 22 12c-1.2-2.4-4.8-6.5-10-6.5zm0 10.3a3.8 3.8 0 1 1 0-7.6 3.8 3.8 0 0 1 0 7.6zm0-2a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6z"/></svg>';
  var APPLE = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9-.7 0-1.8-.9-3-.8-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.3.9-1.3 1.3-2.6 1.3-2.6s-2.5-1-2.5-3.8zM14.1 5.8c.6-.8 1.1-1.8 1-2.8-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.7-1 2.7 1 .1 2-.5 2.7-1.3z"/></svg>';
  var WIFI = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M3 9.5a13 13 0 0 1 18 0M6.2 13a8.5 8.5 0 0 1 11.6 0M9.4 16.4a4 4 0 0 1 5.2 0"/><circle cx="12" cy="19.4" r="1.2" fill="currentColor" stroke="none"/></svg>';
  var CLOCK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>';
  var SNOOZE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3"/><path d="M4 4.5v3.7h3.7"/><path d="M12 8.5V12l2.5 1.5"/></svg>';
  var SKIP = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.5 6.2v11.6a.8.8 0 0 0 1.2.7L13 13v4.8a.8.8 0 0 0 1.2.7l8.6-5.8a.8.8 0 0 0 0-1.4l-8.6-5.8a.8.8 0 0 0-1.2.7V11L4.7 5.5a.8.8 0 0 0-1.2.7z"/></svg>';
  var CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>';
  var LOCK = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 10V7.5a5 5 0 0 1 10 0V10h.5A1.5 1.5 0 0 1 19 11.5v8a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 19.5v-8A1.5 1.5 0 0 1 6.5 10zm2.2 0h5.6V7.5a2.8 2.8 0 0 0-5.6 0z"/></svg>';

  function dial() {
    var out = "";
    for (var i = 0; i < 60; i++) {
      var a = i / 60 * 2 * Math.PI, o = 83, n = o - (i % 5 === 0 ? 7 : 3.5);
      out += '<line x1="' + (100 + Math.cos(a) * n).toFixed(2) + '" y1="' + (100 + Math.sin(a) * n).toFixed(2) + '" x2="' + (100 + Math.cos(a) * o).toFixed(2) + '" y2="' + (100 + Math.sin(a) * o).toFixed(2) + '"/>';
    }
    return out;
  }

  function hills(base, amp, waves) {
    var seg = 320 / waves, d = "M0 150 L0 " + base;
    for (var i = 0; i < waves; i++) d += " Q" + (i * seg + seg / 2) + " " + (base - amp * 2) + " " + ((i + 1) * seg) + " " + base;
    return d + " L320 150 Z";
  }

  var horizon =
    '<svg class="vi-hz" viewBox="0 0 320 150"><defs><radialGradient id="vi-hz-e" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#fff"/><stop offset="0.62" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>' +
    '<mask id="vi-hz-m" maskUnits="userSpaceOnUse" x="0" y="0" width="320" height="150"><rect width="320" height="150" fill="url(#vi-hz-e)"/></mask></defs>' +
    '<g mask="url(#vi-hz-m)"><path d="' + hills(92, 7, 3) + '" fill="rgba(58,158,255,0.14)"/><path d="' + hills(124, 12, 2) + '" fill="rgba(58,158,255,0.28)"/>' +
    '<circle class="vi-sun" cx="112" cy="42" r="10" fill="rgba(58,158,255,0.3)"/><circle class="vi-focus" cx="0" cy="0" r="14" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="2"/></g></svg>';

  function pips(n) {
    var s = "";
    for (var i = 0; i < n; i++) s += "<i><b></b></i>";
    return '<div class="vi-pips">' + s + "</div>";
  }

  function msg(kind, cls, label, head, detail, scene, first) {
    return '<div class="vi-msg ' + cls + '"><p class="vi-kind">' + label + '</p><h4 class="vi-head">' + head + '</h4><p class="vi-detail">' + detail + '</p>' +
      '<div class="vi-scene">' + scene + '</div><p class="vi-step" data-vi="' + kind + '-step">' + first + "</p>" + pips(3) + "</div>";
  }

  var html =
    '<div class="vi-screen">' +
      '<div class="vi-desk">' +
        '<div class="vi-menubar"><span class="vi-mb-l">' + APPLE + '<b>Notes</b><span>File</span><span>Edit</span><span>Format</span><span>View</span><span>Window</span></span>' +
          '<span class="vi-mb-r"><span class="vi-item">' + EYE + '<span class="vi-item-l">Next eye break</span><b data-vi="mb">0:03</b></span>' + WIFI + '<span data-vi="mbclock">Mon 9:41</span></span></div>' +
        '<div class="vi-win vi-w1"><span class="vi-lights"><i></i><i></i><i></i></span><div class="vi-doc"><h5>Launch notes</h5>' +
          '<p>Ship the onboarding copy by Thursday</p><p>Ask Maya about the pricing page</p><p>Record the walkthrough video</p><p class="vi-type"><span data-vi="line"></span></p></div></div>' +
        '<div class="vi-win vi-w2"><span class="vi-lights"><i></i><i></i><i></i></span><span class="vi-blk"></span><span class="vi-ln"></span><span class="vi-ln" style="width:62%"></span><span class="vi-ln" style="width:80%"></span></div>' +
        '<div class="vi-dock"><i style="--c:#3A9EFF"></i><i style="--c:#FF7A59"></i><i style="--c:#2ECC71"></i><i style="--c:#FEBC2E"></i><i style="--c:#A78BFA"></i><img src="' + BASE + 'vista-icon.webp" alt="" /></div>' +
        '<div class="vi-pop">' +
          '<div class="vi-pop-h"><img src="' + BASE + 'vista-icon.webp" alt="" /><div><b>Vista</b><span>Best run 9 days</span></div><span class="vi-pill"><img src="' + BASE + 'streak.webp" alt="" />4 d</span></div>' +
          '<div class="vi-card vi-c-eyes"><img src="' + BASE + 'eye-break.webp" alt="" /><div><b>Eye break</b><span>Next in <em>20:00</em></span></div><small data-vi="eyetally">5 today</small></div>' +
          '<div class="vi-card vi-c-body"><img src="' + BASE + 'move-break.webp" alt="" /><div><b>Move break</b><span>Next in <em>45:00</em></span></div><small data-vi="bodytally">2 today</small></div>' +
          '<p class="vi-pop-f" data-vi="today">7 breaks today · 4 day streak</p>' +
        '</div>' +
      '</div>' +
      '<div class="vi-dim"></div>' +
      '<div class="vi-ui">' +
        '<p class="vi-clock">' + CLOCK + '<span data-vi="clock">9:41</span></p>' +
        '<div class="vi-mid">' +
          msg("eyes", "vi-m-eyes", "Eye break", "Look out the window", "Find the furthest thing you can see and rest on it. Six metres or more lets the focusing muscle finally let go.", horizon, EYES[0][0]) +
          msg("body", "vi-m-body", "Move break", "Open your chest", "Hands behind your head, elbows wide, look up. Hold thirty seconds. Undoes an hour of hunching over a keyboard.",
            '<div class="vi-lt"><img class="vi-lt-fb" src="' + BASE + 'move-break.webp" alt="" /><div class="vi-lt-stage"></div></div>', BODY[0][0]) +
        '</div>' +
        '<div class="vi-ring"><svg viewBox="0 0 200 200"><circle class="vi-track" cx="100" cy="100" r="96"/><g class="vi-dial">' + dial() + '</g>' +
          '<circle class="vi-prog" cx="100" cy="100" r="96" pathLength="1"/><g class="vi-dot"><circle class="vi-dot-o" cx="196" cy="100" r="5.5"/><circle class="vi-dot-i" cx="196" cy="100" r="2.5"/></g></svg>' +
          '<span class="vi-time" data-vi="time">0:20</span></div>' +
        '<div class="vi-ctl"><div class="vi-btns">' +
          '<span class="vi-btn vi-b-snooze">' + SNOOZE + '<span>Snooze 5 min</span></span>' +
          '<span class="vi-btn vi-b-skip" data-vi="skip">' + SKIP + '<span>Skip in 5</span></span>' +
          '<span class="vi-btn vi-b-lock">' + LOCK + '<span>Lock screen</span></span>' +
          '<span class="vi-btn vi-b-done"><span>Back to work</span></span>' +
        '</div><p class="vi-foot"><span>Press</span><kbd>esc</kbd><span data-vi="esc">twice to snooze the break</span></p></div>' +
      '</div>' +
    '</div>';

  function q(root, k) { return root.querySelector('[data-vi="' + k + '"]'); }

  function clock(s) {
    s = Math.max(0, s);
    return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
  }

  function stepAt(steps, e) {
    var t = 0;
    for (var i = 0; i < steps.length; i++) {
      t += steps[i][1];
      if (e < t) return i;
    }
    return steps.length - 1;
  }

  function paint(root, kind, e, total) {
    var steps = kind === "eyes" ? EYES : BODY;
    var box = root.querySelector(".vi-m-" + kind);
    var bars = box.querySelectorAll(".vi-pips b");
    var off = e;
    steps.forEach(function (s, i) {
      var f = Math.max(0, Math.min(1, off / s[1]));
      off -= s[1];
      bars[i].style.transform = "scaleX(" + f + ")";
    });
    var line = q(root, kind + "-step");
    var text = steps[stepAt(steps, e)][0];
    if (line.textContent !== text) {
      line.textContent = text;
      line.classList.remove("vi-in");
      void line.offsetWidth;
      line.classList.add("vi-in");
    }
    var left = total - e;
    q(root, "time").textContent = clock(left);
    q(root, "time").classList.toggle("vi-urgent", left <= 5);
    root.style.setProperty("--vi-p", (e / total).toFixed(4));
    var skip = q(root, "skip");
    var esc = q(root, "esc");
    if (e / total >= 0.75) {
      skip.innerHTML = CHECK + "<span>End break</span>";
      skip.classList.remove("vi-off");
    } else {
      skip.innerHTML = SKIP + "<span>" + (e < 5 ? "Skip in " + (5 - e) : "Skip break") + "</span>";
      skip.classList.toggle("vi-off", e < 5);
    }
    esc.textContent = e < 5 ? "twice to snooze the break" : "twice to skip the break";
  }

  function inject(src, ok, fail) {
    var s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = ok;
    s.onerror = fail;
    document.head.appendChild(s);
  }

  function loadLottie(root) {
    if (lottieState) return;
    lottieState = 1;
    var fail = function () { lottieState = 3; };
    inject(BASE + "lottie_light.min.js", function () {
      inject(BASE + LT_KEY + ".js", function () {
        try {
          var data = window.ViLottie && window.ViLottie[LT_KEY];
          if (!window.lottie || !data) return fail();
          var box = root.querySelector(".vi-lt");
          var anim = window.lottie.loadAnimation({
            container: box.querySelector(".vi-lt-stage"), renderer: "svg", loop: true, autoplay: false,
            animationData: data, rendererSettings: { preserveAspectRatio: "xMidYMid meet" }
          });
          anim.addEventListener("DOMLoaded", function () {
            root._viAnim = anim;
            lottieState = 2;
            box.classList.add("vi-ready");
            if (root.dataset.step === "3" && root._viLive) anim.play();
            else anim.goToAndStop(Math.round(anim.totalFrames * 0.35), true);
          });
        } catch (e) { fail(); }
      }, fail);
    }, fail);
  }

  function stopLottie(root) {
    root._viLive = false;
    if (root._viAnim) root._viAnim.goToAndStop(Math.round(root._viAnim.totalFrames * 0.35), true);
  }

  function finished(root, on) {
    root.classList.toggle("vi-finished", on);
  }

  Demos.register("vista", {
    kind: "mac",
    summary: "Vista dims your screen for a 20-second eye break, then a guided move break every 45 minutes.",
    html: html,
    reset: function (root) {
      stopLottie(root);
      finished(root, false);
      q(root, "mb").textContent = "0:03";
      q(root, "mbclock").textContent = "Mon 9:41";
      q(root, "line").textContent = "";
      q(root, "clock").textContent = "9:41";
      q(root, "eyetally").textContent = "5 today";
      q(root, "bodytally").textContent = "2 today";
      q(root, "today").textContent = "7 breaks today · 4 day streak";
      root.querySelector(".vi-c-body").classList.remove("vi-bump");
      paint(root, "body", 0, 300);
      paint(root, "eyes", 0, 20);
    },
    steps: [
      {
        caption: "Vista counts down in your menu bar", dur: 3000,
        run: async function (root, signal) {
          loadLottie(root);
          var typing = Demos.type(q(root, "line"), "Book the user interviews", signal, 15);
          var t = ["0:02", "0:01", "now"];
          for (var i = 0; i < t.length; i++) {
            await Demos.wait(850, signal);
            q(root, "mb").textContent = t[i];
          }
          await typing;
        }
      },
      {
        caption: "A 20-second eye break takes over", dur: 3900,
        run: async function (root, signal) {
          await Demos.wait(450, signal);
          for (var e = 1; e <= 20; e++) {
            await Demos.wait(150, signal);
            paint(root, "eyes", e, 20);
          }
          finished(root, true);
        }
      },
      {
        caption: "Then a move break every 45 minutes", dur: 3500,
        run: async function (root, signal) {
          finished(root, false);
          q(root, "clock").textContent = "10:26";
          paint(root, "body", 0, 300);
          root._viLive = true;
          if (root._viAnim) root._viAnim.goToAndPlay(0, true);
          signal.addEventListener("abort", function () { stopLottie(root); }, { once: true });
          await Demos.wait(500, signal);
          for (var e = 1; e <= 11; e++) {
            await Demos.wait(260, signal);
            paint(root, "body", e, 300);
          }
        }
      },
      {
        caption: "Back to work, every break counted", dur: 2600,
        run: async function (root, signal) {
          if (root._viAnim) root._viAnim.pause();
          root._viLive = false;
          q(root, "mb").textContent = "20:00";
          q(root, "mbclock").textContent = "Mon 10:31";
          await Demos.wait(900, signal);
          q(root, "bodytally").textContent = "3 today";
          q(root, "today").textContent = "8 breaks today · 4 day streak";
          root.querySelector(".vi-c-body").classList.add("vi-bump");
        }
      }
    ],
    still: function (root) {
      root.dataset.step = "2";
      q(root, "mb").textContent = "now";
      q(root, "line").textContent = "Book the user interviews";
      paint(root, "eyes", 8, 20);
    },
    hold: 1400
  });
})();
