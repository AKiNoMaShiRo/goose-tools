<script setup lang="ts">
/*
  可选配置项：
    自动滚动速度
    鼠标悬浮时滚轮滚动速度
    滚动方向（默认纵向）
    开始滚动的数量
    鼠标悬浮是否停止滚动（悬浮不停止-无法使用滚轮滚动，悬浮时停止-可以使用滚轮滚动）
*/
const props = defineProps({
  options: {
    type: Object,
  },
  scrollData: {
    type: Array,
    require: true
  },
})

const defaultOptions = {
  speed: 0.4,
  wheelSpeed: 5,
  direction: 'up',
  scrollNum: 5,
  isStop: true,
}
const scrollOptions = computed(() => {
  return Object.assign(defaultOptions, props.options)
})

const deSeamlessScrollBox: any = ref(null)
const listA: any = ref(null)
const listB: any = ref(null)

const requestAnimationId: any = ref()
const transformStart: any = {
  up: [0, 0],
  down: [0, -100],
  left: [0, 0],
  right: [-100, 0],
}
const transformDataA = reactive(transformStart[scrollOptions.value.direction])

// 清除animationFrame
function clearRequestAnimation() {
  if (requestAnimationId.value) {
    cancelAnimationFrame(requestAnimationId.value)
    requestAnimationId.value = null
  }
}
// 开始滚动
function startScroll() {
  clearRequestAnimation()
  if (scrollOptions.value.direction === 'up') {
    if (transformDataA[1] > -100)
      transformDataA[1] -= scrollOptions.value.speed
    else
      transformDataA[1] = 0
  }
  else if (scrollOptions.value.direction === 'down') {
    if (transformDataA[1] < 0)
      transformDataA[1] += scrollOptions.value.speed
    else
      transformDataA[1] = -100
  }
  else if (scrollOptions.value.direction === 'left') {
    if (transformDataA[0] > -100)
      transformDataA[0] -= scrollOptions.value.speed
    else
      transformDataA[0] = 0
  }
  else if (scrollOptions.value.direction === 'right') {
    if (transformDataA[0] < 0)
      transformDataA[0] += scrollOptions.value.speed
    else
      transformDataA[0] = -100
  }
  listA.value.style.transform = `translateX(${transformDataA[0]}%) translateY(${transformDataA[1]}%)`
  listB.value.style.transform = `translateX(${transformDataA[0]}%) translateY(${transformDataA[1]}%)`
  requestAnimationId.value = requestAnimationFrame(startScroll)
}
// 停止滚动
function stopScroll() {
  clearRequestAnimation()
}
// 鼠标移入事件
function onEnter() {
  if (props.scrollData.length >= scrollOptions.value.scrollNum)
    stopScroll()
}
// 鼠标移出事件
function onLeave() {
  if (props.scrollData.length >= scrollOptions.value.scrollNum)
    requestAnimationId.value = requestAnimationFrame(startScroll)
}

onMounted(() => {
  if (props.scrollData.length >= scrollOptions.value.scrollNum) {
    requestAnimationId.value = requestAnimationFrame(startScroll)
    // 添加鼠标悬浮时滚轮滚动功能
    if (scrollOptions.value.isStop) {
      deSeamlessScrollBox.value.addEventListener('wheel', (event: any) => {
      // 滚轮向上 deltaY负数 滚轮向下 deltaY正数
        if (scrollOptions.value.direction === 'up' || scrollOptions.value.direction === 'down') {
          if (event.deltaY < 0) {
            let temp = transformDataA[1] + scrollOptions.value.wheelSpeed
            transformDataA[1] = temp > 0 ? -100 : temp
          }
          else {
            let temp = transformDataA[1] - scrollOptions.value.wheelSpeed
            transformDataA[1] = temp < -100 ? 0 : temp
          }
        }
        else if (scrollOptions.value.direction === 'left' || scrollOptions.value.direction === 'right') {
          if (event.deltaY < 0) {
            let temp = transformDataA[0] + scrollOptions.value.wheelSpeed
            transformDataA[0] = temp > 0 ? 0 : temp
          }
          else {
            let temp = transformDataA[0] - scrollOptions.value.wheelSpeed
            transformDataA[0] = temp < -100 ? -100 : temp
          }
        }
        listA.value.style.transform = `translateX(${transformDataA[0]}%) translateY(${transformDataA[1]}%)`
        listB.value.style.transform = `translateX(${transformDataA[0]}%) translateY(${transformDataA[1]}%)`
      })
    }
  }
})
</script>

<template>
  <div
    ref="deSeamlessScrollBox"
    class="seamless-scroll-box"
    :class="{
      flex: scrollOptions.direction === 'left' || scrollOptions.direction === 'right',
    }"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <section ref="listA" class="seamless-scroll-list">
      <slot />
    </section>
    <section ref="listB" class="seamless-scroll-list">
      <slot />
    </section>
  </div>
</template>

<style>
.seamless-scroll-box {
  height: 100px;
  overflow: hidden;
}
.flex {
  display: flex;
}
</style>
