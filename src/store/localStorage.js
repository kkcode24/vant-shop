
const USERINfO = 'USERINfO';
const USERORDER = 'USERORDER';
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


export function getUserOrder() {
  return localStorage.getItem(USERORDER)
}

export function setUserOrder(data) {
  localStorage.setItem(USERORDER, data)
}

export function clearUserOrder() {
  localStorage.removeItem(USERORDER)
}

