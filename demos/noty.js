(function () {
  var P = {
    spark: '<path d="M11 2.5l1.9 5.6 5.6 1.9-5.6 1.9L11 17.5l-1.9-5.6L3.5 10l5.6-1.9z" fill="currentColor"/><path d="M18.5 14.5l.8 1.9 1.9.8-1.9.8-.8 1.9-.8-1.9-1.9-.8 1.9-.8z" fill="currentColor"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>',
    plus: '<path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
    close: '<path d="M7 7l10 10M17 7L7 17" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M6 11a6 6 0 0012 0M12 17v3.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    up: '<path d="M12 19V5.5M6 11l6-6 6 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
    home: '<path d="M3.5 10.6L12 3.8l8.5 6.8V20a1 1 0 01-1 1H15v-6.2H9V21H4.5a1 1 0 01-1-1z" fill="currentColor"/>',
    loop: '<path d="M17 2.5l3 3-3 3M4 11.5V10a4.5 4.5 0 014.5-4.5H20M7 21.5l-3-3 3-3M20 12.5V14a4.5 4.5 0 01-4.5 4.5H4" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>',
    stats: '<path d="M5 20v-7M12 20V5M19 20v-10" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>',
    user: '<circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="1.9"/><path d="M4.5 20.5a7.5 7.5 0 0115 0" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>',
    sun: '<circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    gym: '<path d="M6.5 7.5v9M3.5 10v4M17.5 7.5v9M20.5 10v4M6.5 12h11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    moon: '<path d="M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
    cal: '<rect x="3.5" y="5" width="17" height="15.5" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3.5 10h17M8 3v4M16 3v4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    merge: '<circle cx="6" cy="5.5" r="2.2" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="6" cy="18.5" r="2.2" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="18" cy="12" r="2.2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M6 7.7v8.6M6 9c0 3 3 3 9.8 3" fill="none" stroke="currentColor" stroke-width="1.8"/>',
    addc: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 8v8M8 12h8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    okc: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 12.3l2.8 2.8L16.2 9.6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
    clock: '<circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    list: '<path d="M10.5 6.5H20M10.5 12H20M10.5 17.5H20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M3.5 6.5l1.5 1.5 2.5-2.8M3.5 12l1.5 1.5 2.5-2.8M3.5 17.5l1.5 1.5 2.5-2.8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
    wand: '<path d="M4 20L14.5 9.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M15.5 3l.9 2.4 2.4.9-2.4.9-.9 2.4-.9-2.4-2.4-.9 2.4-.9zM19.5 11l.6 1.5 1.5.6-1.5.6-.6 1.5-.6-1.5-1.5-.6 1.5-.6zM8 3.5l.5 1.3 1.3.5-1.3.5L8 7.1l-.5-1.3-1.3-.5 1.3-.5z" fill="currentColor"/>'
  };

  function ic(name, cls) {
    return '<svg class="no-ic' + (cls ? " " + cls : "") + '" viewBox="0 0 24 24" aria-hidden="true">' + P[name] + "</svg>";
  }

  var HOUR = 64;

  function block(id, cls, title, range, from, mins) {
    var top = 8 + (from * HOUR) / 60 + 1;
    var h = (mins * HOUR) / 60 - 2;
    return '<div class="no-blk ' + cls + (h < 36 ? " no-cpt" : "") + '" data-no="' + id + '" style="top:' + top + "px;height:" + h + 'px">' +
      '<i class="no-chk">' + ic("check") + "</i>" +
      '<div class="no-btx"><b>' + title + "</b>" + (h < 36 ? "" : "<small>" + range + "</small>") + "</div></div>";
  }

  function hours() {
    var labels = ["7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM"];
    return labels.map(function (l, i) {
      return '<div class="no-hr" style="top:' + (8 + i * HOUR) + 'px"><span>' + l + "</span><i></i></div>";
    }).join("");
  }

  function sug(icon, text, coral) {
    return '<div class="no-sg' + (coral ? " no-coral" : "") + '"><span class="no-sgi">' + ic(icon) + "</span><span>" + text + "</span></div>";
  }

  var html =
    '<div class="ph"><div class="ph-notch"></div><div class="ph-body no-app">' +
      '<div class="no-sb"><b>8:10</b><span class="no-sbi"><i></i><i></i><i></i><i></i><em></em></span></div>' +
      '<div class="no-home">' +
        '<div class="no-top">' +
          '<div class="no-xp"><span class="no-emo">&#128296;</span><span class="no-xpt"><span class="no-lv"><small>LV</small><b>4</b></span><span class="no-bar"><i data-no="fill"></i></span><span class="no-hint" data-no="hint">3 left</span></span></div>' +
          '<div class="no-days">' +
            '<div class="no-day no-today"><small>TODAY</small><b>19</b><em>15h 50m</em></div>' +
            '<div class="no-day"><small>TUE</small><b>20</b></div>' +
            '<div class="no-day"><small>WED</small><b>21</b></div>' +
          "</div>" +
        "</div>" +
        '<div class="no-tl">' + hours() +
          block("run", "no-teal", "Morning run", "7:00 AM - 7:45 AM", 0, 45) +
          block("stand", "no-blue", "Team stand-up", "8:30 AM - 9:00 AM", 90, 30) +
          block("deep", "no-purple no-new", "Deep work: pitch deck", "9:00 AM - 10:30 AM", 120, 90) +
          block("gym", "no-amber no-new", "Gym", "11:00 AM - 12:00 PM", 240, 60) +
          block("lunch", "no-rose", "Lunch with Anna", "12:30 PM - 1:30 PM", 330, 60) +
          '<div class="no-now" style="top:' + (8 + (70 * HOUR) / 60) + 'px"><i></i></div>' +
          '<div class="no-plus">+10 XP</div>' +
        "</div>" +
        '<div class="no-tab">' +
          '<span class="no-ti no-on"><i></i>' + ic("home") + "</span>" +
          '<span class="no-ti"><i></i>' + ic("loop") + "</span>" +
          '<span class="no-ring" data-no="add"><span>' + ic("plus") + "</span></span>" +
          '<span class="no-ti"><i></i>' + ic("stats") + "</span>" +
          '<span class="no-ti"><i></i>' + ic("user") + "</span>" +
        "</div>" +
      "</div>" +
      '<div class="no-cm">' +
        '<div class="no-cards">' +
          '<div class="no-card no-c1"><span class="no-cic">' + ic("list") + "</span><b>Create Noty</b><small>Add a task for today</small></div>" +
          '<div class="no-card no-c2" data-no="ai"><span class="no-cic">' + ic("wand") + "</span><b>AI Assistant</b><small>Let AI help organize your daily tasks</small></div>" +
        "</div>" +
        '<span class="no-cx"><span>' + ic("close") + "</span></span>" +
      "</div>" +
      '<div class="no-sheet">' +
        '<i class="no-handle"></i>' +
        '<div class="no-sh">' + ic("spark") + "<span>Noty AI</span></div>" +
        '<div class="no-empty">' +
          '<div class="no-lbl">' + ic("addc") + "<span>Create</span></div>" +
          sug("sun", "Plan my day for me") +
          sug("gym", "Find a slot for reading and workout") +
          sug("moon", "What should I do this evening?") +
          '<div class="no-lbl no-lbl2">' + ic("cal") + "<span>Edit Schedule</span></div>" +
          sug("merge", "Fix overlapping tasks", true) +
        "</div>" +
        '<div class="no-chat">' +
          '<div class="no-me">Plan my morning</div>' +
          '<div class="no-ai no-think"><span class="no-av">' + ic("spark") + '</span><div class="no-bub"><span class="no-dots"><i></i><i></i><i></i></span>Thinking...</div></div>' +
          '<div class="no-ai no-reply"><span class="no-av">' + ic("spark") + '</span><div class="no-bub">' +
            "<p>Deep work while you're fresh, then the gym before lunch with Anna.</p>" +
            '<div class="no-tasks">' +
              '<div class="no-tk"><i></i><span><b>Deep work: pitch deck</b><small>' + ic("clock") + "9:00 AM &middot; 90 min</small></span></div>" +
              '<div class="no-tk"><i></i><span><b>Gym</b><small>' + ic("clock") + "11:00 AM &middot; 60 min</small></span></div>" +
              '<div class="no-save" data-no="save">' + ic("okc") + "<span>Add 2 tasks to today</span></div>" +
            "</div>" +
          "</div></div>" +
        "</div>" +
        '<div class="no-in">' +
          '<span class="no-mic">' + ic("mic") + "</span>" +
          '<span class="no-field"><span class="no-ph">Describe your daily plan</span><span class="no-typed" data-no="in"></span></span>' +
          '<span class="no-send" data-no="send">' + ic("up") + "</span>" +
        "</div>" +
      "</div>" +
      '<div class="no-tap" data-no="tap"></div>' +
    "</div></div>";

  var STATES = ["no-done", "no-xp-on", "no-cm-on", "no-sheet-on", "no-has", "no-sent", "no-thinking", "no-replied", "no-add1", "no-add2"];

  function q(root, k) { return root.querySelector('[data-no="' + k + '"]'); }

  function moveTap(root, el) {
    var body = root.querySelector(".ph-body");
    var b = body.getBoundingClientRect();
    var r = el.getBoundingClientRect();
    var k = b.width / body.offsetWidth || 1;
    var t = q(root, "tap");
    t.style.setProperty("--x", ((r.left + r.width / 2 - b.left) / k) + "px");
    t.style.setProperty("--y", ((r.top + r.height / 2 - b.top) / k) + "px");
    t.classList.add("on");
  }

  async function tap(root, el, signal, travel) {
    moveTap(root, el);
    await Demos.wait(travel || 520, signal);
    var t = q(root, "tap");
    t.classList.add("press");
    await Demos.wait(170, signal);
    t.classList.remove("press");
  }

  function hideTap(root) { q(root, "tap").classList.remove("on", "press"); }

  function setHint(root, text, pct) {
    q(root, "hint").textContent = text;
    q(root, "fill").style.width = pct + "%";
  }

  Demos.register("noty", {
    kind: "phone",
    summary: "Noty: today's plan hour by hour, ticked off for XP, with an AI that fills your free time. Fresh every midnight.",
    html: html,
    reset: function (root) {
      STATES.forEach(function (c) { root.classList.remove(c); });
      setHint(root, "3 left", 52);
      q(root, "in").textContent = "";
      var t = q(root, "tap");
      t.classList.remove("on", "press");
      t.style.setProperty("--x", "143px");
      t.style.setProperty("--y", "420px");
    },
    steps: [
      {
        caption: "Your day, hour by hour. Fresh every midnight",
        dur: 2200,
        run: async function (root, signal) {
          await Demos.wait(1500, signal);
          moveTap(root, q(root, "run").querySelector(".no-chk"));
        }
      },
      {
        caption: "Tick a task off and earn XP",
        dur: 2400,
        run: async function (root, signal) {
          await tap(root, q(root, "run").querySelector(".no-chk"), signal, 200);
          root.classList.add("no-done", "no-xp-on");
          setHint(root, "2 left", 64);
          await Demos.wait(1100, signal);
          root.classList.remove("no-xp-on");
          hideTap(root);
        }
      },
      {
        caption: "Ask Noty AI to plan your morning",
        dur: 5400,
        run: async function (root, signal) {
          await Demos.wait(150, signal);
          await tap(root, q(root, "add"), signal, 480);
          root.classList.add("no-cm-on");
          await Demos.wait(450, signal);
          await tap(root, q(root, "ai"), signal, 440);
          root.classList.remove("no-cm-on");
          root.classList.add("no-sheet-on");
          hideTap(root);
          await Demos.wait(550, signal);
          var inp = q(root, "in");
          root.classList.add("no-has");
          await Demos.type(inp, "Plan my morning", signal, 17);
          await tap(root, q(root, "send"), signal, 300);
          hideTap(root);
          inp.textContent = "";
          root.classList.remove("no-has");
          root.classList.add("no-sent");
          await Demos.wait(250, signal);
          root.classList.add("no-thinking");
          await Demos.wait(750, signal);
          root.classList.remove("no-thinking");
          root.classList.add("no-replied");
        }
      },
      {
        caption: "The plan lands in your free hours",
        dur: 2800,
        run: async function (root, signal) {
          await tap(root, q(root, "save"), signal, 450);
          hideTap(root);
          root.classList.remove("no-sheet-on");
          await Demos.wait(420, signal);
          root.classList.add("no-add1");
          await Demos.wait(320, signal);
          root.classList.add("no-add2");
          setHint(root, "4 left", 64);
        }
      }
    ],
    still: function (root) {
      root.classList.add("no-done", "no-add1", "no-add2");
      setHint(root, "4 left", 64);
      hideTap(root);
    },
    hold: 1500
  });
})();
