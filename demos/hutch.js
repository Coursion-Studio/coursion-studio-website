(function () {
  var html =
    '<div class="hu-desk">' +
      '<div class="hu-menubar"><b>Finder</b><span>File</span><span>Edit</span><span>View</span><span>Go</span><em class="hu-tray"><i></i></em></div>' +
      '<div class="hu-keys"><kbd>⌘</kbd><kbd class="w">Space</kbd></div>' +
      '<div class="hu-keys hu-keys-snap"><kbd>⌃</kbd><kbd>⌥</kbd><kbd>←</kbd></div>' +
      '<div class="hu-guide"></div>' +
      '<div class="hu-win hu-safari">' +
        '<div class="hu-wbar"><span class="mw-lights"><i></i><i></i><i></i></span><span class="hu-url">coursion.studio</span></div>' +
        '<div class="hu-page"><b></b><i></i><i class="s"></i><div class="hu-cards"><u></u><u></u><u></u></div></div>' +
      '</div>' +
      '<div class="hu-win hu-finder">' +
        '<div class="hu-wbar"><span class="mw-lights"><i></i><i></i><i></i></span><span class="hu-url">Downloads</span></div>' +
        '<div class="hu-files">' +
          '<div class="hu-f"><div class="hu-doc"><i></i><i></i><i></i></div><b>Invoice.pdf</b></div>' +
          '<div class="hu-f hu-f-hole"><b>Mockup.png</b></div>' +
          '<div class="hu-f"><div class="hu-doc"><i></i><i></i><i></i></div><b>Notes.txt</b></div>' +
        '</div>' +
      '</div>' +
      '<div class="hu-pounce">' +
        '<div class="hu-search"><svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M16 16l5 5"/></svg><span class="hu-q"></span><i class="hu-caret"></i></div>' +
        '<div class="hu-rows">' +
          '<div class="hu-row on"><span class="hu-ic hu-ic-saf"></span><span class="t"><b>Safari</b><small>Application</small></span><em>Open</em></div>' +
          '<div class="hu-row"><span class="hu-ic hu-ic-stp"></span><span class="t"><b>Safari Technology Preview</b><small>Application</small></span><em>Open</em></div>' +
          '<div class="hu-row"><span class="hu-ic hu-ic-not"></span><span class="t"><b>Save to Notes</b><small>Shortcut</small></span><em>Run</em></div>' +
        '</div>' +
        '<div class="hu-foot"><span><kbd>↩</kbd> Open</span><span><kbd>↑↓</kbd> Navigate</span><span><kbd>esc</kbd> Dismiss</span><b>Pounce</b></div>' +
      '</div>' +
      '<div class="hu-shelf"><div class="hu-shead"><svg viewBox="0 0 24 24"><path d="M4 9h16v10H4zM7 9V6h10v3"/></svg>Stash<span class="n">0</span></div>' +
        '<div class="hu-slots"><i><u class="hu-in"><span></span></u></i><i></i><i></i></div></div>' +
      '<div class="hu-file"><div class="hu-thumb"><div class="pic"></div><i></i><i></i></div><span>Mockup.png</span></div>' +
      '<div class="cursor hu-cursor"></div>' +
    '</div>';

  function clear(root) {
    root.className = root.className.replace(/\bhu-on-\S+/g, "").replace(/\s+/g, " ").trim();
  }
  function on(root, c) { root.classList.add("hu-on-" + c); }
  function off(root, c) { root.classList.remove("hu-on-" + c); }
  function go(root, x, y) {
    var d = root.querySelector(".hu-desk");
    d.style.setProperty("--x", x + "px");
    d.style.setProperty("--y", y + "px");
  }

  function reset(root) {
    clear(root);
    on(root, "nt");
    root.querySelector(".hu-q").textContent = "";
    root.querySelector(".hu-shead .n").textContent = "0";
    go(root, 800, 130);
    root.querySelector(".cursor").classList.remove("press");
    void root.offsetWidth;
  }

  Demos.register("hutch", {
    kind: "mac",
    summary: "Press ⌘Space, type a few letters and Pounce opens the app. Snap the window to half the screen, then park a file on the Stash shelf.",
    html: html,
    reset: reset,
    steps: [
      {
        caption: "⌘Space opens any app",
        dur: 3700,
        run: async function (root, signal) {
          off(root, "nt");
          on(root, "keys");
          await Demos.wait(600, signal);
          on(root, "open");
          await Demos.wait(450, signal);
          off(root, "keys");
          await Demos.type(root.querySelector(".hu-q"), "saf", signal, 7);
          on(root, "res");
          await Demos.wait(750, signal);
          on(root, "pick");
          await Demos.wait(300, signal);
          off(root, "open");
          on(root, "safari");
        }
      },
      {
        caption: "Snap it to half the screen",
        dur: 3000,
        run: async function (root, signal) {
          await Demos.wait(250, signal);
          on(root, "snapkeys");
          on(root, "guide");
          await Demos.wait(800, signal);
          on(root, "snap");
          off(root, "guide");
          await Demos.wait(1000, signal);
          off(root, "snapkeys");
        }
      },
      {
        caption: "Park files on the Stash shelf",
        dur: 4300,
        run: async function (root, signal) {
          var cur = root.querySelector(".cursor");
          on(root, "finder");
          await Demos.wait(500, signal);
          on(root, "cur");
          go(root, 658, 150);
          await Demos.wait(900, signal);
          cur.classList.add("press");
          on(root, "lift");
          on(root, "shelf");
          await Demos.wait(350, signal);
          on(root, "drag");
          go(root, 646, 415);
          await Demos.wait(800, signal);
          on(root, "hot");
          await Demos.wait(250, signal);
          cur.classList.remove("press");
          on(root, "dropped");
          root.querySelector(".hu-shead .n").textContent = "1";
          off(root, "cur");
        }
      }
    ],
    still: function (root) {
      ["safari", "snap", "finder", "shelf", "dropped"].forEach(function (c) { on(root, c); });
      root.querySelector(".hu-shead .n").textContent = "1";
    },
    hold: 1600
  });
})();
