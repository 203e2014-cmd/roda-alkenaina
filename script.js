// وظائف بسيطة للموقع (قائمة الجوال + نموذج واتساب + سنة الفوتر)

const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

function setMenu(open) {
  if (!navToggle || !navMenu) return;
  navToggle.setAttribute("aria-expanded", String(open));
  navMenu.classList.toggle("is-open", open);
}

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    setMenu(!isOpen);
  });

  // إغلاق القائمة عند اختيار عنصر
  navMenu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => setMenu(false));
  });

  // إغلاق القائمة عند الضغط خارجها
  document.addEventListener("click", (e) => {
    if (!navMenu.classList.contains("is-open")) return;
    const target = e.target;
    const clickedInside =
      navMenu.contains(target) || (navToggle && navToggle.contains(target));
    if (!clickedInside) setMenu(false);
  });
}

// تحديث سنة الفوتر
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// نموذج تواصل يفتح واتساب برسالة جاهزة
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const message = String(formData.get("message") || "").trim();

    // رقم واتساب (يمكن تغييره لاحقًا). حالياً مضبوط على الرقم الأول مع كود 249
    const waNumber = "249912519696";

    const text = [
      "السلام عليكم،",
      `الاسم: ${name}`,
      `رقم الهاتف: ${phone}`,
      `الرسالة: ${message}`,
    ].join("\n");

    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  });
}

