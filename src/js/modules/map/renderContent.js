export const renderContent = (props, count) => {
  if (window.location.pathname.indexOf('contact') === -1) {
    return (`
      <a class="window-logo" href="#card-${count + 1}"><img src="${props.logo}" alt="" /></a>
    `)
  } else {
    return (`
      <div class="window-inner"><div class="window-photo"><img src="${props.photo}" alt="" /></div><div class="window-info"> <div class="window-name">${props.name}</div><div class="window-address">${props.address}</div><a class="window-btn" href="#card-${count + 1}">${props.btn}<span class="window-icon icon"><svg><use href="../img/icons/sprite.svg#arrow"></use></svg></span></a></div></div>
    `)
  }
}