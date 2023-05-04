import axios from 'axios'
import formValidate from './instance.js'
import { BASE_URL } from './../vars.js'
import { showThxModal } from '../showThxModal.js'
import { showErrModal } from '../showErrModal.js'
import { Fancybox } from '@fancyapps/ui'

const modalServicesForm = document.querySelector('.modal-services__form')

export const modalSerivesForm = () => {
  formValidate(modalServicesForm)
    .addField('#modal-services-name', [
      {
        rule: 'required',
        value: true,
        errorMessage: 'Name is required',
      },
      {
        rule: 'customRegexp',
        value: /^[a-zA-Zа-щА-ЩЬьЮюЯяІіЇїЄєҐґ_]*$/gi,
        errorMessage: 'Name is invalid',
      },
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'To short value',
      },
      {
        rule: 'maxLength',
        value: 20,
        errorMessage: 'To long value',
      },
    ])
    .addField('#modal-services-phone', [
      {
        rule: 'required',
        value: true,
        errorMessage: 'Phone is required',
      },
      {
        rule: 'customRegexp',
        value: /^\+38\s\(\d{3}\)\s\d{3}\-\d{2}\-\d{2}$/gi,
        errorMessage: 'Phone is required',
      },
    ])
    .addField('#modal-services-email', [
      {
        rule: 'customRegexp',
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gi,
        errorMessage: 'Email is required',
      },
    ])
    .addField('#modal-services-message', [
      {
        rule: 'minLength',
        value: 0,
        errorMessage: 'To short value',
      },
      {
        rule: 'maxLength',
        value: 200,
        errorMessage: 'To long value',
      },
    ])
    .onSuccess((event) => {
      const form = event.target
      
      const name = form.querySelector('#modal-services-name').value
      const phone = form.querySelector('#modal-services-phone').value
      const email = form.querySelector('#modal-services-email').value
      const message = form.querySelector('#modal-services-message').value
      const page = form.querySelector('[name="page"]')?.value

      const repairs = [...document.querySelectorAll('.modal-services-list__text')].map(repair => repair.textContent)

      form.classList.add('loading')

      axios
        .post(`${BASE_URL}index.php?route=sams/mail/sendFormRepairs`, { page, name, phone, email, message, repairs, }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        })
        .then(() => {
          form.classList.remove('loading')
          Fancybox.close()
          
          setTimeout(() => {
            showThxModal()
            form.querySelectorAll('label.focused').forEach(label => label.classList.remove('focused'))
            form.querySelectorAll('input').forEach(input => input.classList.remove('just-validate-success-field'))
            form.reset()
            form.classList.add('sent')
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

modalServicesForm && modalSerivesForm()