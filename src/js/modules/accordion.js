import { slideToggle } from './functions.js'

const accItemsHead = document.querySelectorAll('.accordion__head')

export const setAccordion = () => {
  accItemsHead.forEach(item => {
    item.addEventListener('click', e => {
      let head = e.currentTarget,
          body = head.nextElementSibling,
          parent = head.parentElement 

      slideToggle(body, 250, 'block')
      parent.classList.toggle('active')
    })
  })
}

accItemsHead && accItemsHead.length !== 0 && setAccordion()