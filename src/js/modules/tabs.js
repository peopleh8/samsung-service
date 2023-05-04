// import { tabSlider, menuTabSlider } from './sliders.js'
import { tabSlider } from './sliders.js'

const tabNavCommonItems = document.querySelectorAll('.tab-nav-item')
const tabNavMenuItems = document.querySelectorAll('.menu-tab-nav-item')
const menuItems = document.querySelectorAll('.menu-list-item')

export const setTabs = () => {
  if (tabNavCommonItems && tabNavCommonItems.length !== 0) {
    tabNavCommonItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        let activeItem = document.querySelector('.tab-nav-item.active')
        activeItem && activeItem.classList.remove('active')
        item.classList.add('active')
        
        tabSlider.slideTo(index)
      })
    })
  } 
  
  if (tabNavMenuItems && tabNavMenuItems.length !== 0 && innerWidth >= 1160) {
    menuItems.forEach(item => {
      const navs = item.querySelectorAll('.menu-tab-nav-item')
      const slider = item.querySelector('.menu-tab-slider')

      navs.forEach((nav, navIndex) => {
        nav.addEventListener('mouseenter', () => {
          let activeItem = nav.parentElement.parentElement.querySelector('.menu-tab-nav-item.active')

          activeItem && activeItem.classList.remove('active')
          nav.classList.add('active')
          
          slider.swiper.slideTo(navIndex)
        })
      })
    })
  }
}

(tabNavCommonItems || tabNavMenuItems) && setTabs()