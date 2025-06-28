  document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const form = e.target;
    const status = document.getElementById("form-status");
    const token = turnstile.getResponse(); // get Cloudflare token

    if (!token) {
      status.textContent = "⚠️ Please complete the CAPTCHA.";
      return;
    }

    const formData = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
      token: token
    };

    try {
      const res = await fetch("/.netlify/functions/verify-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const result = await res.json();
      if (result.success) {
        status.textContent = "✅ Message sent!";
        form.reset();
        turnstile.reset();
      } else {
        status.textContent = "❌ " + result.error;
      }
    } catch (err) {
      status.textContent = "⚠️ Network error.";
    }
  });