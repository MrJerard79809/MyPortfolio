// loader loading before the website start
function toggleMenu() {
    var menu = document.getElementById("menu");
    menu.classList.toggle("show");
}

document.addEventListener("DOMContentLoaded", function () {
    var loaderContainer = document.querySelector('.loader-container');
    var header = document.querySelector('.header');
    var logo = document.querySelector('.logo');

    setTimeout(function () {
        loaderContainer.style.display = 'none';
        header.style.zIndex = '2';
        logo.style.zIndex = '2';
    }, 2000);

    // Unified About scroll behavior (Desktop + Mobile)
    document.querySelectorAll('a[href="./about"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector('.aboutcontent');

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                setTimeout(function () {
                    window.location.reload(true);
                }, 1000);
            }
        });
    });

    // Back to top button logic
    const backToTopBtn = document.getElementById('backToTopBtn');

    function toggleBackToTop() {
        if (!backToTopBtn) return; // Safeguard if the element doesn't exist

        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    }

    window.addEventListener('scroll', toggleBackToTop);

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Header scroll effect
    const scrollHeader = document.querySelector('header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 0) {
            scrollHeader.classList.add('scrolled');
        } else {
            scrollHeader.classList.remove('scrolled');
        }
    });
});

async function generateHash() {
    const userId = "nevermind02031298";
    try {
        const res = await fetch('/.netlify/functions/generate-hash', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        });

        const data = await res.json();

        if (data.success) {
            console.log("✅ Hash generated:", data.hash);
            alert("Hash: " + data.hash);
        } else {
            console.error("❌ Error:", data.message);
            alert("Error: " + data.message);
        }
    } catch (err) {
        console.error("⚠️ Network error:", err);
        alert("Network error");
    }
}

document.getElementById("secureForm")?.addEventListener("submit", function (e) {
    const recaptchaResponse = document.querySelector('[name="g-recaptcha-response"]')?.value;

    if (!recaptchaResponse || recaptchaResponse.trim() === "") {
        e.preventDefault();
        alert("❌ Please complete the CAPTCHA.");
        console.error("⚠️ reCAPTCHA widget is missing or incomplete.");
        return;
    }

    setTimeout(() => {
        location.reload();
    }, 3000);
});

function showImage(src) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    modalImg.src = src;
    modal.style.display = 'flex';
}

function closeImage() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    document.getElementById('modalImage').src = '';
}

function toggleMenu() {
    document.getElementById('menu').classList.toggle('active');
}
