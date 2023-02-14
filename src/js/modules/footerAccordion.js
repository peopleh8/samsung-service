import { slideToggle, slideUp } from './functions.js'

const footerAccBtns = document.querySelectorAll('.footer-navs__title')

export const setFooterAccordion = () => {
  footerAccBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      if (innerWidth >= 691) return

      // document.querySelectorAll('.footer-navs__list').forEach((item, itemIndex) => {
      //   if (itemIndex !== index) {
      //     slideUp(item, 300)
      //     item.parentElement.classList.remove('active')
      //   }
      // })
      
      slideToggle(btn.nextElementSibling, 300, 'block')
      btn.parentElement.classList.toggle('active')
    })
  })
}

footerAccBtns && footerAccBtns.length !== 0 && setFooterAccordion()