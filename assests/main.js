document.getElementById("year").textContent = new Date().getFullYear();

(function initHeaderScrollShrink() {
  const header = document.querySelector("header");
  if (!header) return;

  const threshold = 40;
  let ticking = false;

  function sync() {
    header.classList.toggle("is-scrolled", window.scrollY > threshold);
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(sync);
        ticking = true;
      }
    },
    { passive: true }
  );

  sync();
})();

(function initFaqPremium() {
  const acc = document.querySelector(".faq-premium__accordion");
  if (!acc) return;

  acc.querySelectorAll(".faq-premium__item").forEach((item) => {
    const btn = item.querySelector(".faq-premium__summary");
    if (!btn) return;

    btn.addEventListener("click", () => {
      const wasOpen = item.classList.contains("is-open");
      acc.querySelectorAll(".faq-premium__item").forEach((el) => {
        el.classList.remove("is-open");
        el.querySelector(".faq-premium__summary")?.setAttribute("aria-expanded", "false");
      });
      if (!wasOpen) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  acc.querySelectorAll(".faq-premium__item.is-open .faq-premium__summary").forEach((b) => {
    b.setAttribute("aria-expanded", "true");
  });
})();

(function () {
  const mainBtn = document.getElementById("main-button");
  const mainDiv = document.getElementById("main-div");
  if (!mainBtn || !mainDiv) return;

  mainBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    const open = mainBtn.classList.toggle("open");
    mainBtn.setAttribute("aria-expanded", open ? "true" : "false");
    mainBtn.setAttribute(
      "aria-label",
      open ? "Закрыть контакты" : "Открыть контакты"
    );
  });

  mainDiv.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  document.addEventListener("click", function () {
    if (mainBtn.classList.contains("open")) {
      mainBtn.classList.remove("open");
      mainBtn.setAttribute("aria-expanded", "false");
      mainBtn.setAttribute("aria-label", "Открыть контакты");
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && mainBtn.classList.contains("open")) {
      mainBtn.classList.remove("open");
      mainBtn.setAttribute("aria-expanded", "false");
      mainBtn.setAttribute("aria-label", "Открыть контакты");
    }
  });
})();
