(function () {
  var LEAF = '<svg viewBox="0 0 24 24"><path d="M5 19C5 10 10 5 20 4c0 10-5 15-13 15z" fill="currentColor" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M6.5 17.5l7-7" stroke="rgba(255,255,255,.8)" stroke-width="1.5" stroke-linecap="round"/></svg>';
  var FLAME = '<svg viewBox="0 0 24 24"><path d="M12 2c1 4 6 6 6 12a6 6 0 0 1-12 0c0-3 2-5 3-6 0 2 1 3 2 3 0-4-1-6 1-9z" fill="currentColor"/></svg>';
  var DROP = '<svg viewBox="0 0 24 24"><path d="M12 2.5S5 10.5 5 15a7 7 0 0 0 14 0c0-4.5-7-12.5-7-12.5z" fill="currentColor"/></svg>';
  var CLOCK = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  var CHEV = '<svg class="sa-chev" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var BACK = '<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var SPARK = '<svg viewBox="0 0 24 24"><path d="M11 3c.8 5.2 2.8 7.2 8 8-5.2.8-7.2 2.8-8 8-.8-5.2-2.8-7.2-8-8 5.2-.8 7.2-2.8 8-8z" fill="currentColor"/><path d="M19 14c.3 2 1 2.7 3 3-2 .3-2.7 1-3 3-.3-2-1-2.7-3-3 2-.3 2.7-1 3-3z" fill="currentColor"/></svg>';
  var BODY = '<svg viewBox="0 0 24 24"><path d="M18.5 7A8 8 0 1 0 18.5 17" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>';
  var PULSE = '<svg viewBox="0 0 24 24"><path d="M2 13h4l3-8 4 15 3-9 2 2h4" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var GEAR = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="4.5" stroke-dasharray="3.6 2.68"/><circle cx="12" cy="12" r="6.2" fill="currentColor"/><circle cx="12" cy="12" r="2.6" fill="#fff"/></svg>';
  var X = '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>';
  var UP = '<svg viewBox="0 0 24 24"><path d="M12 19V5M6 11l6-6 6 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var RF = 2 * Math.PI * 78;
  var RB = 2 * Math.PI * 40;
  var PHASES = [
    { t: "Fat-burning mode", b: "Glycogen stores are draining. Your body shifts toward burning fat for fuel.", n: "Light ketosis", at: 12 },
    { t: "Light ketosis", b: "Liver starts making ketones. Mental clarity often kicks in around here.", n: "Autophagy ramping", at: 16 }
  ];
  var RINGS = [
    { k: "sl", v: 99, c: "#7C5CFF" },
    { k: "rc", v: 89, c: "url(#sa-gr)" },
    { k: "en", v: 79, c: "#F5B100" }
  ];
  var ANSWER = "Yes. Recovery is 89 and you slept well, so finish at 16h, then break it with protein first.";

  function q(root, k) { return root.querySelector('[data-sa="' + k + '"]'); }

  function ring(k, label) {
    return '<div class="sa-br sa-r' + k + '" data-sa="r' + k + '"><svg viewBox="0 0 100 100">' +
      '<circle class="sa-bd" cx="50" cy="50" r="48.5"/><circle class="sa-bt" cx="50" cy="50" r="40"/>' +
      '<circle class="sa-ba" cx="50" cy="50" r="40" transform="rotate(-90 50 50)"/><circle class="sa-bi" cx="50" cy="50" r="35"/>' +
      '<circle class="sa-bk" r="3.2"/></svg><div><b>0</b><small>' + label + '</small></div></div>';
  }

  function sup(id, tone, name, dose, stk, stkIcon, when) {
    return '<div class="sa-sup ' + tone + '" data-sa="c' + id + '"><div class="sa-st">' +
      '<i class="sa-leaf">' + LEAF + '</i><div class="sa-sn"><div><b>' + name + '</b>' +
      (stk ? '<span class="sa-stk">' + stkIcon + '<em data-sa="s' + id + '">' + stk + '</em></span>' : "") +
      '</div><small>' + dose + '</small></div><span class="sa-cnt" data-sa="n' + id + '">0/1</span></div>' +
      '<div class="sa-when">' + CLOCK + when + '</div><div class="sa-pb"><u></u></div></div>';
  }

  var html =
    '<div class="ph"><div class="ph-notch"></div><div class="ph-body sa-app">' +
      '<div class="sa-sb"><b>9:41</b><span><i class="sa-sig"><u></u><u></u><u></u><u></u></i><i class="sa-bat"></i></span></div>' +

      '<div class="sa-scr sa-pr">' +
        '<div class="sa-lvl"><i class="sa-gem">&#128142;</i><div class="sa-lm"><div class="sa-lt"><b>Lvl 56</b><span>&middot; Diamond</span><em data-sa="xp">860 / 2,016 XP</em></div><div class="sa-lb"><u data-sa="xpb"></u></div></div></div>' +
        '<div class="sa-frow" data-sa="frow"><i class="sa-tile"><i class="sa-orb"></i></i><div><b>Fasting &middot; 11h 40m in</b><small>4h 20m to go &middot; 73%</small></div>' + CHEV + '</div>' +
        '<div class="sa-stake"><i>&#128293;</i><span data-sa="stake">2 more to keep 2 streaks alive</span></div>' +
        '<div class="sa-sec sa-am"><i>&#9728;&#65039;</i><b>MORNING</b><em data-sa="am">2</em></div>' +
        sup(1, "sa-amb", "Vitamin D3", "2000 IU", "7d", FLAME, "Every day &middot; Morning") +
        sup(2, "sa-ros", "Creatine", "5 g", "33d", DROP, "Every day &middot; Morning") +
        '<div class="sa-sec sa-pm"><i>&#9925;</i><b>AFTERNOON</b><em>2</em></div>' +
        sup(3, "sa-amb", "Magnesium Glycinate", "400 mg", "", "", "Every day &middot; Evening") +
        '<i class="sa-fab">+</i>' +
      '</div>' +

      '<div class="sa-scr sa-bo">' +
        '<div class="sa-bh"><span>TUESDAY, OCTOBER 6</span><em>Updated just now</em></div>' +
        '<h4 class="sa-ttl">Your Score</h4><p class="sa-sub">Daily habits, fasting, and what your body is up to.</p>' +
        '<svg class="sa-defs" width="0" height="0"><defs><linearGradient id="sa-gr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8BDC3A"/><stop offset="1" stop-color="#10B981"/></linearGradient></defs></svg>' +
        '<div class="sa-rings">' + ring("sl", "SLEEP") + ring("rc", "RECOVERED") + ring("en", "ENERGY") + '</div>' +
        '<div class="sa-bio"><div class="sa-bt1"><i class="sa-dna">&#129516;</i><div class="sa-bm"><span>BIO AGE <i></i></span><b>29.8<small>yrs</small></b></div><em>&darr; 2.2y</em>' + CHEV + '</div>' +
          '<div class="sa-bbar"><i></i></div></div>' +
        '<div class="sa-th"><span>TODAY\'S TARGETS</span><em>&#9829; HEALTH LINKED</em></div>' +
        '<div class="sa-tg">' +
          '<div class="sa-tc sa-tst"><div class="sa-tt"><i>&#128095;</i><b>Steps</b></div><div class="sa-tv">2,351<small>steps</small></div><div class="sa-tb"><u></u></div></div>' +
          '<div class="sa-tc sa-tsl"><div class="sa-tt"><i>&#127769;</i><b>Sleep</b></div><div class="sa-tv">7h 49m</div><div class="sa-tb"><u></u></div></div>' +
        '</div>' +
      '</div>' +

      '<div class="sa-tabs">' +
        '<span class="sa-t1">' + LEAF + '<b>Protocol</b></span>' +
        '<span data-sa="tai">' + SPARK + '<b>AI</b></span>' +
        '<span class="sa-t3" data-sa="tbody">' + BODY + '<b>Body</b></span>' +
        '<span>' + PULSE + '<b>Pulse</b></span>' +
        '<span>' + GEAR + '<b>Settings</b></span>' +
      '</div>' +

      '<div class="sa-scr sa-fs">' +
        '<div class="sa-nav"><i class="sa-nb" data-sa="back">' + BACK + '</i><div class="sa-nt"><i>' + CLOCK + '</i><b>Fasting</b></div><i class="sa-nb">' + CLOCK + '</i></div>' +
        '<div class="sa-hero"><div class="sa-pill">' + CLOCK + '16:8 &middot; Manual</div>' +
          '<div class="sa-ring"><svg viewBox="0 0 200 200"><circle class="sa-rd" cx="100" cy="100" r="98"/><circle class="sa-rt" cx="100" cy="100" r="78"/>' +
            '<circle class="sa-ra" data-sa="arc" cx="100" cy="100" r="78" transform="rotate(-90 100 100)"/><circle class="sa-ri" cx="100" cy="100" r="64"/>' +
            '<circle class="sa-rk" data-sa="knob" r="5.5"/></svg>' +
            '<div class="sa-rc"><i class="sa-orb"></i><b data-sa="ft">11h 40m</b><small data-sa="fl">4h 20m left &middot; 73%</small></div></div>' +
          '<div class="sa-end"><i></i>End fast</div></div>' +
        '<div class="sa-ph" data-sa="ph"><div class="sa-pt"><i class="sa-orb"></i><div><span>CURRENT PHASE</span><b data-sa="pt"></b><small data-sa="pb"></small></div></div>' +
          '<div class="sa-nx"><span>NEXT</span><i>&#129516;</i><b data-sa="pn"></b></div></div>' +
        '<div class="sa-tl">' +
          '<div class="sa-o"><i>&#128293;</i><b>9</b><small>STREAK</small></div>' +
          '<div class="sa-y"><i>&#127942;</i><b>17</b><small>LONGEST</small></div>' +
          '<div class="sa-g"><i>&#9989;</i><b>37</b><small>FASTS</small></div>' +
          '<div class="sa-v"><i>&#9201;&#65039;</i><b>608h</b><small>TOTAL</small></div>' +
        '</div>' +
      '</div>' +

      '<div class="sa-scr sa-ai">' +
        '<div class="sa-nav"><i class="sa-nb">' + X + '</i><div class="sa-nt sa-ait"><i>' + SPARK + '</i><b>Sage</b></div><i class="sa-sp"></i></div>' +
        '<div class="sa-me" data-sa="me">Should I push my fast to 16h today?</div>' +
        '<div class="sa-bot" data-sa="bot"><i class="sa-av">' + SPARK + '</i><p data-sa="ans"></p></div>' +
        '<div class="sa-foot"><div class="sa-chips"><span>&#127822; Today\'s macros?</span><span>&#129372; Smart snack now</span></div>' +
          '<small>AI guidance for general wellness, not medical advice.</small>' +
          '<div class="sa-in"><span>Ask anything about food, fasting, or your stack&hellip;</span><i>' + UP + '</i></div></div>' +
      '</div>' +

      '<i class="sa-tap" data-sa="tap"></i>' +
    '</div></div>';

  function fmt(min) { return Math.floor(min / 60) + "h " + String(min % 60).padStart(2, "0") + "m"; }

  function setFast(root, min) {
    var p = min / 960;
    q(root, "arc").style.strokeDashoffset = (RF * (1 - p)).toFixed(2);
    var a = p * 2 * Math.PI - Math.PI / 2;
    var k = q(root, "knob");
    k.setAttribute("cx", (100 + 78 * Math.cos(a)).toFixed(2));
    k.setAttribute("cy", (100 + 78 * Math.sin(a)).toFixed(2));
    q(root, "ft").textContent = fmt(min);
    q(root, "fl").textContent = fmt(960 - min) + " left · " + Math.round(p * 100) + "%";
    var ph = min >= 720 ? PHASES[1] : PHASES[0];
    var pt = q(root, "pt");
    if (pt.textContent !== ph.t) {
      var box = q(root, "ph");
      var first = !pt.textContent;
      pt.textContent = ph.t;
      q(root, "pb").textContent = ph.b;
      box.classList.remove("sa-flip");
      if (!first) {
        void box.offsetWidth;
        box.classList.add("sa-flip");
      }
    }
    q(root, "pn").textContent = ph.n + " · in " + ((ph.at * 60 - min) / 60).toFixed(1) + "h";
  }

  function setRings(root, f) {
    RINGS.forEach(function (r) {
      var el = q(root, "r" + r.k);
      var p = (r.v / 100) * f;
      var arc = el.querySelector(".sa-ba");
      arc.style.stroke = r.c;
      arc.style.strokeDashoffset = (RB * (1 - p)).toFixed(2);
      var a = p * 2 * Math.PI - Math.PI / 2;
      var kn = el.querySelector(".sa-bk");
      kn.setAttribute("cx", (50 + 40 * Math.cos(a)).toFixed(2));
      kn.setAttribute("cy", (50 + 40 * Math.sin(a)).toFixed(2));
      el.querySelector("b").textContent = Math.round(r.v * f);
    });
  }

  function tick(root, i, on) {
    q(root, "c" + i).classList.toggle("on", on);
    q(root, "n" + i).textContent = on ? "1/1" : "0/1";
  }

  function bump(el) {
    el.classList.remove("sa-bump");
    void el.offsetWidth;
    el.classList.add("sa-bump");
  }

  async function tap(root, el, signal) {
    var body = root.querySelector(".ph-body");
    var k = parseFloat(root.style.getPropertyValue("--k")) || 1;
    var b = body.getBoundingClientRect();
    var r = el.getBoundingClientRect();
    var t = q(root, "tap");
    t.style.setProperty("--x", ((r.left + r.width / 2 - b.left) / k).toFixed(1) + "px");
    t.style.setProperty("--y", ((r.top + r.height / 2 - b.top) / k).toFixed(1) + "px");
    t.classList.add("on");
    await Demos.wait(520, signal);
    t.classList.add("press");
    await Demos.wait(170, signal);
    t.classList.remove("press");
  }

  function reset(root) {
    root.classList.remove("sa-f", "sa-b", "sa-a");
    [1, 2, 3].forEach(function (i) { tick(root, i, false); });
    q(root, "s1").textContent = "7d";
    q(root, "s2").textContent = "33d";
    q(root, "xp").textContent = "860 / 2,016 XP";
    q(root, "xpb").style.width = "42.7%";
    q(root, "stake").textContent = "2 more to keep 2 streaks alive";
    q(root, "am").textContent = "2";
    q(root, "pt").textContent = "";
    setFast(root, 700);
    setRings(root, 0);
    q(root, "me").classList.remove("on");
    q(root, "bot").classList.remove("on");
    q(root, "ans").textContent = "";
    var t = q(root, "tap");
    t.classList.remove("on", "press");
    t.style.setProperty("--x", "220px");
    t.style.setProperty("--y", "470px");
    root.querySelectorAll(".sa-bump").forEach(function (e) { e.classList.remove("sa-bump"); });
  }

  Demos.register("sage", {
    kind: "phone",
    summary: "Sage: tick off your stack, watch your fast move through each phase, and read your body score.",
    html: html,
    reset: reset,
    steps: [
      {
        caption: "Tick off your stack, keep the streak",
        dur: 3000,
        run: async function (root, signal) {
          await Demos.wait(250, signal);
          await tap(root, q(root, "n1"), signal);
          tick(root, 1, true);
          q(root, "s1").textContent = "8d";
          bump(q(root, "s1").parentNode);
          q(root, "xp").textContent = "870 / 2,016 XP";
          q(root, "xpb").style.width = "43.2%";
          q(root, "stake").textContent = "1 more to keep Creatine alive";
          q(root, "am").textContent = "1";
          await Demos.wait(450, signal);
          await tap(root, q(root, "n2"), signal);
          tick(root, 2, true);
          q(root, "s2").textContent = "34d";
          bump(q(root, "s2").parentNode);
          q(root, "xp").textContent = "880 / 2,016 XP";
          q(root, "xpb").style.width = "43.7%";
          q(root, "stake").textContent = "All streaks safe today";
          q(root, "am").textContent = "0";
        }
      },
      {
        caption: "See which fasting phase you're in",
        dur: 3300,
        run: async function (root, signal) {
          await tap(root, q(root, "frow"), signal);
          root.classList.add("sa-f");
          q(root, "tap").classList.remove("on");
          await Demos.wait(500, signal);
          for (var m = 700; m <= 840; m += 10) {
            setFast(root, m);
            await Demos.wait(130, signal);
          }
        }
      },
      {
        caption: "Sleep, recovery and energy, scored",
        dur: 3300,
        run: async function (root, signal) {
          await tap(root, q(root, "back"), signal);
          root.classList.remove("sa-f");
          await Demos.wait(380, signal);
          await tap(root, q(root, "tbody"), signal);
          root.classList.add("sa-b");
          q(root, "tap").classList.remove("on");
          await Demos.wait(250, signal);
          for (var i = 1; i <= 16; i++) {
            setRings(root, 1 - Math.pow(1 - i / 16, 3));
            await Demos.wait(55, signal);
          }
        }
      },
      {
        caption: "Ask the AI coach what to change",
        dur: 3000,
        run: async function (root, signal) {
          await tap(root, q(root, "tai"), signal);
          root.classList.add("sa-a");
          q(root, "tap").classList.remove("on");
          await Demos.wait(420, signal);
          q(root, "me").classList.add("on");
          await Demos.wait(420, signal);
          q(root, "bot").classList.add("on");
          await Demos.type(q(root, "ans"), ANSWER, signal, 60);
        }
      }
    ],
    still: function (root) {
      tick(root, 1, true);
      tick(root, 2, true);
      q(root, "s1").textContent = "8d";
      q(root, "s2").textContent = "34d";
      q(root, "stake").textContent = "All streaks safe today";
      q(root, "am").textContent = "0";
      setFast(root, 840);
      setRings(root, 1);
      root.classList.add("sa-f");
      q(root, "tap").classList.remove("on");
    },
    hold: 1600
  });
})();
