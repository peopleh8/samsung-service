import { Fancybox } from '@fancyapps/ui'
import { getScrollbarWidth } from './functions.js'

// const info = {
//   "success": true,
//   "info": "",
//   "repair_id": "50074046",
//   "client": "Демиденко Ірина Володимирівна",
//   "brand": "Samsung",
//   "model": "SM-A525F",
//   "serial_number": "RZ8T122A7FT",
//   "description": "При зарядці видає помилку про потрапляння вологи",
//   "repair_type": "Га1рантия",
//   "repair_status": "Задержка ремонта",
//   "process_description": "",
//   "date_start": "2023-01-02",
//   "date_repair_end": "",
//   "date_end": "",
//   "repair_substatus": "ЗЧ получены",
//   "repair_substatus_id": "000000037",
//   "type": "Ремонт",
//   "delivery_type": "Нова пошта",
//   "consignment_note_number": "42323423423423",
//   "substatus_point": "3"
// }

const progressContainer = document.querySelector('.modal-order-progress')

export const showStatusResultModal = info => {
  const steps = [
    { number: 1, desc: info.step_1, },
    { number: 2, desc: info.step_2, },
    { number: 3, desc: info.step_3, },
    { number: 4, desc: info.step_4, },
  ]
  
  Fancybox.show(
    [{ src: "#order", type: 'inline' }],
    {
      showClass: 'fancybox-fadeIn',
      hideClass: 'fancybox-fadeOut',
      dragToClose: false,
      on: {
        init: () => {
          const fixedBlocks = document.querySelectorAll('.fixed-block')
    
          fixedBlocks.forEach(item => item.style.paddingRight = `${getScrollbarWidth()}px`)

          const rapairId = document.querySelector('.modal-order__title span')
          const client = document.querySelector('.modal-order__value--client')
          const repairType = document.querySelector('.modal-order__value--type')
          const repairStatus = document.querySelector('.modal-order__value--status')
          const dateStart = document.querySelector('.modal-order-date__text--start')
          const dateEnd = document.querySelector('.modal-order-date__text--end')
          const dateDeliver = document.querySelector('.modal-order-date__text--deliver')
          const model = document.querySelector('.modal-order__value--model')
          const number = document.querySelector('.modal-order__value--number')
          const problem = document.querySelector('.modal-order-repair__value--problem')
          const result = document.querySelector('.modal-order-repair__value--result')
          const deliveryType = document.querySelector('.modal-order-info__item--delivery .modal-order__label-text')
          const deliveryValue = document.querySelector('.modal-order-info__item--delivery .modal-order__value-text')

          rapairId.textContent = info.repair_id
          client.textContent = info.client
          repairType.textContent = info.repair_type
          repairStatus.textContent = info.repair_status && info.repair_substatus
            ? `${info.repair_status} / ${info.repair_substatus}`
            : info.repair_status && !info.repair_substatus
            ? info.repair_status
            : info.repair_substatus
          dateStart.textContent = info.date_start || '-'
          dateEnd.textContent = info.date_repair_end || '-'
          dateDeliver.textContent = info.date_end || '-' 
          model.textContent = info.model || '-'
          number.textContent = info.serial_number || '-'
          problem.textContent = info.description || '-'
          result.textContent = info.process_description || '-'

          deliveryType.textContent = info.delivery_type || '-'
          deliveryValue.textContent = info.consignment_note_number || '-'
          
          info.consignment_note_number 
            ? deliveryValue.nextElementSibling.style.display = 'block' 
            : deliveryValue.nextElementSibling.style.display = 'none'

          if (info.delivery_type.toLocaleLowerCase().indexOf('нова') !== -1) {
            deliveryType.previousElementSibling.style.display = 'block'
            deliveryValue.outerHTML = `<a class="modal-order__value-text" target="_blank" href="https://novaposhta.ua/tracking/?cargo_number=${info.consignment_note_number}">${info.consignment_note_number}</a>`
          } else {
            deliveryType.previousElementSibling.style.display = 'none'
            deliveryValue.outerHTML = `<span class="modal-order__value-text">${info.consignment_note_number}</span>`
          }

          const filteredSteps = info.repair_type.toLocaleLowerCase().indexOf('гаран') !== -1 ? steps.filter(step => step.number !== 3) : steps

          progressContainer.innerHTML = ''

          filteredSteps.forEach((item, index) => {
            let point = parseInt(info.substatus_point)
            let realIndex = index + 1

            progressContainer.insertAdjacentHTML('beforeend', `
              <div class="modal-order-progress__item ${realIndex === point ? 'current' : realIndex < point ? 'passed' : ''}">
                <div class="modal-order-progress__inner">
                  <div class="modal-order-progress__identic">
                    <div class="modal-order-progress__num">${realIndex}<svg>
                      <use href="./img/icons/sprite.svg#check"></use></svg>
                    </div>
                    ${realIndex !== filteredSteps.length ? '<span class="modal-order-progress__line"></span>' : ''}
                  </div>
                  <p class="modal-order-progress__desc">${item.desc}</p>
                </div>
              </div>
            `)
          })
        },
        destroy: () => {
          const fixedBlocks = document.querySelectorAll('.fixed-block')

          fixedBlocks.forEach(item => item.style.paddingRight = '0')
        }
      }
    }
  )
}

// window.showStatusResultModal = showStatusResultModal