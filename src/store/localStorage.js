
const USERINfO = 'USERINfO';
const LOGINSTATUS = 'LoginStatus';

export function getUserInfo() {
  return localStorage.getItem(USERINfO)
}

export function setUserInfo(data) {
  localStorage.setItem(USERINfO, data)
}

export function removeUserInfo() {
  localStorage.removeItem(USERINfO)
}

export function clearLocalStorage() {
  localStorage.clear()
}

export function getLoginStatus() {
  return localStorage.getItem(LOGINSTATUS)
}