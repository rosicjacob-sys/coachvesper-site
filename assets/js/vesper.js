(function () {
  var d = document;
  var CA = "BorZJZv4Zf8dVqoS68h5963UQX6VhYfKSxXAWX9Vpump";

  var toast = d.getElementById("v-toast");
  var tTimer = null;
  function notify(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(tTimer);
    tTimer = setTimeout(function () { toast.classList.remove("show"); }, 2500);
  }

  d.querySelectorAll("[data-copy]").forEach(function (b) {
    b.addEventListener("click", function () {
      var v = b.getAttribute("data-copy") || CA;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(v);
      }
      notify("THE BELL DECIDES · CA COPIED: " + v.slice(0, 6) + "..." + v.slice(-6));
      var orig = b.textContent;
      b.textContent = "COPIED ✓";
      setTimeout(function () { b.textContent = orig; }, 1600);
    });
  });

  // Hero Shrine Switcher
  var sImg = d.getElementById("v-shrine-img");
  var sBadge = d.getElementById("v-shrine-badge");
  var tabs = d.querySelectorAll("[data-v-img]");
  tabs.forEach(function (t) {
    t.addEventListener("click", function () {
      if (sImg) sImg.setAttribute("src", t.getAttribute("data-v-img"));
      if (sBadge) sBadge.textContent = t.getAttribute("data-v-label");
      tabs.forEach(function (x) { x.classList.toggle("active", x === t); });
    });
  });

  // Iron Bell Strike Combo Simulator
  var bellBtn = d.getElementById("v-bell-btn");
  var bellCountEl = d.getElementById("v-bell-count");
  var steps = d.querySelectorAll(".v-combo-step");
  var strikes = 0;
  if (bellBtn) {
    bellBtn.addEventListener("click", function () {
      strikes++;
      if (bellCountEl) bellCountEl.textContent = String(strikes);
      d.body.classList.remove("bell-struck");
      void d.body.offsetWidth;
      d.body.classList.add("bell-struck");
      if (sImg) sImg.setAttribute("src", strikes % 2 === 1 ? "assets/media/laser.png" : "assets/media/moon.png");
      steps.forEach(function (st, idx) {
        setTimeout(function () {
          steps.forEach(function (x) { x.classList.remove("lit"); });
          st.classList.add("lit");
        }, idx * 140);
      });
      notify("BELL STRUCK AT 03:00 AM · PEEK-A-BOO COMBO UNLEASHED (#" + strikes + ")");
    });
  }

  // Before/After Slider
  d.querySelectorAll(".v-ba").forEach(function (ba) {
    var r = ba.querySelector(".v-ba-range");
    if (!r) return;
    var up = function () { ba.style.setProperty("--pos", r.value + "%"); };
    r.addEventListener("input", up);
    up();
  });

  // Live DexScreener Fetch
  fetch("https://api.dexscreener.com/latest/dex/tokens/" + CA)
    .then(function (r) { return r.json(); })
    .then(function (j) {
      var p = (j && j.pairs && j.pairs[0]) || null;
      if (!p) return;
      var pr = d.getElementById("v-price");
      var mc = d.getElementById("v-mcap");
      if (pr && p.priceUsd) pr.textContent = "$" + p.priceUsd;
      if (mc && (p.marketCap || p.fdv)) mc.textContent = "$" + Number(p.marketCap || p.fdv).toLocaleString("en-US", { maximumFractionDigits: 0 });
    })
    .catch(function () {});
})();
