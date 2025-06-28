
  document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const form = e.target;
    const status = document.getElementById("form-status");

    // Get Cloudflare Turnstile token
    const token = turnstile.getResponse();

    if (!token) {
      status.textContent = "⚠️ Please complete the CAPTCHA.";
      status.style.color = "orange";
      return;
    }

    const formData = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
      token: token
    };

    try {
      const response = await fetch("/.netlify/functions/sendform", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        status.textContent = "✅ Message sent!";
        status.style.color = "limegreen";
        form.reset();
        turnstile.reset();
      } else {
        status.textContent = "❌ " + result.error;
        status.style.color = "red";
      }
    } catch (err) {
      status.textContent = "⚠️ Network error.";
      status.style.color = "orange";
    }
  });
