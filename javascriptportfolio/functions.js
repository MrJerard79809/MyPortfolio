// loader loading before the website start //
function toggleMenu() {
    var menu = document.getElementById("menu");
    menu.classList.toggle("show");
}

document.addEventListener("DOMContentLoaded", function () {
    var loaderContainer = document.querySelector('.loader-container');
    var content = document.querySelector('.content');
    var header = document.querySelector('.header');
    var logo = document.querySelector('.logo');
    var image = document.querySelector('.image');

    setTimeout(function () {
        loaderContainer.style.display = 'none';
        // Set a higher z-index for header, logo, and image
        header.style.zIndex = '2';
        logo.style.zIndex = '2';
    }, 
    2000); // Adjust the time (in milliseconds) based on your needs
});

//SCROLL DOWN TO ABOUT ME //
document.addEventListener('DOMContentLoaded', function() {
    // Scroll to About Me
    document.querySelectorAll('a[href="./about"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetElement = document.querySelector('.aboutcontent');

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Display function for Back to Top button
    const backToTopBtn = document.getElementById('backToTopBtn');

    function displayBackToTopButton() {
        // Check scroll position to determine when to display the button
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    }

    // Add scroll event listener to display the button dynamically
    window.addEventListener('scroll', displayBackToTopButton);

    // Scroll to top when the button is clicked
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const aboutLink = document.querySelector('a[href="./about"]');
    
    aboutLink.addEventListener('click', function (e) {
        e.preventDefault();

        const targetElement = document.querySelector('.aboutcontent');

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });

            // Refresh the page after scrolling without displaying the reload message
            setTimeout(function() {
                window.location.reload(true);
            }, 1000); // Adjust the time delay as needed
        }
    });

    // Show/hide the "Back to Top" button based on scroll position
    const backToTopBtn = document.getElementById('backToTopBtn');
    
    window.addEventListener('scroll', function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    // Scroll to the top when the button is clicked
    backToTopBtn.addEventListener('click', function() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');

    window.addEventListener('scroll', function() {
      // Check if the user has scrolled down
      if (window.scrollY > 0) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
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


document.addEventListener('DOMContentLoaded', function() {
    const aboutLink = document.querySelector('a[href="./about"]');
    
    aboutLink.addEventListener('click', function (e) {
        e.preventDefault();

        const targetElement = document.querySelector('.aboutcontent');

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });

            // Refresh the page after scrolling without displaying the reload message
            setTimeout(function() {
                window.location.reload(true);
            }, 1000); // Adjust the time delay as needed
        }
    });

    // Show/hide the "Back to Top" button based on scroll position
    const backToTopBtn = document.getElementById('backToTopBtn');
    
    window.addEventListener('scroll', function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    // Scroll to the top when the button is clicked
    backToTopBtn.addEventListener('click', function() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');

    window.addEventListener('scroll', function() {
      // Check if the user has scrolled down
      if (window.scrollY > 0) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  });


   document.getElementById("secureForm").addEventListener("submit", function (e) {
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
