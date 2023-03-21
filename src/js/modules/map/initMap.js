import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger.js'
import GoogleMapsApi from './GoogleMapsApi.js'
import { styles } from './styles.js'
import { anchorScroll } from '../functions.js'

export const locations = [
  { logo: '../img/mti-logo.svg', photo: '../img/address-1.jpg', name: 'МТI-СЕРВІС', address: 'м. Київ, вул. Білоруська, 26', btn: 'більше інформації', lat: -33.890542, lng: 151.274856 },
  { logo: '../img/mti-logo.svg', photo: '../img/address-1.jpg', name: 'МТI-СЕРВІС', address: 'м. Київ, вул. Білоруська, 26', btn: 'більше інформації', lat: -33.923036, lng: 151.259052 },
  { logo: '../img/mti-logo.svg', photo: '../img/address-1.jpg', name: 'МТI-СЕРВІС', address: 'м. Київ, вул. Білоруська, 26', btn: 'більше інформації', lat: -34.028249, lng: 151.157507 }
]

gsap.registerPlugin(ScrollTrigger)

const mapWrapper = document.querySelector('#map')
const gApiKey = 'AIzaSyC2Zq7VBtQJJ41xXy6EuxQoQm0k5J31zBw'
const gmapApi = new GoogleMapsApi(gApiKey)

export const renderContent = (props, count) => {
  if (window.location.pathname.indexOf('contact') === -1) {
    return (`
      <div class="window-logo"><img src="${props.logo}" alt="" /></div>
    `)
  } else {
    return (`
      <div class="window-inner"><div class="window-photo"><img src="${props.photo}" alt="" /></div><div class="window-info"> <div class="window-name">${props.name}</div><div class="window-address">${props.address}</div><a class="window-btn" href="#card-${count + 1}">${props.btn}<span class="window-icon icon"><svg><use href="../img/icons/sprite.svg#arrow"></use></svg></span></a></div></div>
    `)
  }
}

const initMap = (mapSelector) => {
  const element = document.getElementById(mapSelector)
  const map = new google.maps.Map(element, {
    zoom: 10,
    center: new google.maps.LatLng(locations[0].lat, locations[0].lng),
    styles: styles.styles
  })

  const infowindow = new google.maps.InfoWindow()

  let i, marker
  const markers = []

  for (i = 0; i < locations.length; i++) {  
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i].lat, locations[i].lng),
      label: { 
        color: '#fff', 
        fontWeight: '500', 
        fontSize: '10px', 
        lineHeight: '150%', 
        fontFamily: 'IBMPlexSans', 
        className: 'map-marker', 
        text: `${i + 1}` 
      },
      optimized: true,
      map: map,
      icon: '.'
    })

    markers.push(marker)
    
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(renderContent(locations[i], i))
        infowindow.open(map, marker)

        const elements = document.querySelectorAll('[id^=card]')

        elements.forEach((elem, index) => i === index && elem.querySelector('.header-elem').click())
      }
    })(marker, i))
  }

  infowindow.setContent(renderContent(locations[0], 0))
  infowindow.open(map, markers[0])

  window.markers = markers
  window.map = map
  window.infowindow = infowindow

  google.maps.event.addListener(map, 'click', function () {
    infowindow.close()

    const elements = [...document.querySelectorAll('[id^=card]')],
          activeEl = elements.filter(elem => elem.classList.contains('active'))[0]

    activeEl && activeEl.querySelector('.header-elem').click()
  })

  google.maps.event.addListener(infowindow, 'domready', function() {
    let windowBtn = document.querySelector('.window-btn')
    windowBtn && windowBtn.addEventListener('click', e => {
      e.preventDefault()

      ScrollTrigger.refresh()
      
      let href = `#${e.currentTarget.href.split('#')[1]}`
        
      anchorScroll(window, document.querySelector(href), 1)
    })
  })
}

gmapApi.load().then(() => mapWrapper && initMap('map'))