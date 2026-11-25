// Set current year
document.getElementById("year").textContent = new Date().getFullYear();

// Close Bootstrap mobile menu after selecting a section
const navMenu = document.getElementById("mainNav");
document.querySelectorAll("#mainNav .nav-link, #mainNav .nav-contact").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth < 992 && navMenu.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
    }
  });
});

// Reveal elements as they enter the viewport
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

// Back-to-top button
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  backToTop.classList.toggle("show", window.scrollY > 500);
}, { passive: true });

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Subtle mouse parallax for the 3D profile card
const profileCard = document.querySelector(".profile-card");
const heroVisual = document.querySelector(".hero-visual");

if (profileCard && heroVisual && window.matchMedia("(pointer: fine)").matches) {
  heroVisual.addEventListener("mousemove", (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    profileCard.style.transform = `rotateY(${-8 + x * 10}deg) rotateX(${-y * 7}deg)`;
  });

  heroVisual.addEventListener("mouseleave", () => {
    profileCard.style.transform = "rotateY(-8deg) rotateX(0deg)";
  });
}

// Contact form: email via FormSubmit + WhatsApp message preparation.
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  const submitButton = document.getElementById("contactSubmit");
  const feedback = document.getElementById("contactFeedback");

  const showFeedback = (message, type) => {
    feedback.textContent = message;
    feedback.className = `contact-feedback show ${type}`;
  };

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.classList.add("was-validated");
      contactForm.querySelector(":invalid")?.focus();
      showFeedback("Please complete all required fields with a valid email address.", "error");
      return;
    }

    // Basic honeypot spam check.
    if (document.getElementById("website").value.trim() !== "") {
      return;
    }

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const phone = document.getElementById("contactPhone").value.trim();
    const subject = document.getElementById("contactSubject").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    // Open a blank tab immediately during the user click to avoid popup blockers.
    // It will be redirected to WhatsApp only after the email request succeeds.
    const whatsappTab = window.open("about:blank", "_blank");

    const originalButton = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<span>Sending...</span> <span class="spinner-border spinner-border-sm ms-2" aria-hidden="true"></span>';
    feedback.className = "contact-feedback";

    const emailPayload = {
      name,
      email,
      phone: phone || "Not provided",
      subject,
      message,
      _subject: `Portfolio enquiry: ${subject}`,
      _template: "table"
    };

    try {
      const response = await fetch("https://formsubmit.co/ajax/Santhoshsa092o@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(emailPayload)
      });

      const result = await response.json();

      if (!response.ok || result.success === false) {
        throw new Error(result.message || "The email service could not accept your message.");
      }

      const whatsappText = [
        "Hello Santhosh, I sent an enquiry through your portfolio.",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "Not provided"}`,
        `Subject: ${subject}`,
        "",
        "Message:",
        message
      ].join("\n");

      const whatsappUrl = `https://wa.me/919940212094?text=${encodeURIComponent(whatsappText)}`;

      if (whatsappTab && !whatsappTab.closed) {
        whatsappTab.location.href = whatsappUrl;
      } else {
        window.open(whatsappUrl, "_blank", "noopener");
      }

      showFeedback(
        "Your enquiry has been submitted to the email service. WhatsApp has opened with the same message; please press Send in WhatsApp to deliver it.",
        "success"
      );
      contactForm.reset();
      contactForm.classList.remove("was-validated");
    } catch (error) {
      if (whatsappTab && !whatsappTab.closed) {
        whatsappTab.close();
      }
      console.error("Contact form error:", error);
      showFeedback(
        "Email could not be submitted. Please check your internet connection or use the email/WhatsApp links below.",
        "error"
      );
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalButton;
    }
  });
}
