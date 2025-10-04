// Theme management
const themeToggle = document.getElementById("theme-toggle");
const html = document.documentElement;

// Initialize
function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
}

// Toggle theme
function toggleTheme() {
  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    html.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
}

// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

function toggleMobileMenu() {
  mobileMenu.classList.toggle("hidden");
}

// Copy to clipboard functionality
function copyToClipboard(button) {
  const codeBlock = button.parentElement.querySelector("code");
  const text = codeBlock.textContent;

  navigator.clipboard
    .writeText(text)
    .then(() => {
      const originalText = button.textContent;
      button.textContent = "Copied!";
      button.classList.add("copied");

      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove("copied");
      }, 2000);
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);

      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;

      // Check if document.body exists before proceeding
      if (document.body) {
        document.body.appendChild(textArea);
        textArea.select();

        try {
          document.execCommand("copy");
          const originalText = button.textContent;
          button.textContent = "Copied!";
          button.classList.add("copied");

          setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove("copied");
          }, 2000);
        } catch (fallbackErr) {
          console.error("Fallback copy failed: ", fallbackErr);
        }

        document.body.removeChild(textArea);
      } else {
        console.error(
          "Cannot copy to clipboard: document.body is not available"
        );
      }
    });
}

// Table of Contents functionality
function generateTOC() {
  const tocContent = document.getElementById("toc-content");
  const articleContent = document.getElementById("article-content");

  if (!tocContent || !articleContent) return;

  const headings = articleContent.querySelectorAll("h2, h3");
  if (headings.length === 0) return;

  tocContent.innerHTML = "";

  headings.forEach((heading, index) => {
    // Add ID to heading if it doesn't have one
    console.log(heading);
    if (!heading.id) {
      heading.id = `heading-${index}`;
    }

    const level = heading.tagName === "H2" ? 0 : 1;
    const link = document.createElement("a");
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent;
    link.className = `block py-1.5 px-3 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded ${
      level === 0
        ? "font-medium text-gray-900 dark:text-white"
        : "ml-4 text-gray-700 dark:text-gray-300"
    }`;

    link.addEventListener("click", function (e) {
      e.preventDefault();
      heading.scrollIntoView({ behavior: "smooth", block: "start" });
      // Update URL without scrolling
      history.pushState(null, null, `#${heading.id}`);
    });

    tocContent.appendChild(link);
  });
}

function toggleTOC() {
  const tocContent = document.getElementById("toc-content");
  const tocChevron = document.getElementById("toc-chevron");

  if (!tocContent || !tocChevron) return;

  if (tocContent.style.display === "none") {
    tocContent.style.display = "block";
    tocChevron.style.transform = "rotate(0deg)";
  } else {
    tocContent.style.display = "none";
    tocChevron.style.transform = "rotate(-90deg)";
  }
}

// Share functionality
function shareArticle(platform) {
  const url = window.location.href;
  const title = document.title;

  let shareUrl = "";

  switch (platform) {
    case "twitter":
      shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(title)}`;
      break;
    case "linkedin":
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(title)}`;
      break;
    case "facebook":
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`;
      break;
    default:
      return;
  }

  window.open(shareUrl, "_blank", "width=600,height=400");
}

// Form handling
function handleContactForm(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const submitBtn = form.querySelector('button[type="submit"]');
  const successMessage = document.getElementById("success-message");

  // Disable submit button
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  // Simulate form submission (replace with actual form handling)
  setTimeout(() => {
    form.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";
    successMessage.classList.remove("hidden");

    // Hide success message after 5 seconds
    setTimeout(() => {
      successMessage.classList.add("hidden");
    }, 5000);
  }, 1500);
}

function handleNewsletterForm(event) {
  event.preventDefault();

  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  submitBtn.disabled = true;
  submitBtn.textContent = "Subscribing...";

  // Simulate newsletter subscription
  setTimeout(() => {
    form.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = "Subscribed!";

    setTimeout(() => {
      submitBtn.textContent = originalText;
    }, 2000);
  }, 1000);
}

// Smooth scrolling for anchor links
function smoothScroll(target) {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Lazy loading for images
function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("loading");
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Search functionality (if needed)
function searchArticles(query) {
  // Implement search functionality here
  console.log("Searching for:", query);
}

// Analytics tracking (replace with actual analytics code)
function trackEvent(eventName, properties = {}) {
  console.log("Tracking event:", eventName, properties);
  // Example: gtag('event', eventName, properties);
}

// Page load analytics
function trackPageView() {
  trackEvent("page_view", {
    page_title: document.title,
    page_location: window.location.href,
  });
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize theme
  initTheme();

  // Add event listeners
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", toggleMobileMenu);
  }

  // Handle contact form
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactForm);
  }

  // Handle newsletter form
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", handleNewsletterForm);
  }

  // Initialize lazy loading
  if ("IntersectionObserver" in window) {
    lazyLoadImages();
  }

  // Generate table of contents if TOC element exists
  if (document.getElementById("toc-content")) {
    generateTOC();
    toggleTOC();
  }

  // Track page view
  trackPageView();

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (event) {
    if (
      mobileMenu &&
      !mobileMenu.contains(event.target) &&
      !mobileMenuBtn.contains(event.target)
    ) {
      mobileMenu.classList.add("hidden");
    }
  });

  // Handle escape key for mobile menu
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.add("hidden");
    }
  });

  // Add hover effects to cards
  // const cards = document.querySelectorAll('article, .bg-white, .dark\\:bg-dark-800');
  // cards.forEach(card => {
  //     if (!card.classList.contains('no-hover')) {
  //         card.classList.add('hover-lift');
  //     }
  // });
});

// Listen for system theme changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", function (e) {
    if (!localStorage.getItem("theme")) {
      if (e.matches) {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }
    }
  });

// Handle online/offline status
window.addEventListener("online", function () {
  console.log("Back online");
});

window.addEventListener("offline", function () {
  console.log("Gone offline");
});

// Performance monitoring
window.addEventListener("load", function () {
  // Track page load time
  const loadTime = performance.now();
  trackEvent("page_load_time", { load_time: Math.round(loadTime) });
});

// Error tracking
window.addEventListener("error", function (event) {
  console.error("JavaScript error:", event.error);
  trackEvent("javascript_error", {
    error_message: event.message,
    error_filename: event.filename,
    error_line: event.lineno,
  });
});

// Export functions for global use
window.copyToClipboard = copyToClipboard;
window.shareArticle = shareArticle;
window.smoothScroll = smoothScroll;
window.trackEvent = trackEvent;
window.toggleTOC = toggleTOC;
