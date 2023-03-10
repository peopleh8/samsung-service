import { slideToggle, slideUp, anchorScroll } from './functions.js'

import { locations, renderContent } from './map/initMap.js'

const accItemsHead = document.querySelectorAll('.addresses-accordion__head:not(.addresses-accordion__head--single)'),
      infoSection = document.querySelector('.addresses-info'),
      npBtn = document.querySelector('.addresses-accordion__photo--single')?.parentElement?.nextElementSibling,
      mapSection = document.querySelector('.addresses__map-section'),
      npSection = document.querySelector('.addresses-np'),
      openInfoBtn = document.querySelector('.addresses-info__btn'),
      subAccItemsHead = document.querySelectorAll('.addresses-subaccordion__head')

export const setAddressAccrordion = () => {
  accItemsHead.forEach((item, index) => {
    item.addEventListener('click', e => {
      let head = e.currentTarget,
          body = head.nextElementSibling,
          parent = head.parentElement.parentElement

      mapSection.classList.remove('open')
      npBtn.parentElement.classList.remove('open')
      mapSection.style = ''

      document.querySelectorAll('.addresses-accordion__body').forEach((item, itemIndex) => {
        if (itemIndex !== index) {  
          slideUp(item, 250)
          item.parentElement.parentElement.classList.remove('active')
        }
      })

      infoSection.classList.remove('visible')
      slideToggle(body, 250, 'block')
      parent.classList.toggle('active')

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
    if (innerWidth <= 1160 && !mapSection.classList.contains('open')) {
      anchorScroll(window, '#address', 1)
    }

    let npSectionHeight = npSection.clientHeight,
        npSectionSpace = parseInt(window.getComputedStyle(npSection, null).getPropertyValue('margin-top'))
    
    infoSection.classList.remove('visible')
    window.infowindow.close()

    document.querySelectorAll('.addresses-accordion__body').forEach(item => {
      slideUp(item, 250)
      item.parentElement.parentElement.classList.remove('active')
    })

    setTimeout(() => {
      slideUp(openInfoBtn.nextElementSibling.nextElementSibling, 0)
      openInfoBtn.classList.remove('active')
      openInfoBtn.parentElement.classList.remove('open')
    }, 300)
    

    mapSection.classList.toggle('open')
    npBtn.parentElement.classList.toggle('open')

    mapSection.classList.contains('open')
      ? mapSection.style = `transform: translateY(-${npSectionHeight + npSectionSpace}px)`
      : mapSection.style = ''
  })
}

export const toggleAddressInfo = () => {
  openInfoBtn.addEventListener('click', () => {
    slideToggle(openInfoBtn.nextElementSibling.nextElementSibling, 300, 'block')
    openInfoBtn.classList.toggle('active')
    openInfoBtn.parentElement.classList.toggle('open')
  })
}

accItemsHead && accItemsHead.length !== 0 && setAddressAccrordion()
subAccItemsHead && subAccItemsHead.length !== 0 && setAddressSubAccordion()
npBtn && toggleNpInfo()
openInfoBtn && toggleAddressInfo()