(function () {
  var html =
    '<div class="mw cu-win">' +
      '<div class="mw-bar"><span class="mw-lights"><i></i><i></i><i></i></span><span class="cu-title">orbit</span></div>' +
      '<div class="mw-body cu-body">' +
        '<div class="cu-side">' +
          '<div class="cu-proj"><svg viewBox="0 0 24 24"><path d="M3 7h6l2 2h10v10H3z"/></svg><span><b>atlas-api</b><small>main</small></span></div>' +
          '<div class="cu-proj"><svg viewBox="0 0 24 24"><path d="M3 7h6l2 2h10v10H3z"/></svg><span><b>pixel-notes</b><small>main</small></span></div>' +
          '<div class="cu-proj on"><svg viewBox="0 0 24 24"><path d="M3 7h6l2 2h10v10H3z"/></svg><span><b>orbit</b><small>main</small></span></div>' +
          '<div class="cu-newtab">+ New Tab</div>' +
        '</div>' +
        '<div class="cu-main">' +
          '<div class="cu-blocks">' +
            '<div class="cu-block cu-b0"><div class="cu-bh"><span class="cmd">ls</span><span class="path">~/Projects/orbit</span><span class="ok">✓ 1ms</span></div>' +
              '<pre>Makefile   package.json   README.md   <i class="d">src</i>   <i class="d">scripts</i></pre></div>' +
            '<div class="cu-block cu-b1"><div class="cu-bh"><span class="cmd">git status <u>-sb</u></span><span class="path">~/Projects/orbit</span><span class="ok">✓ 12ms</span></div>' +
              '<pre><span class="l1">## <i class="g">main...origin/main</i> [ahead 1]</span>\n<span class="l2"> <i class="r">M</i> README.md</span>\n<span class="l3"> <i class="r">M</i> src/components/Timeline.tsx</span>\n<span class="l4"><i class="r">??</i> src/lib/draft.ts</span></pre>' +
              '<div class="cu-acts"><span><svg viewBox="0 0 24 24"><rect x="8" y="8" width="11" height="11" rx="2"/><path d="M5 15V6a1 1 0 0 1 1-1h9"/></svg>Copy</span><span><svg viewBox="0 0 24 24"><path d="M20 12a8 8 0 1 1-2.5-5.8M20 4v5h-5"/></svg>Rerun</span><span><svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>Fold</span></div>' +
              '<div class="cu-copied">Copied</div></div>' +
            '<div class="cu-block cu-ai"><div class="cu-bh"><span class="cmd ai">✦ Claude</span><span class="pill">reads before you run</span></div>' +
              '<p>Files changed on this branch:</p>' +
              '<code>git diff --name-status main...HEAD</code>' +
              '<div class="cu-btns"><b class="cu-run">Run <em>↩</em></b><span>Copy</span></div></div>' +
          '</div>' +
          '<div class="cu-comp">' +
            '<div class="cu-input"><span class="cu-mode">✦ Ask</span><span class="cu-in"></span></div>' +
            '<div class="cu-chips"><span class="cu-ch cu-k">⌘</span><span class="cu-ch cu-sp">✦</span><span class="cu-ch">~/Projects/orbit</span><span class="cu-ch">orbit</span><span class="cu-ch cu-br">main</span><span class="cu-ch cu-ret">↩</span></div>' +
          '</div>' +
        '</div>' +
        '<div class="cursor cu-cursor"></div>' +
      '</div>' +
    '</div>';

  function clear(root) {
    root.className = root.className.replace(/\bcu-on-\S+/g, "").replace(/\s+/g, " ").trim();
  }
  function on(root, c) { root.classList.add("cu-on-" + c); }
  function off(root, c) { root.classList.remove("cu-on-" + c); }
  function go(root, x, y) {
    var c = root.querySelector(".cu-cursor");
    c.style.setProperty("--x", x + "px");
    c.style.setProperty("--y", y + "px");
  }

  Demos.register("cue", {
    kind: "mac",
    summary: "Type a command and it comes back as its own card with exit code and timing. Hover a card to copy or rerun it, or ask in plain English and get a command you can read first.",
    html: html,
    reset: function (root) {
      clear(root);
      on(root, "nt");
      root.querySelector(".cu-in").textContent = "";
      go(root, 640, 470);
      root.querySelector(".cursor").classList.remove("press");
      void root.offsetWidth;
    },
    steps: [
      {
        caption: "Every command gets its own card",
        dur: 3300,
        run: async function (root, signal) {
          off(root, "nt");
          await Demos.wait(500, signal);
          await Demos.type(root.querySelector(".cu-in"), "git status -sb", signal, 14);
          await Demos.wait(450, signal);
          root.querySelector(".cu-in").textContent = "";
          on(root, "run");
        }
      },
      {
        caption: "Hover a card to copy or rerun it",
        dur: 3000,
        run: async function (root, signal) {
          var cur = root.querySelector(".cursor");
          await Demos.wait(250, signal);
          on(root, "cur");
          go(root, 620, 190);
          await Demos.wait(550, signal);
          on(root, "hover");
          await Demos.wait(550, signal);
          go(root, 668, 100);
          await Demos.wait(750, signal);
          cur.classList.add("press");
          await Demos.wait(150, signal);
          cur.classList.remove("press");
          on(root, "copied");
        }
      },
      {
        caption: "Ask in plain English, get a command",
        dur: 4500,
        run: async function (root, signal) {
          off(root, "hover");
          off(root, "copied");
          off(root, "cur");
          await Demos.wait(350, signal);
          on(root, "ask");
          await Demos.type(root.querySelector(".cu-in"), "which files changed on this branch?", signal, 24);
          await Demos.wait(350, signal);
          root.querySelector(".cu-in").textContent = "";
          off(root, "ask");
          on(root, "answer");
          await Demos.wait(1200, signal);
          on(root, "pressrun");
        }
      }
    ],
    still: function (root) {
      ["run", "answer"].forEach(function (c) { on(root, c); });
    },
    hold: 1600
  });
})();
