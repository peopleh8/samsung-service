import SimpleBar from 'simplebar'

const sections = document.querySelectorAll('.scroll-section')

export const setCustomScroll = () => {
  sections.forEach(section => new SimpleBar(section, { 
    autoHide: false,
  }))
}

sections && sections.length !== 0 && setCustomScroll()