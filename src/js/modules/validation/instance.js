import JustValidate from 'just-validate'

const formValidate = form => {
  return new JustValidate(form)
}

export default formValidate