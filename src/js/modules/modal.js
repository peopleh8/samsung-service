import { Fancybox } from '@fancyapps/ui'
import { getScrollbarWidth } from './functions.js'

const closeBtns = document.querySelectorAll('.close-modal-btn'),
			container = document.querySelector('.modal-services-list__inner')

Fancybox.bind('[data-fancybox]', {
  dragToClose: false,
  showClass: 'fancybox-fadeIn',
  hideClass: 'fancybox-fadeOut',
	on: {
		init: () => {
			const fixedBlocks = document.querySelectorAll('.fixed-block')
			
			fixedBlocks.forEach(item => item.style.paddingRight = `${getScrollbarWidth()}px`)

			const checkox = [...document.querySelectorAll('.services-item__check')]
			const checked =  checkox.filter(chec => chec.checked)

			checked.forEach(check => {
				container.insertAdjacentHTML('beforeend', `
					<div class="modal-services-list__item">
						<div class="modal-services-list__check">
							<div class="modal-services-list__check-inner icon">
								<svg><use href="./img/icons/sprite.svg#check"></use></svg>
							</div>
						</div>
						<p class="modal-services-list__text">${check.value}</p>
					</div>
				`)
			})
		},
		destroy: () => {
			const fixedBlocks = document.querySelectorAll('.fixed-block')

			container.innerHTML = ''
			
			fixedBlocks.forEach(item => item.style.paddingRight = '0')
		}
	}
})

closeBtns.forEach(btn => {
	btn.addEventListener('click', () => {
		Fancybox.close()
	})
})