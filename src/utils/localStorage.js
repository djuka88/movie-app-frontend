export function getItem(keyName) {
  try {
    const localStorageValue = localStorage.getItem(keyName);
    return localStorageValue ? JSON.parse(localStorageValue) : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function setItem(keyName, value) {
  localStorage.setItem(keyName, JSON.stringify(value));
}

export function removeItem(keyName) {
  localStorage.removeItem(keyName);
}
