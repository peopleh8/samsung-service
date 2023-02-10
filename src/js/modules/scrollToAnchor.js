import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger.js'
import { anchorScroll } from './functions.js'

gsap.registerPlugin(ScrollTrigger)

const btns = document.querySelectorAll('.general-sidebar__anchor'),
      sections = document.querySelectorAll('.ctx'),
      headerBotHeight = document.querySelector('.header-bot').offsetHeight

export const scrollToAnchor = () => {
  sections.forEach(section => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: `-=${headerBotHeight + 5}px top`,
        onEnter: (target) => {
          let id = `#${target.trigger.id}`

          document.querySelector('.general-sidebar__anchor.active').classList.remove('active')
          document.querySelector(`[href="${id}"]`).classList.add('active')

        },
        onEnterBack: (target) => {
          let id = `#${target.trigger.id}`

          document.querySelector('.general-sidebar__anchor.active').classList.remove('active')
          document.querySelector(`[href="${id}"]`).classList.add('active')
        },
      }
    })
  })
  
  btns.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault()

      let href = `#${btn.href.split('#')[1]}`,
          scrollDistanse = document.querySelector(href).offsetTop
          
      anchorScroll(window, scrollDistanse - headerBotHeight, 1)
    })
  })
}

btns && btns.length !== 0 && scrollToAnchor()