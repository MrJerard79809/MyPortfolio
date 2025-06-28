export async function handler(event) {
  try {
    const { name, email, message, token } = JSON.parse(event.body);

    const secretKey = "YOUR_SECRET_KEY"; // Replace with your Cloudflare Turnstile secret key

    // 1. Verify Turnstile CAPTCHA
    const captchaRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: secretKey, response: token }),
    });

    const captchaData = await captchaRes.json();
    if (!captchaData.success) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: "CAPTCHA verification failed" }),
      };
    }

    // 2. Submit to Formspree
    const formRes = await fetch("https://formspree.io/f/mnnvbjlv", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new URLSearchParams({ name, email, message }),
    });

    if (!formRes.ok) {
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, error: "Formspree submission failed" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: "Server error" }),
    };
  }
}
