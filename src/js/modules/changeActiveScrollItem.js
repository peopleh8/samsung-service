import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger.js'

gsap.registerPlugin(ScrollTrigger)

const sections = document.querySelectorAll('.ctx'),
      headerBotHeight = document.querySelector('.header-bot').offsetHeight

export const changeActiveScrollItem = () => {
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
}

sections && sections.length !== 0 && changeActiveScrollItem()