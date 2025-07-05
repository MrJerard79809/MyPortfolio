// === Page Loader & Header Behavior ===
document.addEventListener("DOMContentLoaded", () => {
    const loaderContainer = document.querySelector('.loader-container');
    const header = document.querySelector('.header');
    const logo = document.querySelector('.logo');
    const scrollHeader = document.querySelector('header');
    const backToTopBtn = document.getElementById('backToTopBtn');

    // Hide loader after delay
    setTimeout(() => {
        loaderContainer.style.display = 'none';
        header.style.zIndex = '2';
        logo.style.zIndex = '2';
    }, 2000);

    // Show/hide "Back to Top" button
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        backToTopBtn.style.display = scrollTop > 20 ? 'block' : 'none';
        scrollHeader.classList.toggle('scrolled', scrollTop > 0);
    });

    // Scroll to top on button click
    backToTopBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// === Mobile Menu Toggle ===
function toggleMenu() {
    document.getElementById('menu')?.classList.toggle('active');
}

// === Generate Secure Hash from Serverless Function ===
async function generateHash() {
    const userId = "nevermind02031298";
    try {
        const res = await fetch('/.netlify/functions/generate-hash', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId }),
        });

        const data = await res.json();

        if (data.success) {
            console.log("✅ Hash generated:", data.hash);
            alert("Hash: " + data.hash);
        } else {
            throw new Error(data.message || "Unknown error");
        }
    } catch (err) {
        console.error("⚠️ Network or server error:", err.message);
        alert("Error: " + err.message);
    }
}

// === Form reCAPTCHA Validation ===
document.getElementById("secureForm")?.addEventListener("submit", function (e) {
    const recaptchaResponse = document.querySelector('[name="g-recaptcha-response"]')?.value;

    if (!recaptchaResponse || recaptchaResponse.trim() === "") {
        e.preventDefault();
        alert("❌ Please complete the CAPTCHA.");
        console.error("⚠️ reCAPTCHA validation failed.");
        return;
    }

    // Optional: Reload after delay (success case)
    setTimeout(() => location.reload(), 3000);
});

// === Modal Image Viewer ===
function showImage(src) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    if (modal && modalImg) {
        modalImg.src = src;
        modal.style.display = 'flex';
    }
}

function closeImage() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    if (modal && modalImg) {
        modal.style.display = 'none';
        modalImg.src = '';
    }
}
