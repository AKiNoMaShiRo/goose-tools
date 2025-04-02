let onClick

const outsideclick = {
  mounted (el, binding, vnode) {
    el.addEventListener('click', (e) => {
      e.stopPropagation()
    })
    onClick = function (e) {
      if (!el.contains(e.target)) {
        if (Object.prototype.toString.apply(binding.value).includes('Function')) {
          binding.value()
        }
      }
    }
    window.addEventListener('click', onClick)
  },
  unmounted () {
    if (onClick) {
      window.removeEventListener('click', onClick)
    }
  }
}

export default outsideclick