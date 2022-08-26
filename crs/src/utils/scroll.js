export function scrollHide(className) {
  const draggable = document.querySelector('.draggable')
  if(draggable) {
    draggable.addEventListener('scroll', () => {
      let fl = document.querySelector(`.${className}`)
      if(fl) {
        fl.className = `${className} hide`
      }
    })
  }
}
