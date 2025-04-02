<script setup>
const props = defineProps({
  // 虚拟自动滚动列表的源数据
  dataList: {
    type: Array
  },
  // 滚动速度 每帧px
  scrollSpeed: {
    type: Number,
    default: 0.1
  },
  // 开启滚动的数据项数量
  amount: {
    type: Number,
    default: 10,
  },
  // 是否启用悬浮暂停滚动
  hoverStop: {
    type: Boolean,
    default: true,
  },
  // 启用悬浮暂停滚动时，滚轮滚动速度
  scrollRate: {
    type: Number,
    default: 10
  },
})

// 虚拟自动滚动列表区域
let virtualInfiniteScrollList = ref(null)
// 虚拟自动滚动列表盒子
let virtualInfiniteScrollBox = ref(null)

// 当前显示区域显示的数据数组
let virtualList = ref([])

// 列表项的高度
let itemHeight = 20
// 可视区域总高度，在onMounted生命周期中获取
let totalHeight = undefined
// 当前显示区域的结束下标
let endIndex = 10

// 偏移数量
let offest = 4

// // 滚动速度 每帧px
// let scrollSpeed = 0.1
// 当前滚动距离
let currentScrollDistance = 0

let requestAnimationId = undefined
onMounted(() => {
  endIndex = props.amount
  console.log(endIndex)
  totalHeight = virtualInfiniteScrollBox.value.getBoundingClientRect().height
  // 计算初始endIndex
  // endIndex = 0 + Math.ceil(Number(totalHeight / itemHeight)) + offest
  virtualInfiniteScrollList.value.style.transform = `translateY(0)`
  virtualList.value = props.dataList.slice(0, endIndex)
  nextTick(() => {
    refHeigth = virtualInfiniteScrollList.value.children[0].getBoundingClientRect().height
    console.log(refHeigth)
    requestAnimationId = requestAnimationFrame(startScroll)
    if (props.hoverStop) {
      virtualInfiniteScrollList.value.addEventListener('wheel', (event) => {
        currentScrollDistance += event.deltaY > 0 ? props.scrollSpeed * props.scrollRate
         : -props.scrollSpeed * props.scrollRate
        if (currentScrollDistance >= totalHeight) {
          currentScrollDistance = totalHeight
        }
        if (currentScrollDistance < 0) {
          currentScrollDistance = 0
        }
        virtualInfiniteScrollList.value.style.transform = `translateY(${-1 * currentScrollDistance}px)`
      })
    }
  })
})
// 清除animationFrame
function clearRequestAnimation() {
  if (requestAnimationId) {
    cancelAnimationFrame(requestAnimationId)
    requestAnimationId = undefined
  }
}
// 鼠标进入悬浮暂停/鼠标离开启动
function handleEnterStop () {
  if (props.hoverStop) {
    clearRequestAnimation()
  }
}
function handleLeaveStart () {
  if (props.hoverStop) {
    startScroll()
  }
}
function handleScroll (e) {
  console.log(e)
}
// 开始自动滚动
let refHeigth = 0
let currentHeight = 0
let nextHeight = 0
function startScroll () {
  clearRequestAnimation()
  currentScrollDistance += props.scrollSpeed
  if (currentScrollDistance >= refHeigth) {
    currentScrollDistance -= refHeigth
    virtualList.value.push(props.dataList[endIndex++])
    if (endIndex >= props.dataList.length) endIndex = 0
    refHeigth = virtualInfiniteScrollList.value.children[1].getBoundingClientRect().height
    // console.log(refHeigth)
    virtualList.value.shift()
  }
  virtualInfiniteScrollList.value.style.transform = `translateY(${-1 * currentScrollDistance}px)`
  // 重置requestAnimationId
  requestAnimationId = requestAnimationFrame(startScroll)
}
// function __startScroll () {
//   clearRequestAnimation()
//   currentScrollDistance += props.scrollSpeed
//   if (currentScrollDistance > offest * itemHeight) {
//     // 已经滚动掉offest = 4条数据
//     virtualList.value.shift()
//     virtualList.value.push(props.dataList[endIndex])
//     endIndex++
//     if (endIndex >= props.dataList.length) endIndex = 0
//     currentScrollDistance -= itemHeight
//     // clearRequestAnimation()
//   }
//   virtualInfiniteScrollList.value.style.transform = `translateY(${-1 * currentScrollDistance}px)`
//   // 重置requestAnimationId
//   requestAnimationId = requestAnimationFrame(startScroll)
// }
</script>

<template>
  <section
    ref="virtualInfiniteScrollBox"
    class="virtual-infinite-scroll-box"
  >
    <div
      ref="virtualInfiniteScrollList" 
      @mouseenter="handleEnterStop"
      @mouseleave="handleLeaveStart"
      @scroll="handleScroll"
    >
      <slot :slotItem="virtualList"></slot>
    </div>
  </section>
</template>

<style>
.virtual-infinite-scroll-box {
  height: 150px;
  background: white;
  /* overflow-y: scroll; */
  overflow: hidden;
}
</style>
