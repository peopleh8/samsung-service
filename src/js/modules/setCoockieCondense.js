import { setCookie } from './setCookie.js'

const condenseCoockieBtn = document.querySelector('.coockie__btn'),
      condenseCoockiePannel = document.querySelector('.coockie')

export const setCoockieCondensed = () => {
  condenseCoockieBtn.addEventListener('click', () => {
    condenseCoockiePannel.classList.add('hide')

    setCookie('is_cookie_condensed', '1', { secure: true, 'max-age': 259200 })
  })
}

condenseCoockieBtn && setCoockieCondensed()