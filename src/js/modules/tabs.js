import { tabSlider, menuTabSlider } from './sliders.js'

const tabNavCommonItems = document.querySelectorAll('.tab-nav-item'),
      tabNavMenuItems = document.querySelectorAll('.menu-tab-nav-item')

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
  
  if (tabNavMenuItems && tabNavMenuItems.length !== 0) {
    tabNavMenuItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        let activeItem = document.querySelector('.menu-tab-nav-item.active')
        activeItem && activeItem.classList.remove('active')
        item.classList.add('active')
        
        menuTabSlider.slideTo(index)
      })
    })
  }
}

(tabNavCommonItems || tabNavMenuItems) && setTabs()