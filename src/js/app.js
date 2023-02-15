import * as flsFunctions from './modules/functions.js';
import { toggleMenu, closeMenuOverlay, menuAccordion } from './modules/menu.js'
import { togglePhoneSection, closePhoneSection } from './modules/phoneSection.js'
import * as slider from './modules/sliders.js'
import { setCustomScroll } from './modules/customScroll.js'
import { setAddressAccrordion, setAddressSubAccordion, toggleNpInfo, toggleAddressInfo } from './modules/addressControls.js'
import { setAccordion } from './modules/accordion.js'
import { setTabs } from './modules/tabs.js'
import { menuHover } from './modules/menuHover.js'
import { scrollToAnchor } from './modules/scrollToAnchor.js'
import { searchOpen, btnsClose, clickSeachOutside } from './modules/searchControlls.js'
import { openIntroSearch } from './modules/searchIntroControls.js'
import { selectDevice, selectModel, setPagination } from './modules/calcControls.js'
import { setCoockieCondensed } from './modules/setCoockieCondense.js'
import setMask from './modules/mask.js'
import * as modal from './modules/modal.js'
import * as gallery from './modules/gallery.js'
import { selectServices } from './modules/selectServices.js'
import * as stickyHeader from './modules/stickyHeader.js'
import { showTooltip, closeTooltip, clickTooltipOutside } from './modules/showTooltip.js'
import { zoomHandler } from './modules/zoomImage.js'
import formValidate from './modules/validation.js'
import { focusField, blurField } from './modules/inputControls.js'
import { setFooterAccordion } from './modules/footerAccordion.js'
import { toggleMore } from './modules/toggleMore.js'
import * as Map from './modules/map/initMap.js'
import * as flexWraAmim from './modules/flexWrapAmimation.js'
import * as animations from './modules/animations.js'

flsFunctions.isWebp()

window.addEventListener('resize', () => {
  flsFunctions.calculateMobileHeight()
})