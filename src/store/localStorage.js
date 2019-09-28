
const USERINfO = 'USERINfO';
const ISAUTH = 'isAuth';

export function getUserInfo() {
  return localStorage.getItem(USERINfO)
}

export function setUserInfo(data) {
  localStorage.setItem(USERINfO, data)
}

export function getUserAuth() {
  return localStorage.getItem(ISAUTH)
}

export function setUserAuth(data) {
  localStorage.setItem(ISAUTH, data)
}