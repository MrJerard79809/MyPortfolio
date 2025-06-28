export async function handler(event) {
  const { name, email, message, token } = JSON.parse(event.body);

  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: secretKey,
      response: token,
    }),
  });

  const verification = await response.json();

  if (!verification.success) {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, error: "CAPTCHA verification failed" }),
    };
  }

  const formRes = await fetch("https://formspree.io/f/mnnvbjlv", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      name,
      email,
      message,
    }).toString(),
  });

  if (!formRes.ok) {
    const err = await formRes.text();
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: "Formspree failed", detail: err }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
  };
}
