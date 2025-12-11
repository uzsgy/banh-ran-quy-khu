// ===================================
// Mobile Navigation Toggle
// ===================================
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

// ===================================
// Gallery Image Loader
// ===================================
function loadGalleryImages() {
  const galleryGrid = document.getElementById("galleryGrid");
  if (!galleryGrid) return; // Total number of images (anh-01.webp to anh-30.webp)
  const totalImages = 30;
  const imagesToShow = 12; // Number of images to display // Create array of all image numbers
  const allImages = Array.from({ length: totalImages }, (_, i) => i + 1); // Shuffle array to randomize
  const shuffled = allImages.sort(() => Math.random() - 0.5); // Take first N images
  const selectedImages = shuffled.slice(0, imagesToShow); // Clear existing content
  galleryGrid.innerHTML = ""; // Create gallery items
  selectedImages.forEach((num, index) => {
    const imageNum = String(num).padStart(2, "0");
    const galleryItem = document.createElement("div");
    galleryItem.className = "gallery-item";
    galleryItem.setAttribute("data-aos", "fade-up");
    galleryItem.setAttribute("data-aos-delay", index * 100);
    galleryItem.innerHTML = `
      <img src="./anh-${imageNum}.webp"
        alt="Hình ảnh Bánh rán Quy Khứ ${num}"
        style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px; cursor: pointer;"
        loading="lazy">
    `;
    galleryGrid.appendChild(galleryItem);
  }); // Re-initialize lightbox for new images
  initializeLightbox();
}

// Load gallery images when page loads
document.addEventListener("DOMContentLoaded", loadGalleryImages);

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.style.overflow = navMenu.classList.contains("active")
      ? "hidden"
      : "";
  }); // Close menu when clicking on a link

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "";
    });
  });
}

// ===================================
// Smooth Scrolling for Navigation Links
// ===================================
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      const headerHeight = document.querySelector("#header").offsetHeight;
      const targetPosition = targetSection.offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// ===================================
// Header Scroll Effect
// ===================================
const header = document.querySelector("#header");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
  lastScroll = currentScroll;
});

// ===================================
// Active Navigation Link on Scroll
// ===================================
const sections = document.querySelectorAll("section[id]");

function updateActiveLink() {
  const scrollY = window.pageYOffset;
  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => link.classList.remove("active"));
      if (navLink) navLink.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveLink);

// ===================================
// Menu Category Filter
// ===================================
const categoryButtons = document.querySelectorAll(".category-btn");
const menuItems = document.querySelectorAll(".menu-item");

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    categoryButtons.forEach((btn) => btn.classList.remove("active")); // Add active class to clicked button
    button.classList.add("active");
    const category = button.getAttribute("data-category"); // Filter menu items
    menuItems.forEach((item) => {
      const itemCategory = item.getAttribute("data-category");
      if (category === "all" || itemCategory === category) {
        item.style.display = "block";
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "scale(1)";
        }, 10);
      } else {
        item.style.opacity = "0";
        item.style.transform = "scale(0.8)";
        setTimeout(() => {
          item.style.display = "none";
        }, 300);
      }
    });
  });
});

// ===================================
// FAQ Accordion
// ===================================
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const faqItem = question.parentElement;
    const isActive = faqItem.classList.contains("active"); // Close all FAQ items
    document.querySelectorAll(".faq-item").forEach((item) => {
      item.classList.remove("active");
    }); // Open clicked item if it wasn't active
    if (!isActive) {
      faqItem.classList.add("active");
    }
  });
});

// ===================================
// Scroll to Top Button
// ===================================
const scrollTopBtn = document.querySelector("#scrollTop");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ===================================
// Order Button Handler
// ===================================
const orderButtons = document.querySelectorAll(".menu-item .btn-primary");

orderButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const menuItem = e.target.closest(".menu-item");
    const itemName = menuItem.querySelector("h3").textContent;
    const itemPrice = menuItem.querySelector(".price").textContent; // Create WhatsApp message
    const phone = "84866793600";
    const message = `Xin chào! Tôi muốn đặt món: ${itemName}(${itemPrice})`;
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
      message
    )}`; // Open WhatsApp or show confirmation
    if (
      confirm(
        `Đặt món: ${itemName}(${itemPrice})?\n\nBạn sẽ được chuyển đến WhatsApp để hoàn tất đơn hàng.`
      )
    ) {
      window.open(whatsappUrl, "_blank");
    }
  });
});

// ===================================
// Gallery Lightbox (Simple)
// ===================================
function initializeLightbox() {
  const galleryItems = document.querySelectorAll(".gallery-item img");

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Create lightbox overlay
      const lightbox = document.createElement("div");
      lightbox.className = "lightbox-overlay";
      lightbox.innerHTML = `
        <div class="lightbox-content">
          <button class="lightbox-close">&times;</button>
          <div class="lightbox-image">
            <img src="${item.src}" alt="${item.alt}" style="max-width: 100%; max-height: 90vh; border-radius: 8px;">
          </div>
        </div>
      `;
      document.body.appendChild(lightbox);
      document.body.style.overflow = "hidden"; // Add CSS for lightbox
      const lightboxStyle = document.createElement("style");
      lightboxStyle.textContent = `
        .lightbox-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          padding: 2rem;
          animation: fadeIn 0.3s ease;
        }
       
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
       
        .lightbox-content {
          position: relative;
          max-width: 1200px;
          width: 100%;
          animation: zoomIn 0.3s ease;
        }
       
        @keyframes zoomIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
       
        .lightbox-close {
          position: absolute;
          top: -40px;
          right: 0;
          background: none;
          border: none;
          color: white;
          font-size: 3rem;
          cursor: pointer;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
        }
       
        .lightbox-close:hover {
          transform: scale(1.2) rotate(90deg);
        }
       
        .lightbox-image {
          border-radius: 8px;
          overflow: hidden;
          text-align: center;
        }
      `;
      if (!document.querySelector("#lightbox-style")) {
        lightboxStyle.id = "lightbox-style";
        document.head.appendChild(lightboxStyle);
      } // Close lightbox
      const closeBtn = lightbox.querySelector(".lightbox-close");
      const closeLightbox = () => {
        lightbox.style.animation = "fadeOut 0.3s ease";
        setTimeout(() => {
          lightbox.remove();
          document.body.style.overflow = "";
        }, 300);
      };
      closeBtn.addEventListener("click", closeLightbox);
      lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
      }); // Close on Escape key
      document.addEventListener("keydown", function escapeHandler(e) {
        if (e.key === "Escape") {
          closeLightbox();
          document.removeEventListener("keydown", escapeHandler);
        }
      });
    });
  });
}

// ===================================
// Video Player
// ===================================
const videoPlaceholder = document.querySelector(".video-placeholder");

if (videoPlaceholder) {
  videoPlaceholder.addEventListener("click", () => {
    // In a real implementation, you would embed a video player here
    alert(
      "Tính năng video sẽ được cập nhật sớm!\n\nBạn có thể thêm link YouTube hoặc video của quán tại đây."
    );
  });
}

// ===================================
// Scroll Animations
// ===================================
function revealOnScroll() {
  const reveals = document.querySelectorAll(
    ".menu-item, .review-card, .gallery-item, .info-item"
  );
  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
}

// Initialize elements for scroll animation
document
  .querySelectorAll(".menu-item, .review-card, .gallery-item, .info-item")
  .forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

window.addEventListener("scroll", revealOnScroll);
revealOnScroll(); // Initial check

// ===================================
// Phone Call Tracking
// ===================================
const phoneLinks = document.querySelectorAll('a[href^="tel:"]');

phoneLinks.forEach((link) => {
  link.addEventListener("click", () => {
    // Track phone calls in analytics (if implemented)
    console.log("Phone call initiated:", link.href);
  });
});

// ===================================
// Form Validation (if you add a contact form later)
// ===================================
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
  const re = /^[0-9]{10,11}$/;
  return re.test(String(phone).replace(/\s/g, ""));
}

// ===================================
// Loading Animation
// ===================================
window.addEventListener("load", () => {
  document.body.classList.add("loaded"); // Add loading class animation CSS
  const loadingStyle = document.createElement("style");
  loadingStyle.textContent = `
    body:not(.loaded) {
      overflow: hidden;
    }
   
    body:not(.loaded)::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: white;
      z-index: 99999;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `;
  document.head.appendChild(loadingStyle);
});

// ===================================
// Dynamic Year in Footer
// ===================================
const yearElement = document.querySelector(".footer-bottom p");
if (yearElement) {
  const currentYear = new Date().getFullYear();
  yearElement.innerHTML = yearElement.innerHTML.replace("2024", currentYear);
}

// ===================================
// Lazy Load Images (if you add real images)
// ===================================
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.add("loaded");
          observer.unobserve(img);
        }
      }
    });
  });
  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// ===================================
// Performance Optimization
// ===================================
// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Apply debounce to scroll handlers
window.addEventListener("scroll", debounce(revealOnScroll, 20));

// ===================================
// Console Message
// ===================================
console.log(
  "%c🍩 Bánh rán Quy Khứ - Website",
  "color: #ff6b35; font-size: 20px; font-weight: bold;"
);
console.log(
  "%cHương vị truyền thống giữa lòng Hà Nội",
  "color: #636e72; font-size: 14px;"
);
console.log("%c📞 Đặt hàng: 0866 793 600", "color: #00b894; font-size: 14px;");
