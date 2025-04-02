const drag = {
  mounted (el, binding, vnode) {
    let start = {x: undefined, y: undefined}
    el.style.cursor = 'grab'
    const moveDistrict = Object.prototype.toString.call(binding.value).includes('Function') ? binding.value() : window
    el.style.position = moveDistrict === window ? 'fixed' : 'absolute'
    const elRect = el.getBoundingClientRect()
    function onPointerMove (e) {
      if (start.x && start.y) {
        let x = e.clientX - start.x
        let y = e.clientY - start.y
        if (moveDistrict !== window) {
          const moveDistrictRect = moveDistrict.getBoundingClientRect()
          console.log('elRect', elRect)
          console.log('moveDistrictRect', moveDistrictRect)
          const scrollLeft = moveDistrictRect?.scrollLeft ? moveDistrictRect.scrollLeft : 0
          const scrollTop = moveDistrictRect?.scrollTop ? moveDistrictRect.scrollTop : 0
          x = Math.min(Math.max(0, x - moveDistrictRect.left + scrollLeft), moveDistrictRect.width - elRect.width)
          y = Math.min(Math.max(0, y - moveDistrictRect.top + scrollTop), moveDistrictRect.height - elRect.height)
        }
        el.style.left = x + 'px'
        el.style.top = y + 'px'
      }
    }
    el.addEventListener('pointerdown', (e) => {
      e.stopPropagation()
      el.style.userSelect = 'none'
      start.x = e.offsetX
      start.y = e.offsetY
      moveDistrict.addEventListener('pointermove', onPointerMove)
      moveDistrict.addEventListener('pointerleave', () => {
        el.style.userSelect = 'auto'
        moveDistrict.removeEventListener('pointermove', onPointerMove)

      })
    })
    el.addEventListener('pointerup', () => {
      el.style.userSelect = 'auto'
      moveDistrict.removeEventListener('pointermove', onPointerMove)
    })
  },
}

export default drag