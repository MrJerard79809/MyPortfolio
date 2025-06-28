export async function handler(event) {
  const { name, email, message, token } = JSON.parse(event.body || '{}');
  const secret = process.env.HCAPTCHA_SECRET;

  if (!token) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing hCaptcha token" })
    };
  }

  // Verify hCaptcha
  const captchaVerify = await fetch("https://hcaptcha.com/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret,
      response: token
    })
  });

  const captchaResult = await captchaVerify.json();

  if (!captchaResult.success) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid hCaptcha" })
    };
  }

  // Submit to Formspree
  const formspreeResponse = await fetch("https://formspree.io/f/mnnvbjlv", {
    method: "POST",
    headers: { Accept: "application/json" },
    body: new URLSearchParams({ name, email, message })
  });

  if (formspreeResponse.ok) {
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } else {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Formspree submission failed" })
    };
  }
}
