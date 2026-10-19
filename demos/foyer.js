(function () {

  function at(root, el, dx, dy) {
    var R = root.getBoundingClientRect();
    var r = el.getBoundingClientRect();
    var s = R.width / 880 || 1;
    return [(r.left - R.left) / s + dx, (r.top - R.top) / s + dy];
  }

  function aim(root, pt) {
    var c = root.querySelector(".cursor");
    c.style.setProperty("--x", pt[0] + "px");
    c.style.setProperty("--y", pt[1] + "px");
  }

  async function press(root, signal) {
    var c = root.querySelector(".cursor");
    c.classList.add("press");
    await Demos.wait(160, signal);
    c.classList.remove("press");
  }

  function svg(body) {
    return '<svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">' + body + "</svg>";
  }

  var S = 'fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"';
  var ic = {
    plus: svg('<path d="M8 2.5v11M2.5 8h11" ' + S + "/>"),
    pin: svg('<path d="M5.5 2h5M6.2 2.2l-.7 5.3L3.5 10h9l-2-2.5-.7-5.3M8 10v4.2" ' + S + "/>"),
    win: svg('<rect x="1.8" y="3" width="12.4" height="10" rx="2.2" ' + S + '/><path d="M1.8 6.2h12.4" ' + S + "/>"),
    gear: svg('<circle cx="8" cy="8" r="2.1" ' + S + '/><path d="M8 1.6v1.8M8 12.6v1.8M1.6 8h1.8M12.6 8h1.8M3.5 3.5l1.3 1.3M11.2 11.2l1.3 1.3M3.5 12.5l1.3-1.3M11.2 4.8l1.3-1.3" ' + S + '/><circle cx="8" cy="8" r="4.6" ' + S + "/>"),
    down: svg('<path d="M3.5 6l4.5 4.5L12.5 6" ' + S + "/>"),
    left: svg('<path d="M10 3L5 8l5 5" ' + S + "/>"),
    right: svg('<path d="M6 3l5 5-5 5" ' + S + "/>"),
    video: svg('<rect x="1" y="4" width="9.4" height="8" rx="2.2" fill="currentColor"/><path d="M11.3 7.1l3.7-2.3v6.4l-3.7-2.3z" fill="currentColor"/>')
  };

  var glyph = '<svg class="fy-glyph" viewBox="0 0 20 17" width="20" height="17" aria-hidden="true"><defs><mask id="fy-gm"><rect width="20" height="17" fill="#fff"/><text x="10" y="13.4" text-anchor="middle" font-size="9.6" font-weight="800" fill="#000" font-family="-apple-system,BlinkMacSystemFont,sans-serif" letter-spacing="-.3">19</text></mask></defs>' +
    '<rect x="2" y="3" width="16" height="13.5" rx="4" fill="currentColor" mask="url(#fy-gm)"/><rect x="5.3" y=".6" width="1.8" height="3.4" rx=".9" fill="currentColor"/><rect x="12.9" y=".6" width="1.8" height="3.4" rx=".9" fill="currentColor"/></svg>';

  function row(o) {
    return '<div class="fy-pr' + (o.dim ? " fy-dim" : "") + '"><s class="fy-bar' + (o.pending ? " fy-pend" : "") + '" style="--bc:' + o.color + '"></s>' +
      '<div class="fy-prt"><b>' + o.title + "</b>" + (o.time ? "<span>" + o.time + "</span>" : "") + (o.detail ? "<em>" + o.detail + "</em>" : "") + "</div>" +
      (o.video ? '<i class="fy-vid">' + ic.video + "</i>" : "") + "</div>";
  }

  function head(title, cls) {
    return '<div class="fy-sh' + (cls ? " " + cls : "") + '">' + title + "</div>";
  }

  var days = [["M", 19, 10], ["T", 20, 0], ["W", 21, 9], ["T", 22, 0], ["F", 23, 8], ["S", 24, 0], ["S", 25, 0]];

  var strip = days.map(function (d, i) {
    return '<div class="fy-sd' + (i === 0 ? " fy-today" : "") + '"><i>' + d[0] + "</i><b>" + d[1] + "</b><u" + (d[2] ? ' style="width:' + d[2] + 'px"' : ' class="fy-none"') + "></u></div>";
  }).join("");

  var pop = [
    '<div class="fy-pop"><div class="fy-pin">',
    '<div class="fy-ph"><div class="fy-tools"><i>' + ic.plus + "</i><i>" + ic.pin + "</i><i>" + ic.win + "</i><i>" + ic.gear + "</i></div>",
    '<div class="fy-mrow"><b>October 2026</b><i>' + ic.down + "</i><span></span><i>" + ic.left + "</i><i>" + ic.right + "</i></div></div>",
    '<div class="fy-strip">' + strip + "</div>",
    '<div class="fy-sum">3 meetings &middot; next 14:00 &middot; free 2h 30m from 15:30</div>',
    '<div class="fy-list">',
    head("Today", "fy-tod"),
    row({ title: "Junior standup", time: "10:30 &ndash; 11:00", detail: "4 people", color: "#f09a37", dim: true, video: true }),
    '<div class="fy-hero"><div class="fy-hb"><b>Design review</b><span>14:00 &ndash; 14:45 &middot; 45 min</span><em>in 5m</em>',
    '<button class="fy-join">' + ic.video + "<span>Join Google Meet</span></button></div>",
    '<div class="fy-ppl"><div class="fy-pl">People &middot; 2</div><div class="fy-pg"><span><i></i>Ayla Demir</span><span><i class="fy-q"></i>Mia Kaya</span></div></div></div>',
    row({ title: "Magic Tea Time &#10024;", time: "15:00 &ndash; 15:30", detail: "3 people", color: "#f09a37" }),
    head("Tomorrow"),
    row({ title: "Gym", time: "8:00 &ndash; 9:00", detail: "Mood Gym Life Club &middot; 2690. Sk. 2B &middot; 06810 Ca&hellip;", color: "#2f7ff0" }),
    head("Wednesday, October 21"),
    row({ title: "Halloween @ Albert! &#128123;&#127875;", detail: "3 people", color: "#d8a24a", pending: true }),
    row({ title: "Junior standup", time: "10:30 &ndash; 10:45", detail: "G&ouml;teborg-1-Bikko Village (4)", color: "#f09a37", video: true }),
    "</div></div></div>"
  ].join("");

  var html = [
    '<div class="fy-wall">',
    '<div class="fy-menubar"><span class="fy-ml"><b>&#63743;</b><span>Finder</span><span>File</span><span>Edit</span><span>View</span></span>',
    '<span class="fy-mr"><span class="fy-item">' + glyph + '<s class="fy-dotm"></s><span>Design review &middot; in 5m</span></span><span>Mon 19 Oct&nbsp;&nbsp;13:55</span></span></div>',
    '<div class="mw fy-win"><div class="mw-bar"><span class="mw-lights"><i></i><i></i><i></i></span><span>Foyer</span>',
    '<span class="fy-seg"><i class="on">Agenda</i><i>Day</i><i>Week</i><i>Month</i></span></div>',
    '<div class="mw-body fy-body">',
    '<aside class="fy-side"><div class="fy-lab">SETS</div><div class="fy-set on">All<s>&#8984;1</s></div><div class="fy-set">Work<s>&#8984;2</s></div><div class="fy-set">Personal<s>&#8984;3</s></div>',
    '<div class="fy-lab">CALENDARS</div><div class="fy-cal"><i style="background:#f09a37"></i>Work<s>6</s></div><div class="fy-cal"><i style="background:#2f7ff0"></i>Personal<s>3</s></div><div class="fy-cal"><i style="background:#58c27d"></i>iCloud<s>10</s></div>',
    '<div class="fy-lab">ZONES</div><div class="fy-cal">Istanbul<s>GMT+3</s></div><div class="fy-cal">Berlin<s>GMT+1</s></div></aside>',
    '<section class="fy-main">',
    '<div class="fy-inbox"><div class="fy-inbox-in"><div class="fy-lab">INVITATIONS <i>1</i></div>',
    '<div class="fy-inv"><div class="fy-av">AD</div><div class="fy-invt"><b>Design review</b><span>Ayla Demir invited you &middot; today 14:00 &ndash; 14:45</span></div>',
    '<div class="fy-btns"><button class="fy-acc">Accept</button><button>Maybe</button><button>Decline</button></div></div></div></div>',
    '<div class="fy-day"><span>TODAY</span><b>Monday, October 19</b></div>',
    '<div class="fy-row fy-past"><em>10:30</em><i style="background:#f09a37"></i><div><b>Junior standup</b><span>4 people</span></div></div>',
    '<div class="fy-slot"><div class="fy-row fy-new"><em>14:00</em><i style="background:#f09a37"></i><div><b>Design review</b><span>Google Meet &middot; 3 people</span></div><u class="fy-chip">Accepted</u></div></div>',
    '<div class="fy-row"><em>15:00</em><i style="background:#f09a37"></i><div><b>Magic Tea Time &#10024;</b><span>3 people</span></div></div>',
    '<div class="fy-row"><em>18:30</em><i style="background:#2f7ff0"></i><div><b>Dinner with Elif</b><span>Kadik&ouml;y</span></div></div>',
    "</section></div></div>",
    pop,
    '<div class="cursor"></div></div>'
  ].join("");

  function reset(root) {
    root.classList.remove("fy-accepted", "fy-menu", "fy-joined", "fy-hot");
    var c = root.querySelector(".cursor");
    c.classList.remove("press");
    c.style.setProperty("--x", "640px");
    c.style.setProperty("--y", "470px");
  }

  Demos.register("foyer", {
    kind: "mac",
    summary: "Accept invites in one click, then join from the menu bar.",
    html: html,
    reset: reset,
    steps: [
      { caption: "Invitations wait in your inbox", dur: 2400, run: async function (root, signal) {
        await Demos.wait(1200, signal);
        aim(root, at(root, root.querySelector(".fy-acc"), 22, 12));
      } },
      { caption: "Accept right from the invite", dur: 3000, run: async function (root, signal) {
        await Demos.wait(500, signal);
        await press(root, signal);
        root.classList.add("fy-accepted");
        await Demos.wait(1100, signal);
        aim(root, at(root, root.querySelector(".fy-item"), 60, 11));
      } },
      { caption: "Your day, one click from the menu bar", dur: 3300, run: async function (root, signal) {
        await Demos.wait(500, signal);
        await press(root, signal);
        root.classList.add("fy-menu");
        await Demos.wait(1700, signal);
        aim(root, at(root, root.querySelector(".fy-join"), 70, 16));
      } },
      { caption: "Join the next call in one click", dur: 2700, run: async function (root, signal) {
        await Demos.wait(900, signal);
        root.classList.add("fy-hot");
        await press(root, signal);
        root.classList.add("fy-joined");
        await Demos.wait(700, signal);
        root.classList.remove("fy-menu", "fy-hot");
      } }
    ],
    still: function (root) {
      root.classList.add("fy-accepted", "fy-menu");
      aim(root, at(root, root.querySelector(".fy-join"), 70, 16));
    },
    hold: 1400
  });
})();
