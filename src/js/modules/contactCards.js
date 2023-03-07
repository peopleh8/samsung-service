import gsap from 'gsap'
import Flip from 'gsap/Flip.js'
import { slideToggle, slideUp } from './functions.js'

import { locations, renderContent } from './map/initMap.js'

gsap.registerPlugin(Flip)

const intfoItems = document.querySelectorAll('.contacts-info-item__visible'),
      accItems = document.querySelectorAll('.contacts-info-arrordion__head'),
      subAccItems = document.querySelectorAll('.contacts-info-subarrordion__head')

// window.addEventListener('load', () => {
//   let activeEl = document.querySelector('.contacts-info-item.active')

//   activeEl && activeEl.style.setProperty('--height', `${gsap.getProperty(activeEl, 'height')}px`)
// })

intfoItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    const state = Flip.getState('.contacts-info-item')
    const parent = item.parentElement.parentElement.parentElement.parentElement
    let startHeight = gsap.getProperty('.contacts-info__list-wrapper', 'height')

    document.querySelectorAll('.contacts-info-item').forEach((item, itemIndex) => {
      if (itemIndex !== index) {
        item.classList.remove('active')
        item.classList.remove('visible')
      }
    })

    parent.classList.toggle('active')

    parent.style.setProperty('--height', 0)
    parent.style.setProperty('--height', `${gsap.getProperty(parent, 'height')}px`)

    const firstItem = parent.querySelector('.contacts-info-content__item:nth-child(1)')
    const secItem = parent.querySelector('.contacts-info-content__item:nth-child(2)')


    secItem && secItem.offsetHeight >= firstItem.offsetHeight && firstItem.style.setProperty('--item-height', `${secItem.offsetHeight + 40}px`)

    setTimeout(() => {
      parent.classList.toggle('visible')
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

    if (index === intfoItems.length - 1) { 
      window.infowindow.close()
      return
    }

    if (item.parentElement.parentElement.parentElement.parentElement.classList.contains('active')) {
      window.infowindow.setContent(renderContent(locations[index], index))
      window.infowindow.open(window.map, window.markers[index])
    } else {
      window.infowindow.close()
    }
  })
})

accItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.contacts-info-arrordion__body').forEach((item, itemIndex) => {
      if (itemIndex !== index) {  
        slideUp(item, 250)
        item.parentElement.classList.remove('active')
      }
    })

    slideToggle(item.nextElementSibling, 250, 'block')
    item.parentElement.classList.toggle('active')

    window.infowindow.setContent(renderContent(locations[index], index))
    window.infowindow.open(window.map, window.markers[index])

    if (!document.querySelector('.contacts-info-arrordion__item.active')) {
      window.infowindow.close()
    }

    if (index === accItems.length - 1) { 
      window.infowindow.close()
      return
    }
  })
})

subAccItems.forEach(item => {
  item.addEventListener('click', () => {
    slideToggle(item.nextElementSibling, 250, 'block')
    item.parentElement.classList.toggle('active')
  })
})

const setIdHandler = () => {
  if (innerWidth <= 1160) {
    document.querySelectorAll('.contacts-info-item').forEach(item => item.removeAttribute('id'))
    document.querySelectorAll('.contacts-info-arrordion__item').forEach((item, i) => item.setAttribute('id', `card-${i + 1}`))
  } else {
    document.querySelectorAll('.contacts-info-arrordion__item').forEach(item => item.removeAttribute('id'))
    document.querySelectorAll('.contacts-info-item').forEach((item, i) => item.setAttribute('id', `card-${i + 1}`))
  }
}

addEventListener('load', setIdHandler)
addEventListener('resize', setIdHandler)