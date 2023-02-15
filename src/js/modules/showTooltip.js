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

  if (innerWidth <= 1160) {
    tooltipOpenBtn.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tooltip-section').forEach((section, sectionIndex) => {
          if (sectionIndex !== index) {
            section.classList.remove('visible')
          }
        })

        btn.parentElement.classList.toggle('visible')
      })
    })
  }

  if (innerWidth <= 690) {
    tooltipSectionHeads.forEach(btn => {
      btn.addEventListener('click', () => {
        slideToggle(btn.nextElementSibling, 300, 'block')
        btn.parentElement.classList.toggle('active')
      })
    })
  }
}

export const closeTooltip = () => {
  if (innerWidth <= 1160) {
    tooltipCloseBtn.forEach(btn => {
      btn.addEventListener('click', () => {

        btn.parentElement.parentElement.classList.remove('visible')
      })
    })
  }
}

export const clickTooltipOutside = () => {
  window.addEventListener('click', e => {
    if (innerWidth > 1160) return

    let tooltipSections = document.querySelectorAll('.tooltip-section')

    if ([...tooltipSections].some(section => section.classList.contains('visible')) && !e.target.closest('.tooltip-section')) {
      tooltipSections.forEach(item => item.classList.remove('visible'))
    }
  })
}

if (tooltipSections && tooltipSections.length !== 0 ) {
  showTooltip()
  closeTooltip()
  clickTooltipOutside()
}