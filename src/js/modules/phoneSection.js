import { slideToggle, disableScrollbar, enableScrollbar } from './functions.js'

const phoneBtn = document.querySelector('div.header-top__phone'),
      overlay = document.querySelector('.overlay--phone-panel'),
      panel = document.querySelector('.phones-panel'),
      closeBtn = document.querySelector('.phones-panel__close')

export const togglePhoneSection = () => {
  phoneBtn.addEventListener('click', () => {
    phoneBtn.classList.toggle('active')

    if (phoneBtn.classList.contains('active')) {
      disableScrollbar()

      overlay.classList.toggle('visible')
      
      setTimeout(() => {
        slideToggle(panel, 300, 'block')
        panel.classList.toggle('open')
      }, 100)
    } else {
      slideToggle(panel, 300, 'block')
      panel.classList.remove('open')

      enableScrollbar()

      setTimeout(() => overlay.classList.remove('visible'), 250)
    }
  })
}

const closePhoneSectionHandler = () => {
  phoneBtn.classList.remove('active')
  slideToggle(panel, 300, 'block')
  panel.classList.remove('open')

  enableScrollbar()

  setTimeout(() => overlay.classList.remove('visible'), 250)
}

export const closePhoneSection = () => {
  closeBtn.addEventListener('click', closePhoneSectionHandler)
  overlay.addEventListener('click', closePhoneSectionHandler)
}

togglePhoneSection()
closePhoneSection()