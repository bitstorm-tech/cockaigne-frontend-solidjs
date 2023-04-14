export const usernameAlreadyExists: RequestError = {
  code: 1,
  message: "Der Benutzername wird bereits verwendet"
};

export const emailAlreadyExists: RequestError = {
  code: 2,
  message: "Die E-Mail wird bereits verwendet"
};

export const noLocationFound: RequestError = {
  code: 3,
  message: "Wir konnten deine Adresse leider nicht finden"
};

export const missingDealId: RequestError = {
  code: 4,
  message: "Für die Aktion wird eine Deal ID benötigt, es wurde jedoch keine mit geschickt"
};

export const activationFailed: RequestError = {
  code: 5,
  message: "Bei der Aktivierung des Accounts ging etwas schief"
};

export const noAccount: RequestError = {
  code: 6,
  message: "Der Account existiert nicht"
};

export const accountNotActivated: RequestError = {
  code: 7,
  message: "Der Account wurde noch nicht aktiviert"
};

export const noPasswordResetCode: RequestError = {
  code: 8,
  message: "Für diesen Account wurde keine Anfrage zum Passwort zurücksetzen gestellt"
};

export interface RequestError {
  code: number;
  message: string;
}
