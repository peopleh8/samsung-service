const forms = document.querySelectorAll('.search'),
      header = document.querySelector('.header'),
      overlay = document.querySelectorAll('.overlay--search')

export const openIntroSearch = () => {
  forms.forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault()

      let overlay = form.querySelector('.overlay--search'),
          inpWrapper = form.querySelector('.search__inp-wrapper'),
          dropdown = form.querySelector('.search-dropdown'),
          closeIcons = form.querySelector('.search__times')

      overlay && header.classList.add('search-open')
      overlay && overlay.classList.add('visible')
      inpWrapper.classList.add('search-open')
      dropdown.classList.add('open')
      closeIcons && closeIcons.classList.add('visible')
    })
  })
}


export const closeIntroSearch = () => {
  overlay.forEach(overlay => {
    overlay.addEventListener('click', () => {
      overlay.classList.remove('visible')
      overlay.parentElement.querySelector('.search__times').classList.remove('visible')
      overlay.parentElement.querySelector('.search-dropdown').classList.remove('open')

      setTimeout(() => {
        header.classList.remove('search-open')
        overlay.nextElementSibling.classList.remove('search-open')
      }, 350)
    })
  })
}

if (forms && forms.length !== 0) {
  openIntroSearch()
  closeIntroSearch()
}