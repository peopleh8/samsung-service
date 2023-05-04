import axios from 'axios'
import formValidate from './instance.js'
import { BASE_URL } from './../vars.js'
import { showThxModal } from '../showThxModal.js'
import { showErrModal } from '../showErrModal.js'

const callbackForm = document.querySelector('.callback-form')

export const callbackFormValidate = () => {
  formValidate(callbackForm)
  .addField('#callback-name', [
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
  .addField('#callback-phone', [
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
  .addField('#callback-email', [
    {
      rule: 'customRegexp',
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gi,
      errorMessage: 'Email is required',
    },
  ])
  .addField('#callback-message', [
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
  .onSuccess(event => {
    const form = event.target

    const name = form.querySelector('#callback-name').value
    const phone = form.querySelector('#callback-phone').value
    const email = form.querySelector('#callback-email').value
    const message = form.querySelector('#callback-message').value
    const page = form.querySelector('[name="page"]')?.value

    form.classList.add('loading')

    axios
      .post(`${BASE_URL}index.php?route=sams/mail/sendForm`, { page, name, phone, email, message }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      })
      .then(() => {
        form.classList.remove('loading')
        showThxModal()
        form.querySelectorAll('label.focused').forEach(label => label.classList.remove('focused'))
        form.querySelectorAll('input').forEach(input => input.classList.remove('just-validate-success-field'))
        form.reset()
      })
      .catch(err => {
        form.classList.remove('loading')
        showErrModal()
        
        console.log(err)
      })
  })
  .onFail((fields) => {
    
    console.log('Form failds', fields)
  })
}

callbackForm && callbackFormValidate()