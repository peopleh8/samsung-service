import { anchorScroll } from './functions.js'

const headerBotHeight = document.querySelector('.header-bot').offsetHeight

export const scrollToAnchor = () => {
  document.addEventListener('click', e => {
    if (e.target.closest('.anchor-btn')) {
      e.preventDefault()

      let href = `#${e.target.href.split('#')[1]}`,
          scrollDistanse = document.querySelector(href).offsetTop
          
      anchorScroll(window, scrollDistanse - headerBotHeight, 1)
    }
  })
}

scrollToAnchor()