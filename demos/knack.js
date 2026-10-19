(function () {

  function at(root, el, dx, dy) {
    var x = 0, y = 0, n = el;
    while (n && n !== root) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
    return [x + dx, y + dy];
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

  var tools = [
    ["Image Converter", "Convert format, resize, combine", "IMAGE", "#4f8fff"],
    ["Image Compressor", "Shrink PNG, JPEG, GIF", "IMAGE", "#4f8fff"],
    ["PDF Toolkit", "Merge, split, compress PDFs", "PDF", "#ff8a4c"],
    ["Text Extractor", "Text from images and PDFs", "PDF", "#ff8a4c"],
    ["Color Palette", "Dominant colors of any image", "IMAGE", "#4f8fff"],
    ["QR Code Generator", "URLs, WiFi and text", "UTILITY", "#2fc9b4"],
    ["Video Converter", "Re-encode MP4, MOV, M4A", "VIDEO", "#7a7dff"],
    ["Audio Converter", "MP3, WAV, AAC, FLAC", "AUDIO", "#4cc779"],
    ["App Icon Generator", "One image, every icon size", "IMAGE", "#4f8fff"],
    ["Background Remover", "Cut out the subject on-device", "PRO", "#ff5c93"],
    ["Image Upscaler", "Upscale 2x or 4x on-device", "PRO", "#ff5c93"],
    ["Photo Enhance", "Denoise and sharpen", "PRO", "#ff5c93"],
    ["Smart Crop", "Auto-crop to social ratios", "PRO", "#ff5c93"],
    ["Face Restoration", "Bring back old portraits", "PRO", "#ff5c93"],
    ["Object Remover", "Erase and fill the background", "PRO", "#ff5c93"]
  ];

  var cards = tools.map(function (t, i) {
    return '<div class="kn-card' + (i === 1 ? ' kn-target' : '') + '"><div class="kn-ic" style="--t:' + t[3] + '"></div><em style="--t:' + t[3] + '">' + t[2] + '</em><b>' + t[0] + '</b><span>' + t[1] + '</span></div>';
  }).join("");

  var chips = ["All 15", "Image 11", "PDF 2", "Video 1", "Audio 1", "Utility 1", "AI 6"].map(function (c, i) {
    return '<i' + (i === 0 ? ' class="on"' : '') + '>' + c + '</i>';
  }).join("");

  var html = [
    '<div class="mw kn-win"><div class="mw-bar"><span class="mw-lights"><i></i><i></i><i></i></span></div>',
    '<div class="mw-body">',
    '<div class="kn-home"><div class="kn-head"><div class="kn-logo"></div><div><b>Knack</b><span>A toolkit for daily creative and engineering tasks</span></div></div>',
    '<div class="kn-search">Search tools</div><div class="kn-chips">' + chips + '</div><div class="kn-grid">' + cards + '</div></div>',
    '<div class="kn-tool"><div class="kn-th"><span class="kn-back">&lsaquo; All tools</span><div class="kn-ic kn-ic-l" style="--t:#4f8fff"></div><div><b>Image Compressor</b><span>Shrink PNG, JPEG and GIF without quality loss</span></div></div>',
    '<div class="kn-zone"><div class="kn-empty"><div class="kn-arrow"></div><b>Drop images here</b><span>or click to choose files</span></div>',
    '<div class="kn-photo"><div class="kn-sun"></div><div class="kn-hill kn-h1"></div><div class="kn-hill kn-h2"></div><div class="kn-meta"><b>IMG_2041.jpg</b><span>4.2 MB &middot; 4032 &times; 3024</span></div></div></div>',
    '<div class="kn-panel"><div class="kn-lab">QUALITY</div><div class="kn-slider"><i></i><u></u></div><div class="kn-val"><span>Smaller</span><b>78%</b><span>Sharper</span></div>',
    '<div class="kn-lab">FORMAT</div><div class="kn-sel">Keep original</div><div class="kn-lab">METADATA</div><div class="kn-tog"><span>Strip location and EXIF</span><i></i></div>',
    '<button class="kn-go"><s></s><span>Compress</span></button></div>',
    '<div class="kn-res"><div class="kn-lab">RESULT</div><div class="kn-nums"><span>4.2 MB</span><i>&rarr;</i><b>610 KB</b></div><div class="kn-save">86% smaller</div>',
    '<div class="kn-bars"><div><span>Before</span><u><i style="width:100%"></i></u></div><div><span>After</span><u><i class="kn-after"></i></u></div></div>',
    '<div class="kn-priv"><svg viewBox="0 0 16 16" width="15" height="15"><path d="M8 1.5l5 2v4c0 3.2-2.1 5.6-5 7-2.9-1.4-5-3.8-5-7v-4z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M5.6 8.2l1.8 1.8 3.2-3.6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg><span>Nothing uploaded. Processed on this Mac.</span></div>',
    '<button class="kn-save-btn">Save compressed image</button></div></div>',
    '</div></div>',
    '<div class="kn-file"><i></i><span>IMG_2041.jpg</span></div><div class="cursor"></div>'
  ].join("");

  function reset(root) {
    root.classList.remove("kn-hot", "kn-open", "kn-dropped", "kn-run", "kn-done");
    var go = root.querySelector(".kn-go");
    go.querySelector("s").style.width = "0%";
    go.querySelector("span").textContent = "Compress";
    var f = root.querySelector(".kn-file");
    f.style.setProperty("--x", "770px");
    f.style.setProperty("--y", "500px");
    var c = root.querySelector(".cursor");
    c.classList.remove("press");
    c.style.setProperty("--x", "760px");
    c.style.setProperty("--y", "470px");
  }

  Demos.register("knack", {
    kind: "mac",
    summary: "Twenty on-device tools in one window: drop a photo in, compress it from 4.2 MB to 610 KB, and nothing is uploaded.",
    html: html,
    reset: reset,
    steps: [
      { caption: "Twenty tools in one window", dur: 3000, run: async function (root, signal) {
        await Demos.wait(500, signal);
        aim(root, [330, 300]);
        await Demos.wait(1100, signal);
        aim(root, at(root, root.querySelector(".kn-target"), 70, 50));
        await Demos.wait(800, signal);
        root.classList.add("kn-hot");
        await press(root, signal);
        await Demos.wait(250, signal);
        root.classList.add("kn-open");
      } },
      { caption: "Drop in a photo", dur: 2600, run: async function (root, signal) {
        var f = root.querySelector(".kn-file");
        var z = at(root, root.querySelector(".kn-zone"), 250, 150);
        await Demos.wait(500, signal);
        aim(root, [z[0] + 10, z[1] + 12]);
        f.style.setProperty("--x", z[0] + "px");
        f.style.setProperty("--y", z[1] + "px");
        await Demos.wait(1000, signal);
        root.classList.add("kn-dropped");
      } },
      { caption: "Compress it right on your Mac", dur: 2800, run: async function (root, signal) {
        var go = root.querySelector(".kn-go");
        await Demos.wait(200, signal);
        aim(root, at(root, go, 100, 22));
        await Demos.wait(900, signal);
        await press(root, signal);
        root.classList.add("kn-run");
        var bar = go.querySelector("s"), label = go.querySelector("span");
        for (var p = 0; p <= 100; p += 5) {
          bar.style.width = p + "%";
          label.textContent = p < 100 ? "Compressing… " + p + "%" : "Done";
          await Demos.wait(55, signal);
        }
      } },
      { caption: "4.2 MB to 610 KB, nothing uploaded", dur: 2800, run: async function (root, signal) {
        await Demos.wait(250, signal);
        root.classList.add("kn-done");
        aim(root, at(root, root.querySelector(".kn-save-btn"), 150, 20));
      } }
    ],
    still: function (root) {
      root.classList.add("kn-open", "kn-dropped", "kn-run", "kn-done");
      root.querySelector(".kn-file").style.opacity = "0";
    },
    hold: 1500
  });
})();
