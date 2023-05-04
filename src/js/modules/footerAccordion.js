import { slideToggle } from './functions.js'

const footerAccBtns = document.querySelectorAll('.footer-navs__title')

export const setFooterAccordion = () => {
  footerAccBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      if (innerWidth >= 691) return

      slideToggle(btn.nextElementSibling, 300, 'block')
      btn.parentElement.classList.toggle('active')
    })
  })
}

footerAccBtns && footerAccBtns.length !== 0 && setFooterAccordion()