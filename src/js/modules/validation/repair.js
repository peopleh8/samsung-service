import axios from 'axios'
import formValidate from './instance.js'
import { BASE_URL } from './../vars.js'
import { showStatusResultModal } from '../showStatusResultModal.js'
import { showErrModal } from '../showErrModal.js'
import { Fancybox } from '@fancyapps/ui'

const modalRepairForm = document.querySelector('.modal-repair__form')

export const modalRepairFormValidate = () => {
  formValidate(modalRepairForm)
  .addField('#modal-repair-phone', [
    {
      rule: 'required',
      value: true,
      errorMessage: "Phone is required"
    },
    {
      rule: 'customRegexp',
      value: /^\+38\s\(\d{3}\)\s\d{3}\-\d{2}\-\d{2}$/gi,
      errorMessage: 'Phone is required',
    },
  ])
  .addField('#modal-repair-receipt', [
    {
      rule: 'required',
      value: true,
      errorMessage: "Receipt is required"
    },
    {
      rule: 'customRegexp',
      value: /^\d{4}\s\d{4}$/gi,
      errorMessage: 'Receipt is required',
    },
  ])
  .onSuccess(event => {
    const form = event.target

    const phone = form.querySelector('#modal-repair-phone').value
    const repairid = form.querySelector('#modal-repair-receipt').value

    form.classList.add('loading')

    axios
      .get(`${BASE_URL}index.php?route=sams/status/getStatus&phone=${phone}&repair_id=${repairid}`)
      .then(({ data }) => {
        form.classList.remove('loading')
        Fancybox.close()
        
        setTimeout(() => {
          if (data.status.success) {
            showStatusResultModal(data.status)
            form.querySelectorAll('label.focused').forEach(label => label.classList.remove('focused'))
            form.querySelectorAll('input').forEach(input => input.classList.remove('just-validate-success-field'))
            form.reset()

            return
          }

          showErrModal()
        }, 150)
      })
      .catch(err => {
        form.classList.remove('loading')
        Fancybox.close()

        setTimeout(() => showErrModal(), 200)
        
        console.log(err)
      })
  })
  .onFail((fields) => {
    console.log('Form failds', fields)
  })
}

modalRepairForm && modalRepairFormValidate()