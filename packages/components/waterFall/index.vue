<script lang="ts" setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
interface IWaterFallOptions {
  column: number;
  gap: number;
  itemBottomGap: number;
  bottomLoading: boolean;
  loadDistance: number;
  data: Array<IWaterFallItem>;
}
interface IWaterFallItem {
  // id: number | string;
  width: number;
  height: number;
  imgUrl: string | undefined;
  imgWidth: number;
  imgHeight: number;
  [key: string]: any;
}
interface IWaterFallPosition {
  x: number;
  y: number;
}
const props = defineProps<{
  options: IWaterFallOptions;
}>();

// // 内容数组
// let dataList: Array<IWaterFallItem> = [];
// 内容项宽度
let cardWidth = 0;
// data项位置
let positionArr = ref([] as IWaterFallPosition[]);
// 每列总高度
let columnHeight =  ref([] as number[]);
// 数据区域高度
let boxHeight = computed(() => {
  return Math.max(...columnHeight.value)
});
// 当前展示的数据项是否正在加载中
let loading = ref(true)
// 触底加载观察者
let intersectionObserver = {} as IntersectionObserver
let loadingObserveDom
let loadingDomHeight = 0

const emits = defineEmits(['addData', 'onloaded'])
defineExpose({
  changeLoading
})

function changeLoading (value) {
  loading.value = value
}

// 初始化 
function init() {
  // dataList = JSON.parse(JSON.stringify(props.options.data))
  // 计算宽度
  let containerWidth = document.getElementById('gooseWaterFallContainer')?.clientWidth || 0
  cardWidth = (containerWidth - props.options.gap * (props.options.column - 1)) / props.options.column
  // 初始化位置数组
  positionArr.value = []
  for (let i = 0; i < props.options.data.length; i++) {
    positionArr.value.push({ x: 0, y: 0 })
  }
  // new Array(props.options.column).fill({ x: 0, y: 0 })
  // positionArr = temp.map(() => {
  //   return { x: 0, y: 0 }
  // })
  // 初始化每列总高度数组
  columnHeight.value = new Array(props.options.column).fill(0)
  // 初始化图片宽度（未设置时等于卡片宽度）、初始化每项宽度为列宽
  props.options.data.forEach((item) => {
    item.width = cardWidth
    if (!item.imgWidth) {
      item.imgWidth = cardWidth
    }
  }) 
}

// 计算高度
function calculateHeight(start, end) {
  let imgLoadPromiseArr = [] as Promise<any>[]
  // 没有设置高度的图片预加载
  props.options.data.forEach((item, index) => {
    if (!item.imgHeight) {
      imgLoadPromiseArr.push(preloadImageHeight(item.imgUrl, item.imgWidth).then((height) => {
        item.imgHeight = Number(height)
      }))
    }
  })
  Promise.all(imgLoadPromiseArr).then(() => {
    loading.value = false
    nextTick(() => {
      // 获取每项高度
      props.options.data.forEach((item, index) => {
        let dom = document.getElementById('gooseWaterFallItem' + index)
        if (dom && !item.height) {
          item.height = dom.clientHeight
        }
      })
      // console.log('props.options.data', props.options.data)
      // 计算位置
      calculatePosition(start, end)
    })
  })
}

function preloadImageHeight (imgUrl, imgWidth) {
  return new Promise((resolve, reject) => {
    let img = new Image()
    img.src = imgUrl
    img.onload = function () {
      let height = imgWidth * img.height / img.width
      resolve(height)
    }
    img.onerror = function () {
      reject(new Error('Image load error, url:' + imgUrl))
    }
  })
}

function calculatePosition(start, end) {
  // console.log('calculatePosition arg', start, end)
  let itemBottomGap = props.options.itemBottomGap || 0
  for (let i = start; i < end; i++) {
    let item = props.options.data[i]
    // console.log('item', item)
    if (i < props.options.column) {
      columnHeight.value[i] += item.height + itemBottomGap
      positionArr.value[i].y = 0
      positionArr.value[i].x = (item.width + props.options.gap) * i
      // console.log('calculatePosition positionArr <=', positionArr.value[i])
    } else {
      let minHeight = Math.min(...columnHeight.value)
      let index = columnHeight.value.indexOf(minHeight)
      // console.log('calculatePosition', minHeight, index)
      positionArr.value[i].y = minHeight
      positionArr.value[i].x = (item.width + props.options.gap) * index
      columnHeight.value[index] += item.height + itemBottomGap
      // console.log('calculatePosition positionArr >', positionArr.value[i])
    }
    // console.log('columnHeight', columnHeight.value)
  }
  
  if (props.options.bottomLoading) {
    loadMore()
  }
  emits('onloaded')
}

// 添加触底加载功能
function loadMore() {
  intersectionObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      // console.log('触底加载')
      emits('addData')
    }
  }, {
    root: document.getElementById('gooseWaterFallContainer')?.parentElement,
    rootMargin: (props.options.loadDistance || 0) + 'px',
  })
  if (loadingObserveDom) {
    // console.log('loadingObserveDom')
    intersectionObserver.observe(loadingObserveDom)
  }
}

if (props.options.bottomLoading) {
  watch(() => props.options.data.length, (newVal, oldVal) => {
    // 插入的项数
    let addMount = newVal - oldVal
    if (addMount > 0) {
      // 初始化位置数组
      for (let i = 0; i < addMount; i++) {
        positionArr.value.push({ x: 0, y: 0 })
      }
      // 初始化图片宽度（未设置时等于卡片宽度）、初始化每项宽度为列宽
      for (let i = oldVal; i < newVal; i++) {
        props.options.data[i].width = cardWidth
        if (!props.options.data[i].imgWidth) {
          props.options.data[i].imgWidth = cardWidth
        }
      }
      calculateHeight(oldVal, newVal)
    }
  })
}

onMounted(() => {
  init()
  calculateHeight(0, props.options.data.length)
  loadingObserveDom = document.getElementById('gooseWaterFallLoadMore')
  let loadingDom = document.getElementById('gooseWaterFallLoading')
  if (loadingDom) {
    loadingDomHeight = loadingDom.clientHeight
  }
})
onBeforeUnmount(() => {
  if (props.options.bottomLoading && intersectionObserver && loadingObserveDom) {
    intersectionObserver.unobserve(loadingObserveDom)
  }
})
</script>

<template>
  <section
    id="gooseWaterFallContainer" 
    class="goose-water-fall-container"
    :style="{ height: boxHeight + (props.options.bottomLoading ? loadingDomHeight : 0) + 'px' }"
  >
    <div
      v-for="(item, index) in props.options.data"
      class="goose-water-fall-item"
      :id="'gooseWaterFallItem' + index"
      :style="{
        'width': item.width + 'px',
        'transform': `translate(${Number(positionArr[index]?.x)}px, ${Number(positionArr[index]?.y)}px)`,
      }"
    >
      <!-- <div v-show="!loading"> -->
        <slot :item="item"></slot>
      <!-- </div> -->
    </div>
    <div
      id="gooseWaterFallLoadMore"
      class="goose-water-fall-load-more"
      :style="{
        left: '0px',
        top: `${Math.max(...columnHeight)}px`,
      }"
    ></div>
    <div
      v-show="loading"
      id="gooseWaterFallLoading"
      class="goose-water-fall-loading"
      :style="{
        left: '0px',
        top: `${Math.max(...columnHeight)}px`,
      }"
    >
      <slot name="loading">
        <div style="width: 100%;">
        <div style="text-align: center;">加载中...</div>
        </div>
      </slot>
    </div>
  </section>
</template>

<style>
.goose-water-fall-container {
  position: relative;
}
.goose-water-fall-item {
  position: absolute;
  top: 0;
  left: 0;
}
.goose-water-fall-load-more {
  position: absolute;
  width: 1x;
  height: 1px;
}
.goose-water-fall-loading {
  position: absolute;
  width: 100%;
}
</style>