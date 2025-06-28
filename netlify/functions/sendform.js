/*
export async function handler(event) {
  const { name, email, message, token } = JSON.parse(event.body || '{}');

  const secret = process.env.HCAPTCHA_SECRET_TEST;
  const verifyRes = await fetch('https://hcaptcha.com/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token })
  });

  const verifyData = await verifyRes.json();
  if (!verifyData.success) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid hCaptcha' })
    };
  }

  // Submit to Formspree secretly
  const formspreeRes = await fetch('https://formspree.io/f/mnnvbjlv', {
    method: 'POST',
    headers: { 'Accept': 'application/json' },
    body: new URLSearchParams({ name, email, message })
  });

  if (formspreeRes.ok) {
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } else {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Formspree submission failed' })
    };
  }
}
*/