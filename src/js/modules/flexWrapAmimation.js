import gsap from 'gsap'
import Flip from 'gsap/Flip.js'

import { locations, renderContent } from './map/initMap.js'

gsap.registerPlugin(Flip)

const intfoItems = document.querySelectorAll('.contacts-info-item__visible')

window.addEventListener('load', () => {
  let activeEl = document.querySelector('.contacts-info-item.active')

  activeEl && activeEl.style.setProperty('--height', `${gsap.getProperty(activeEl, 'height')}px`)
})

intfoItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    const state = Flip.getState('.contacts-info-item')
    let startHeight = gsap.getProperty('.contacts-info__list-wrapper', 'height')

    document.querySelectorAll('.contacts-info-item').forEach((item, itemIndex) => {
      if (itemIndex !== index) {
        item.classList.remove('active')
        item.classList.remove('visible')
      }
    })

    item.parentElement.parentElement.parentElement.parentElement.classList.toggle('active')
    item.parentElement.parentElement.parentElement.parentElement.style.setProperty('--height', 0)
    item.parentElement.parentElement.parentElement.parentElement.style.setProperty('--height', gsap.getProperty(item.parentElement.parentElement.parentElement.parentElement, 'height') + 'px')

    setTimeout(() => {
      item.parentElement.parentElement.parentElement.parentElement.classList.toggle('visible')
    }, 400)

  
    let endHeight = gsap.getProperty('.contacts-info__list-wrapper', 'height')

    const flip = Flip.from(state, {
      absolute: true,
      duration: 0.4, 
      ease: 'power1.inOut'
    })

    flip.fromTo('.contacts-info__list-wrapper', {
      height: startHeight
    }, {
      height: endHeight,
      clearProps: 'height',
      duration: flip.duration()
    }, 0)

    if (item.parentElement.parentElement.parentElement.parentElement.classList.contains('active')) {
      window.infowindow.setContent(renderContent(locations[index], index))
      window.infowindow.open(window.map, window.markers[index])
    } else {
      window.infowindow.close()
    }
  })
})