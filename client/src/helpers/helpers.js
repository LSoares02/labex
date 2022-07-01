export function logout(setAccount, setSavedAccount) {
  setAccount(null);
  setSavedAccount(null);
}

export function randomNumber(length) {
  return Math.floor(Math.random() * length);
}
