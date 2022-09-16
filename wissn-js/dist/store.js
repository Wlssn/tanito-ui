function setSS(key, value) {
  window.sessionStorage.setItem(key, JSON.stringify(value))
}

function getSS(key) {
  try {
    let result = JSON.parse(window.sessionStorage.getItem(key))
    return result
  } catch (error) {
    throw Error(error)
  }
}

function setLS(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

function getLS(key) {
  try {
    let result = JSON.parse(window.localStorage.getItem(key))
    return result
  } catch (error) {
    throw Error(error)
  }
}

module.exports = {
  setSS,
  getSS,
  setLS,
  getLS,
}