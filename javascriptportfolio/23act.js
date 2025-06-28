  const form = document.getElementById("contactForm");
  const status = document.getElementById("status");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const token = document.querySelector('[name="cf-turnstile-response"]').value;

    if (!token) {
      status.textContent = "⚠️ Please complete the CAPTCHA.";
      return;
    }

    const formData = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
      token: token,
    };

    try {
      const res = await fetch("/.netlify/functions/verify-turnstile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        status.textContent = "✅ Message sent!";
        form.reset();
        turnstile.reset(); // optional reset
      } else {
        status.textContent = "❌ CAPTCHA failed.";
      }
    } catch (err) {
      status.textContent = "⚠️ Error submitting form.";
    }
  });