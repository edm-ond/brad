document.addEventListener("DOMContentLoaded", () => {
    const htmlElement = document.documentElement;
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = themeToggle?.querySelector(".theme-icon");

    const updateIcon = (theme) => {
        if (themeIcon) themeIcon.innerHTML = theme === "dark" ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    };

    const savedTheme = localStorage.getItem("theme");
    const initialTheme = savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    htmlElement.setAttribute("data-theme", initialTheme);
    updateIcon(initialTheme);

    themeToggle?.addEventListener("click", () => {
        const nextTheme = htmlElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        htmlElement.setAttribute("data-theme", nextTheme);
        localStorage.setItem("theme", nextTheme);
        updateIcon(nextTheme);
    });

    const menuButton = document.querySelector(".menu-button");
    const navLinks = document.querySelector(".nav-links");
    const closeMenu = () => {
        navLinks?.classList.remove("active");
        menuButton?.setAttribute("aria-expanded", "false");
        if (menuButton) menuButton.textContent = "☰";
    };

    menuButton?.addEventListener("click", () => {
        const isOpen = navLinks?.classList.toggle("active");
        menuButton.setAttribute("aria-expanded", String(Boolean(isOpen)));
        menuButton.textContent = isOpen ? "✕" : "☰";
    });
    document.querySelectorAll(".nav-links a").forEach((link) => link.addEventListener("click", closeMenu));
    menuButton?.addEventListener("keydown", (event) => {
        if (event.key === "Escape") { closeMenu(); menuButton.focus(); }
    });

    const sections = document.querySelectorAll("section[id]");
    const navigationLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    if ("IntersectionObserver" in window && sections.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) navigationLinks.forEach((link) => {
                    link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
                });
            });
        }, { threshold: 0.25, rootMargin: "-10% 0px -50% 0px" });
        sections.forEach((section) => observer.observe(section));
    }

    const copyrightYear = document.getElementById("copyright-year");
    if (copyrightYear) copyrightYear.innerHTML = `&copy; ${new Date().getFullYear()} Bradley Ochieng. All Rights Reserved.`;
});


document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const status = form.querySelector('.form-status');
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const message = form.elements.message.value.trim();
    const recipient = 'bp2456512@gmail.com';
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    status.textContent = `Opening your email app for ${recipient}. Your message has not been sent until you send it there.`;
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  });
});
