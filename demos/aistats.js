(function () {
  var IMG = "assets/demos/aistats/";
  var CLOCK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3M4.5 4.5v3.7h3.7M12 8v4.3l2.8 1.7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var APPLE = '<svg class="as-apple" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9-.7 0-1.8-.9-3-.8-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.3.9-1.3 1.3-2.6 1.3-2.6s-2.5-1-2.5-3.8zM14.1 5.8c.6-.8 1.1-1.8 1-2.8-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.7-1 2.7 1 .1 2-.5 2.7-1.3z"/></svg>';
  var COPILOT = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4.5c-2 0-3 1-3 3v2.3c0 1.2-.7 1.9-2 2.2 1.3.3 2 1 2 2.2v2.3c0 2 1 3 3 3M15 4.5c2 0 3 1 3 3v2.3c0 1.2.7 1.9 2 2.2-1.3.3-2 1-2 2.2v2.3c0 2-1 3-3 3" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var ROWS = [
    { p: "claude", name: "Claude", sub: "5-Hour", v: 62, reset: 8049 },
    { p: "chatgpt", name: "ChatGPT", sub: "Premium", v: 85, reset: 17460 },
    { p: "codex", name: "Codex", sub: "Weekly", v: 73, reset: 212700 },
    { p: "cursor", name: "Cursor", sub: "Premium", v: 78, to: 92, reset: 1052400 },
    { p: "copilot", name: "GitHub Copilot", sub: "Premium requests", v: 87, reset: 784800 },
    { p: "gemini", name: "Gemini", sub: "Daily requests", v: 7, reset: 51600 }
  ];

  var ACCOUNTS = [
    { p: "claude", tab: "Claude Max", name: "Claude Max", plan: "Max 20x", tag: "Work", mb: ["5H", "7D"], cards: [
      { title: "Current session", icon: "#E8A838", rows: [{ name: "5-Hour Usage", v: 62, reset: 8049, creep: true }] },
      { title: "Weekly limits", icon: "#2ECC71", rows: [
        { name: "7-Day Usage", v: 88, reset: 281520 },
        { name: "Sonnet (7-Day)", v: 41, reset: 281520 },
        { name: "Opus (7-Day)", v: 72, reset: 281520 }
      ] }
    ] },
    { p: "codex", tab: "Codex", name: "Codex", plan: "Pro", tag: "Development", mb: ["5H", "WK"], cards: [
      { title: "Current session", icon: "#E8A838", rows: [{ name: "5-Hour Usage", v: 23, reset: 14561, creep: true }] },
      { title: "Weekly limits", icon: "#2ECC71", rows: [{ name: "Weekly Usage", v: 73, reset: 212700 }] }
    ] },
    { p: "cursor", tab: "Cursor Ultra", name: "Cursor Ultra", plan: "Ultra", tag: "Personal", mb: ["PRM", "AUTO"], cards: [
      { title: "Monthly usage", icon: "#00B4D8", rows: [
        { name: "Premium", v: 92, reset: 1052400, creep: true },
        { name: "Auto", v: 38, reset: 1052400 },
        { name: "API", v: 15, reset: 1052400 }
      ] }
    ] }
  ];

  var LABEL = { good: "Good", caution: "Caution", warning: "Warning", over: "Over" };
  function status(v) { return v < 60 ? "good" : v < 80 ? "caution" : v < 90 ? "warning" : "over"; }
  function pct(v) { return (Math.round(v * 10) / 10).toFixed(v % 1 && v < 100 ? 1 : 0).replace(/\.0$/, "") + "%"; }
  function pad(x) { return String(x).padStart(2, "0"); }
  function short(s) {
    s = Math.max(0, Math.round(s));
    var d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    return d ? d + "d " + h + "h" : h ? h + "h " + pad(m) + "m " + pad(sec) + "s" : m + "m " + pad(sec) + "s";
  }
  function hm(s) {
    var h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60);
    return h ? h + "h " + pad(m) + "m" : m + "m";
  }
  function clock(s) {
    s = Math.max(0, Math.round(s));
    var d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    return d ? d + "d " + h + "h " + pad(m) + "m" : h + "h " + pad(m) + "m " + pad(sec) + "s";
  }

  function logo(p, cls) {
    if (p === "copilot") return '<span class="' + cls + ' as-glyph">' + COPILOT + '</span>';
    return '<span class="' + cls + '"><img src="' + IMG + p + '.webp" alt="" width="34" height="34" /></span>';
  }

  function lbRow(r, i) {
    return '<li class="as-row" style="--i:' + i + '">' + logo(r.p, "as-tile") +
      '<span class="as-name"><b>' + r.name + '</b><small>' + r.sub + '</small></span>' +
      '<span class="as-bar"><s></s><i style="--at:60"></i><i style="--at:80"></i><i style="--at:90"></i></span>' +
      '<em class="as-pct"></em><span class="as-reset">' + CLOCK + '<span class="as-cd"></span></span></li>';
  }

  var html = [
    '<div class="as-stage">',
    '<div class="as-mesh"><i class="m1"></i><i class="m2"></i><i class="m3"></i><i class="m4"></i></div>',
    '<div class="as-a">',
    '<div class="as-lb">',
    '<div class="as-lb-head"><span class="as-live"><i></i>Live</span><span class="as-lb-title">6 accounts</span><span class="as-upd">Updated <b data-as="upd">12s</b> ago</span></div>',
    '<div class="as-sum"><span><small>Avg 5h</small><b data-s="caution">68%</b></span><span><small>Warnings</small><b data-s="over" data-as="warn">2</b></span>',
    '<span class="as-next"><small>Next reset</small><b data-as="next">2h 14m</b><em>Claude 5-hour</em></span></div>',
    '<ul class="as-rows">', ROWS.map(lbRow).join(""), '</ul>',
    '</div>',
    '<div class="as-toast"><img src="' + IMG + 'app-icon.webp" alt="" width="34" height="34" /><span><b>Cursor — Premium</b>Usage at 92% — Almost at your limit!</span></div>',
    '</div>',
    '<div class="as-b">',
    '<div class="as-mb">' + APPLE + '<b>Finder</b><i style="width:26px"></i><i style="width:30px"></i><i style="width:22px"></i><span class="as-sp"></span>',
    '<span class="as-mbi" data-as="mbi"><span class="as-mbl" data-as="mbl"></span><span class="as-pair"><small data-as="la">5H</small><b data-as="a">62%</b></span><span class="as-pair"><small data-as="lb">7D</small><b data-as="b">88%</b></span></span>',
    '<span class="as-clock">Fri 9:41</span></div>',
    '<div class="as-win"><div class="as-win-bar"><i></i><i></i><i></i></div><div class="as-win-body"><span class="ttl"></span><span></span><span style="width:78%"></span><span></span><span style="width:52%"></span><span class="blk"></span><span style="width:66%"></span><span></span></div></div>',
    '<div class="as-pop">',
    '<span class="as-nub"></span>',
    '<div class="as-tabs">', ACCOUNTS.map(function (a, i) { return '<span class="as-tab" data-tab="' + i + '">' + logo(a.p, "as-tl") + '<span>' + a.tab + '</span></span>'; }).join(""), '</div>',
    '<div class="as-ph"><span class="as-pl" data-as="pl"></span><span class="as-pn"><b data-as="pn"></b><small><i></i><span data-as="pp"></span></small></span><span class="as-tag" data-as="pt"></span></div>',
    '<div class="as-cards" data-as="cards"></div>',
    '<div class="as-foot"><span class="as-chip">' + CLOCK + '<span data-as="rf">34s</span></span><span class="as-sp"></span><span class="as-btn">Dashboard</span></div>',
    '</div>',
    '<div class="cursor" data-as="cur"></div>',
    '</div>',
    '</div>'
  ].join("");

  function q(root, k) { return root.querySelector('[data-as="' + k + '"]'); }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  function paintBoard(root) {
    var st = root._as;
    var rows = root.querySelectorAll(".as-row");
    st.rows.forEach(function (r, i) {
      var el = rows[i];
      el.dataset.s = status(r.v);
      if (st.filled) el.style.setProperty("--v", r.v);
      el.querySelector(".as-pct").textContent = Math.round(r.v) + "%";
      el.querySelector(".as-cd").textContent = short(r.reset);
    });
    q(root, "warn").textContent = st.rows.filter(function (r) { return r.v >= 80; }).length;
    q(root, "next").textContent = hm(st.rows[0].reset);
    q(root, "upd").textContent = st.age + "s";
  }

  function paintPop(root) {
    var st = root._as;
    var a = st.acc[st.cur];
    root.querySelectorAll(".as-pm").forEach(function (el) {
      var r = a.cards[+el.dataset.c].rows[+el.dataset.r];
      var s = status(r.v);
      el.dataset.s = s;
      el.querySelector("em").textContent = pct(r.v);
      el.querySelector(".as-pill").textContent = LABEL[s];
      el.querySelector("s").style.setProperty("--v", r.v);
      el.querySelector(".as-pm-reset span").textContent = clock(r.reset);
    });
    var m1 = a.cards[0].rows[0];
    var m2 = a.cards[1] ? a.cards[1].rows[0] : a.cards[0].rows[1];
    var A = q(root, "a"), B = q(root, "b");
    A.textContent = Math.round(m1.v) + "%"; A.dataset.s = status(m1.v);
    B.textContent = Math.round(m2.v) + "%"; B.dataset.s = status(m2.v);
    q(root, "rf").textContent = st.refresh + "s";
  }

  function buildPop(root) {
    var st = root._as;
    var a = st.acc[st.cur];
    q(root, "cards").innerHTML = a.cards.map(function (c, ci) {
      return '<div class="as-card"><h4><i style="--ic:' + c.icon + '"></i>' + c.title + '</h4>' + c.rows.map(function (r, ri) {
        return '<div class="as-pm" data-c="' + ci + '" data-r="' + ri + '"><div class="as-pm-top"><b>' + r.name + '</b><span class="as-pill"></span><em></em></div>' +
          '<div class="as-pm-bar"><s></s></div><div class="as-pm-reset">' + CLOCK + 'Resets in <span></span></div></div>';
      }).join("") + '</div>';
    }).join("");
    q(root, "pn").textContent = a.name;
    q(root, "pp").textContent = a.plan;
    q(root, "pt").textContent = a.tag;
    q(root, "pl").innerHTML = logo(a.p, "as-in");
    q(root, "mbl").innerHTML = logo(a.p, "as-in");
    q(root, "la").textContent = a.mb[0];
    q(root, "lb").textContent = a.mb[1];
    root.querySelectorAll(".as-tab").forEach(function (t, i) { t.classList.toggle("on", i === st.cur); });
    paintPop(root);
  }

  function tick(root) {
    var st = root._as;
    st.t++;
    st.age = st.age >= 59 ? 1 : st.age + 1;
    st.refresh = st.refresh <= 1 ? 60 : st.refresh - 1;
    st.rows.forEach(function (r) { r.reset = Math.max(0, r.reset - 1); });
    st.acc.forEach(function (a) {
      a.cards.forEach(function (c) {
        c.rows.forEach(function (r) {
          r.reset = Math.max(0, r.reset - 1);
          if (r.creep && st.t % 4 === 0 && r.v < 99.5) r.v = Math.round((r.v + 0.1 + (st.t % 3) * 0.1) * 10) / 10;
        });
      });
    });
    paintBoard(root);
    paintPop(root);
  }

  async function ticker(root, signal) {
    var gen = root._as.gen;
    try {
      while (root._as.gen === gen) {
        await Demos.wait(1000, signal);
        if (root._as.gen !== gen) return;
        tick(root);
      }
    } catch (e) {}
  }

  function point(root, el, dx, dy) {
    var stage = root.querySelector(".as-stage").getBoundingClientRect();
    var r = el.getBoundingClientRect();
    var k = stage.width / 880 || 1;
    var cur = q(root, "cur");
    cur.style.setProperty("--x", ((r.left - stage.left + r.width * dx) / k).toFixed(1) + "px");
    cur.style.setProperty("--y", ((r.top - stage.top + r.height * dy) / k).toFixed(1) + "px");
  }

  async function click(root, signal) {
    var cur = q(root, "cur");
    cur.classList.add("press");
    await Demos.wait(150, signal);
    cur.classList.remove("press");
  }

  Demos.register("aistats", {
    kind: "mac",
    summary: "Every AI plan's limits and resets, live",
    html: html,
    reset: function (root) {
      var gen = root._as ? root._as.gen + 1 : 1;
      root._as = { gen: gen, rows: clone(ROWS), acc: clone(ACCOUNTS), cur: 0, age: 12, refresh: 34, t: 0, filled: false };
      root.classList.remove("as-settled", "as-toast-on", "as-open", "as-still");
      root.querySelectorAll(".as-row").forEach(function (el) { el.style.setProperty("--v", 0); el.classList.remove("as-hot"); });
      q(root, "cards").classList.remove("swap");
      var cur = q(root, "cur");
      cur.classList.remove("press");
      cur.style.setProperty("--x", "560px");
      cur.style.setProperty("--y", "330px");
      buildPop(root);
      paintBoard(root);
    },
    steps: [
      {
        caption: "Every AI account and its reset, live",
        dur: 3000,
        run: async function (root, signal) {
          ticker(root, signal);
          await Demos.wait(120, signal);
          root._as.filled = true;
          paintBoard(root);
        }
      },
      {
        caption: "Cursor nears its limit, and you hear first",
        dur: 3200,
        run: async function (root, signal) {
          var r = root._as.rows[3];
          root.classList.add("as-settled");
          root.querySelectorAll(".as-row")[3].classList.add("as-hot");
          await Demos.wait(350, signal);
          while (r.v < r.to) {
            r.v += 1;
            paintBoard(root);
            await Demos.wait(85, signal);
          }
          await Demos.wait(300, signal);
          root.classList.add("as-toast-on");
        }
      },
      {
        caption: "Your limits, ticking in the menu bar",
        dur: 3000,
        run: async function (root, signal) {
          await Demos.wait(500, signal);
          point(root, q(root, "mbi"), 0.5, 0.6);
          await Demos.wait(800, signal);
          await click(root, signal);
          root.classList.add("as-open");
        }
      },
      {
        caption: "Switch accounts, the menu bar follows",
        dur: 2800,
        run: async function (root, signal) {
          point(root, root.querySelector('.as-tab[data-tab="2"]'), 0.55, 0.6);
          await Demos.wait(800, signal);
          await click(root, signal);
          var cards = q(root, "cards");
          cards.classList.add("swap");
          await Demos.wait(140, signal);
          root._as.cur = 2;
          buildPop(root);
          await Demos.wait(40, signal);
          cards.classList.remove("swap");
        }
      }
    ],
    still: function (root) {
      var st = root._as;
      st.rows[3].v = st.rows[3].to;
      st.filled = true;
      root.classList.add("as-still", "as-settled", "as-toast-on");
      root.querySelectorAll(".as-row")[3].classList.add("as-hot");
      paintBoard(root);
    },
    hold: 1400
  });
})();
