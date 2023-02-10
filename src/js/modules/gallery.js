import { Fancybox } from '@fancyapps/ui'
import { getScrollbarWidth } from './functions.js'

Fancybox.bind('[data-fancybox="gallery"]', {
  groupAll : true,
  showClass: 'fancybox-fadeIn',
  hideClass: 'fancybox-fadeOut',
  dragToClose: false,
  infinite: false,
  type: 'image',
  Image: {
    zoom: false,
  },
  on : {
    init: () => {
			const fixedBlocks = document.querySelectorAll('.fixed-block')
      
      fixedBlocks.forEach(item => item.style.paddingRight = `${getScrollbarWidth()}px`)
    },
    destroy: () => {
			const fixedBlocks = document.querySelectorAll('.fixed-block')

      fixedBlocks.forEach(block => block.style.paddingRight = 0)
    }
  }
})