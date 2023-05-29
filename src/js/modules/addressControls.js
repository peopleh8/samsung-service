import gsap from 'gsap'
import Flip from 'gsap/Flip.js'
import { slideToggle, slideUp, anchorScroll } from './functions.js'

import { renderContent } from './map/renderContent.js'
import { locations } from './map/locations.js'

gsap.registerPlugin(Flip)

const accItemsHead = document.querySelectorAll('.addresses-accordion__head:not(.addresses-accordion__head--single)')
const infoSection = document.querySelector('.addresses-info')
const npBtn = document.querySelector('.addresses-accordion__head--single')
const mapSection = document.querySelector('.addresses__map-section')
const npSection = document.querySelector('.addresses-np')
const openInfoBtn = document.querySelector('.addresses-info__btn')
const openInfoNpBtn = document.querySelector('.addresses-info__head-logo')
const subAccItemsHead = document.querySelectorAll('.addresses-info__head-logo')

export const setAddressAccrordion = () => {
  accItemsHead.forEach((item, index) => {
    item.addEventListener('click', e => {
      const state = Flip.getState('.addresses-accordion:nth-child(1) .addresses-accordion__item')

      let startHeight = gsap.getProperty('.addresses-accordion:nth-child(1)', 'height')
      
      let head = e.currentTarget,
          body = head.nextElementSibling,
          parent = head.parentElement.parentElement

      mapSection.classList.remove('open')
      npBtn.parentElement.parentElement.classList.remove('open')
      mapSection.style = ''

      document.querySelectorAll('.addresses-accordion__body').forEach((item, itemIndex) => {
        if (itemIndex !== index) {
          if (innerWidth > 1161) {
            slideUp(item, 250)
          } else {
            item.parentElement.parentElement.classList.contains('addresses-accordion__item--single') && slideUp(item, 250)

            slideUp(npBtn.nextElementSibling, 250, 'block')
            npBtn.parentElement.parentElement.classList.remove('active')
          }
          item.parentElement.parentElement.classList.remove('active')
        }
      })

      infoSection.classList.remove('visible')
      if (innerWidth > 1161) {
        slideToggle(body, 250, 'block')
      } else {
        item.parentElement.parentElement.classList.contains('addresses-accordion__item--single') && slideToggle(body, 250, 'block')
      }
      parent.classList.toggle('active')

      let endHeight = gsap.getProperty('.addresses-accordion:nth-child(1)', 'height')

      if (innerWidth <= 1160) {
        const flip = Flip.from(state, {
          absolute: true,
          duration: 0.4, 
          ease: 'power1.inOut'
        })
    
        flip.fromTo('.addresses-accordion:nth-child(1)', {
          height: startHeight
        }, {
          height: endHeight,
          clearProps: 'height',
          duration: flip.duration()
        }, 0)
      }

      if (innerWidth <= 1160 && parent.classList.contains('active')) {
        anchorScroll(window, '#address-title', 1)
      }

      window.infowindow.setContent(renderContent(locations[index], index))
      window.infowindow.open(window.map, window.markers[index])

      if (!document.querySelector('.addresses-accordion__item.active')) {
        window.infowindow.close()
        
        setTimeout(() => {
          slideUp(openInfoBtn.nextElementSibling.nextElementSibling, 0)
          openInfoBtn.classList.remove('active')
          openInfoBtn.parentElement.classList.remove('open')
        }, 300)

        return
      }

      parent = e.currentTarget.parentElement.parentElement

      if (!parent.classList.contains('active')) {
        window.infowindow.close()
        
        infoSection.classList.remove('visible')

        setTimeout(() => {
          slideUp(openInfoBtn.nextElementSibling.nextElementSibling, 0)
          openInfoBtn.classList.remove('active')
          openInfoBtn.parentElement.classList.remove('open')
        }, 300)

        return
      }

      infoSection.classList.add('visible')

      let href = e.currentTarget.parentElement.parentElement.dataset.href

      if (!document.querySelector(`[data-id="${href}"]`)) {
        infoSection.classList.remove('visible')

        setTimeout(() => {
          slideUp(openInfoBtn.nextElementSibling.nextElementSibling, 0)
          openInfoBtn.classList.remove('active')
          openInfoBtn.parentElement.classList.remove('open')
        }, 300)

        return
      }

      if (openInfoBtn.classList.contains('active')) {
        infoSection.classList.remove('visible')
        setTimeout(() => {
          document.querySelectorAll('.addresses-info__item').forEach(item => item.style.display = 'none')
          document.querySelector(`[data-id="${href}"]`).style.display = 'block'
          infoSection.classList.add('visible')
        }, 300)
      } else {
        document.querySelectorAll('.addresses-info__item').forEach(item => item.style.display = 'none')
        document.querySelector(`[data-id="${href}"]`).style.display = 'block'
      }
    })
  })
}

export const setAddressSubAccordion = () => {
  subAccItemsHead.forEach(item => {
    item.addEventListener('click', () => {
      slideToggle(item.nextElementSibling, 300, 'block')
      item.parentElement.classList.toggle('active')
    })
  })
}

export const toggleNpInfo = () => {
  npBtn.addEventListener('click', () => {
    if (innerWidth <= 1160) {
      const state = Flip.getState('.addresses-accordion:nth-child(1) .addresses-accordion__item')

      let startHeight = gsap.getProperty('.addresses-accordion:nth-child(1)', 'height')
      
      slideToggle(npBtn.nextElementSibling, 250, 'block')
      npBtn.parentElement.parentElement.classList.toggle('active')
      accItemsHead.forEach(item => item.parentElement.parentElement.classList.remove('active'))

      let endHeight = gsap.getProperty('.addresses-accordion:nth-child(1)', 'height')

      const flip = Flip.from(state, {
        absolute: true,
        duration: 0.4, 
        ease: 'power1.inOut'
      })
  
      flip.fromTo('.addresses-accordion:nth-child(1)', {
        height: startHeight
      }, {
        height: endHeight,
        clearProps: 'height',
        duration: flip.duration()
      }, 0)

      return
    } 

    let npSectionHeight = npSection.scrollHeight,
        npSectionSpace = parseInt(window.getComputedStyle(npSection, null).getPropertyValue('margin-top')),
        npSectionInsideSpace = parseInt(window.getComputedStyle(npSection, null).getPropertyValue('padding-top'))
    
    infoSection.classList.remove('visible')
    window.infowindow.close()
    document.querySelectorAll('.addresses-accordion__body').forEach(item => {
      innerWidth >= 1161 && slideUp(item, 250)
      item.parentElement.parentElement.classList.remove('active')
    })

    setTimeout(() => {
      slideUp(openInfoBtn.nextElementSibling.nextElementSibling, 0)
      openInfoBtn.classList.remove('active')
      openInfoBtn.parentElement.classList.remove('open')
    }, 300)
    

    mapSection.classList.toggle('open')
    npBtn.parentElement.parentElement.classList.toggle('open')

    if (mapSection.classList.contains('open')) {
      mapSection.style.height = `${npSection.scrollHeight + 100}px`
      mapSection.style.transform = `translateY(-${npSectionHeight + npSectionSpace + npSectionInsideSpace}px)`
    } else {
      mapSection.style.transform = ''
      mapSection.style.height = ''
    }
  })
}

export const toggleAddressInfo = () => {
  openInfoBtn.addEventListener('click', () => {
    slideToggle(openInfoBtn.nextElementSibling.nextElementSibling, 300, 'block')
    openInfoBtn.classList.toggle('active')
    openInfoBtn.parentElement.classList.toggle('open')
  })

  openInfoNpBtn.addEventListener('click', () => {
    openInfoBtn.click()
  })
}

accItemsHead && accItemsHead.length !== 0 && setAddressAccrordion()
subAccItemsHead && subAccItemsHead.length !== 0 && setAddressSubAccordion()
npBtn && toggleNpInfo()
openInfoBtn && toggleAddressInfo()