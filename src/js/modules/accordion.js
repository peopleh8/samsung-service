import { slideToggle, slideUp } from './functions.js'

const accItemsHead = document.querySelectorAll('.accordion__head')

export const setAccordion = () => {
  accItemsHead.forEach((item, index) => {
    item.addEventListener('click', e => {
      let head = e.currentTarget,
          body = head.nextElementSibling,
          parent = head.parentElement 

      document.querySelectorAll('.accordion__body').forEach((item, itemIndex) => {
        if (itemIndex !== index) {
          slideUp(item, 300)
          item.parentElement.classList.remove('active')
        }
      })

      slideToggle(body, 250, 'block')
      parent.classList.toggle('active')
    })
  })
}

accItemsHead && accItemsHead.length !== 0 && setAccordion()