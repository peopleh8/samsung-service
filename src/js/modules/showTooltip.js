import { slideToggle, slideUp } from './functions.js'

const tooltipSections = document.querySelectorAll('.tooltip-section'),
      tooltipSectionHeads = document.querySelectorAll('.tooltip-section__head'),
      tooltipOpenBtn = document.querySelectorAll('.tooltip-icon'),
      tooltipCloseBtn = document.querySelectorAll('.tooltip-panel__close')
      

export const showTooltip = () => {
  if (innerWidth > 1160) {
    tooltipSections.forEach(section => {
      section.addEventListener('mouseenter', () => {
        section.classList.add('visible')
      })

      section.addEventListener('mouseleave', () => {
        section.classList.remove('visible')
      })
    })
  }

  if (innerWidth <= 1160 && innerWidth > 586) {
    tooltipOpenBtn.forEach(btn => {
      btn.addEventListener('click', () => {
        let activeEl = document.querySelector('.tooltip-section.visible')

        activeEl && activeEl.classList.remove('visible')
        btn.parentElement.classList.add('visible')
      })
    })
  }

  if (innerWidth <= 585) {
    tooltipSectionHeads.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tooltip-section__body').forEach((item, itemIndex) => {
          if (itemIndex !== index) {
            slideUp(item, 300)
            item.parentElement.classList.remove('active')
          }
        })
        
        slideToggle(btn.nextElementSibling, 300, 'block')
        btn.parentElement.classList.toggle('active')
      })
    })
  }
}

export const closeTooltip = () => {
  if (innerWidth <= 1160 && innerWidth > 589) {
    tooltipCloseBtn.forEach(btn => {
      btn.addEventListener('click', () => {

        btn.parentElement.parentElement.classList.remove('visible')
      })
    })
  }
}

if (tooltipSections && tooltipSections.length !== 0 ) {
  showTooltip()
  closeTooltip()
}