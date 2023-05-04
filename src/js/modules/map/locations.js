const dynamicItems = [...document.querySelectorAll('.dynamic-item')]

export const locations = dynamicItems.map(item => ({
  logo: item.dataset.logoSrc,
  photo: item.dataset.photoSrc,
  name: item.dataset.name,
  address: item.dataset.address,
  btn: item.dataset.btnText,
  lat: parseFloat(item.dataset.point.split(', ')[0]),
  lng: parseFloat(item.dataset.point.split(', ')[1])
}))