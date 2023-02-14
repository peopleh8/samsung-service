import { disableScrollbar, enableScrollbar, slideToggle, slideUp } from './functions.js'

const burger = document.querySelector('.burger'),
      headerBot = document.querySelector('.header-bot'),
      overlay = document.querySelector('.overlay--mobile-menu'),
      accHead = document.querySelectorAll('.menu-list-item--has-children .menu-list__head')

export const toggleMenu = () => {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open')
    overlay.classList.toggle('visible') 
    headerBot.classList.toggle('open')

    burger.classList.contains('open') ? disableScrollbar() : enableScrollbar()
    
  })
}

export const closeMenuOverlay = () => {
  overlay.addEventListener('click', () => {
    burger.classList.remove('open')
    overlay.classList.remove('visible') 
    headerBot.classList.remove('open')
    enableScrollbar()
  })
}

export const menuAccordion = () => {
  accHead.forEach((btn, index) => {
    btn.addEventListener('click', e => {
      if (innerWidth >= 1161) return
      
      // document.querySelectorAll('.submenu').forEach((item, itemIndex) => {
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

toggleMenu()
closeMenuOverlay()
menuAccordion()