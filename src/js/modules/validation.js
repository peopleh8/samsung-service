import JustValidate from 'just-validate'

const callbackForm = document.querySelector('.callback-form'),
      modalCallbackForm = document.querySelector('.modal-contact__form'),
      modalServicesForm = document.querySelector('.modal-services__form'),
      modalRepairForm = document.querySelector('.modal-repair__form')

const formValidate = form => {
  return new JustValidate(form)
}

export default formValidate

callbackForm && formValidate(callbackForm)
  .addField('#callback-name', [
    {
      rule: 'required',
      value: true,
      errorMessage: "Name is required"
    },
    {
      rule: 'minLength',
      value: 3,
      errorMessage: "To short value"
    },
    {
      rule: 'maxLength',
      value: 50,
      errorMessage: "To long value"
    },
  ])
  .addField('#callback-phone', [
    {
      rule: 'required',
      value: true,
      errorMessage: "Phone is required"
    },
  ])
  .addField('#callback-email', [
    {
      rule: 'required',
      value: false
    },
    {
      rule: 'email',
      value: true
    },
  ])
  .onSuccess((event) => {
    console.log('Validation passes and form submitted', event)
  })
  .onFail((fields) => {
    console.log('Form failds', fields)
  })


modalCallbackForm && formValidate(modalCallbackForm)
  .addField('#modal-callback-name', [
    {
      rule: 'required',
      value: true,
      errorMessage: "Name is required"
    },
    {
      rule: 'minLength',
      value: 3,
      errorMessage: "To short value"
    },
    {
      rule: 'maxLength',
      value: 50,
      errorMessage: "To long value"
    },
  ])
  .addField('#modal-callback-phone', [
    {
      rule: 'required',
      value: true,
      errorMessage: "Phone is required"
    },
  ])
  .onSuccess((event) => {
    console.log('Validation passes and form submitted', event)
  })
  .onFail((fields) => {
    console.log('Form failds', fields)
  })

modalServicesForm && formValidate(modalServicesForm)
  .addField('#modal-services-name', [
    {
      rule: 'required',
      value: true,
      errorMessage: "Name is required"
    },
    {
      rule: 'minLength',
      value: 3,
      errorMessage: "To short value"
    },
    {
      rule: 'maxLength',
      value: 50,
      errorMessage: "To long value"
    },
  ])
  .addField('#modal-services-phone', [
    {
      rule: 'required',
      value: true,
      errorMessage: "Phone is required"
    },
  ])
  .onSuccess((event) => {
    console.log('Validation passes and form submitted', event)
  })
  .onFail((fields) => {
    console.log('Form failds', fields)
  })

modalRepairForm && formValidate(modalRepairForm)
  .addField('#modal-repair-phone', [
    {
      rule: 'required',
      value: true,
      errorMessage: "Phone is required"
    },
  ])
  .addField('#modal-repair-receipt', [
    {
      rule: 'required',
      value: true,
      errorMessage: "Receipt is required"
    },
  ])
  .onSuccess((event) => {
    console.log('Validation passes and form submitted', event)
  })
  .onFail((fields) => {
    console.log('Form failds', fields)
  })