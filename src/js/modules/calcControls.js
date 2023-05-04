import { anchorScroll } from './functions.js'
import { calculateInfoSlider, calculateContentSlider } from './sliders.js'

const devices = document.querySelectorAll('.calculate-type-slider__inner')
const modelNavs = document.querySelectorAll('.calculate-model-nav')
const modelPanels = document.querySelectorAll('.calculate-model-main')
const pagItems = document.querySelectorAll('.calculate-progress__item-num')

export const selectDevice = () => {
  devices.forEach((item, index) => {
    item.addEventListener('click', () => {
      let activeEl = document.querySelector('.calculate-type-slider__inner.active')

      activeEl && activeEl.classList.remove('active')
      item.classList.add('active')

      document.querySelector('.calculate-progress__item-num.current').classList.remove('current')

      for (let i = 0; i < document.querySelectorAll('.calculate-progress__item-num').length; i++) {
        if (i > 0) {
          document.querySelectorAll('.calculate-progress__item-num')[i].classList.add('current')
          document.querySelectorAll('.calculate-progress__item-num')[i].classList.remove('disabled')
        }
      }

      let activePagIndex = [...document.querySelectorAll('.calculate-progress__item-num')].findIndex(item => item.classList.contains('current'))

      for (let i = 0; i < activePagIndex; i++) {
        document.querySelectorAll('.calculate-progress__item-num').forEach((item, index) => index === i && item.classList.add('passed'))
      }
      
      calculateInfoSlider.slideTo(index + 1)
      calculateContentSlider.slideTo(index + 1)
    })
  })
}

export const selectModel = () => {
  modelNavs.forEach((slider, sliderIndex) => {
    let modelPanelInstance = modelPanels[sliderIndex].swiper
    
    slider.querySelectorAll('.calculate-model-nav__inner').forEach((item, itemIndex) => {
      item.addEventListener('click', () => {
        slider.querySelector('.calculate-model-nav__inner.active').classList.remove('active')
        item.classList.add('active')

        modelPanelInstance.slideTo(itemIndex)

        anchorScroll(window, '#model-result', 1, 120)
      })
    })
  })
}

export const setPagination = () => {
  pagItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      let activeNavIndex = [...document.querySelectorAll('.calculate-type-slider__inner')].findIndex(item => item.classList.contains('active'))
      
      document.querySelector('.calculate-progress__item-num.current').classList.remove('current')
      item.classList.remove('passed')
      item.classList.add('current')

      let activePagIndex = [...document.querySelectorAll('.calculate-progress__item-num')].findIndex(item => item.classList.contains('current'))

      for (let i = 0; i < activePagIndex; i++) {
        document.querySelectorAll('.calculate-progress__item-num').forEach((item, index) => index === i && item.classList.add('passed'))
      }

      calculateInfoSlider.slideTo(activeNavIndex !== -1 && index !== 0 ? activeNavIndex + 1 : index)
      calculateContentSlider.slideTo(index)
    })
  })
}


devices && devices.length !== 0 && selectDevice()
devices && devices.length !== 0 && selectModel()
devices && devices.length !== 0 && setPagination()