export function logout(setAccount) {
  setAccount(null);
}

export function randomNumber(length) {
  return Math.floor(Math.random() * length);
}
