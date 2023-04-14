const MAILERSEND_API_KEY = process.env.MAILERSEND_API_TOKEN || "";
const MAILERSEND_APU_URL = process.env.MAILERSEND_API_URL || "";
const MAILERSEND_ACTIVATION_TEMPLATE_ID = process.env.MAILERSEND_ACTIVATION_TEMPLATE_ID || "";
const MAILERSEND_RESET_PASSWORD_TEMPLATE_ID = process.env.MAILERSEND_RESET_PASSWORD_TEMPLATE_ID || "";
const COCKAIGNE_BASE_URL = process.env.COCKAIGNE_BASE_URL || "";

function createActivationRequest(name: string, email: string, activationCode: string): RequestInit {
  const BODY = {
    from: {
      email: "welcome@cockaigne.store",
      name: "Cockaigne"
    },
    to: [
      {
        email
      }
    ],
    subject: "Willkommen bei Cockaigne!",
    template_id: MAILERSEND_ACTIVATION_TEMPLATE_ID,
    variables: [
      {
        email,
        substitutions: [
          {
            var: "name",
            value: name
          },
          {
            var: "activationUrl",
            value: `${COCKAIGNE_BASE_URL}/activate/${activationCode}`
          }
        ]
      }
    ]
  };

  return {
    method: "post",
    headers: {
      Authorization: `Bearer ${MAILERSEND_API_KEY}`,
      "X-Requested-With": "XMLHttpRequest",
      "Content-type": "application/json"
    },
    body: JSON.stringify(BODY)
  };
}

function createResetPasswordRequest(name: string, email: string, resetPasswordCode: string): RequestInit {
  const BODY = {
    from: {
      email: "welcome@cockaigne.store",
      name: "Cockaigne"
    },
    to: [
      {
        email
      }
    ],
    subject: "Neues Cockaigne Passwort",
    template_id: MAILERSEND_RESET_PASSWORD_TEMPLATE_ID,
    variables: [
      {
        email,
        substitutions: [
          {
            var: "name",
            value: name
          },
          {
            var: "resetPasswordUrl",
            value: `${COCKAIGNE_BASE_URL}/password/${resetPasswordCode}`
          }
        ]
      }
    ]
  };

  return {
    method: "post",
    headers: {
      Authorization: `Bearer ${MAILERSEND_API_KEY}`,
      "X-Requested-With": "XMLHttpRequest",
      "Content-type": "application/json"
    },
    body: JSON.stringify(BODY)
  };
}

export async function sendActivationMail(name: string, email: string, activationCode: string) {
  const request = createActivationRequest(name, email, activationCode);
  const response = await fetch(MAILERSEND_APU_URL, request);

  if (!response.ok) {
    console.error("Can't send verification email:", await response.json());
  }
}

export async function sendResetPasswordMail(name: string, email: string, resetPasswordCode: string) {
  const request = createResetPasswordRequest(name, email, resetPasswordCode);
  const response = await fetch(MAILERSEND_APU_URL, request);

  if (!response.ok) {
    console.error("Can't send verification email:", await response.json());
  }
}
