const condenseCoockieBtn = document.querySelector('.coockie__btn'),
      condenseCoockiePannel = document.querySelector('.coockie')

export const setCoockieCondensed = () => {
  condenseCoockieBtn.addEventListener('click', () => {
    condenseCoockiePannel.classList.add('hide')
  })
}

condenseCoockieBtn && setCoockieCondensed()