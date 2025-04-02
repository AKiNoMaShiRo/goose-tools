<script setup lang="ts">
const props = defineProps({
  width: {
    type: Number,
    default: 500
  },
  height: {
    type: Number,
    default: 200
  },
  unit: {
    type: String,
    default: 'px',
  },
  color: {
    type: String,
    default: 'black'
  },
  backgroundcolor: {
    type: String,
    default: 'transparent'
  },
  lineWidth: {
    type: Number,
    default: 2,
  }
})

const deSignBoard: any = ref(null)
let canvasCtx: any = null // canvas绘制上下文
let actions: any = [] // 绘制笔画路径
let currentStep: any = -1 // 撤销/恢复时当前笔画index
let lineStart: any = { x: null, y: null }

// 绘制逻辑
function drawLine (e: any) {
  if (Math.abs(e.offsetX - lineStart.x) >= 1 || Math.abs(e.offsetY - lineStart.y) >= 1) {
    canvasCtx.strokeStyle = props.color
    canvasCtx.lineWidth = props.lineWidth
    canvasCtx.lineJoin = 'round'
    canvasCtx.beginPath()
    canvasCtx.moveTo(lineStart.x, lineStart.y)
    lineStart.x = e.offsetX
    lineStart.y = e.offsetY
    canvasCtx.lineTo(lineStart.x, lineStart.y)
    actions[currentStep].push({ x: e.offsetX, y: e.offsetY })
    canvasCtx.stroke()
  }
}

onMounted(() => {
  canvasCtx = deSignBoard.value.getContext('2d')
  canvasCtx.fillStyle = props.backgroundcolor
  canvasCtx.fillRect(0, 0, props.width, props.height)
  deSignBoard.value.addEventListener('pointerdown', function (e: any) {
    lineStart.x = e.offsetX
    lineStart.y = e.offsetY
    if (currentStep < actions.length - 1) {
      // 撤销/恢复功能相关 当前笔画数小于总笔画数时 开始绘制前清空后续的笔画记录
      actions.splice(currentStep + 1)
    }
    actions.push([])
    currentStep = actions.length - 1
    actions[currentStep].push({ x: e.offsetX, y: e.offsetY })
    deSignBoard.value.addEventListener('pointermove', drawLine)
  })
  deSignBoard.value.addEventListener('pointerup', function () {
    deSignBoard.value.removeEventListener('pointermove', drawLine)
  })
})

// 清除
function clear () {
  actions = []
  currentStep = -1
  canvasCtx.clearRect(0, 0, props.width, props.height)
  console.log('component clear', props.width, props.height)
}

// 撤销
function back () {
  if (currentStep >= 0) {
    canvasCtx.clearRect(0, 0, props.width, props.height)
    canvasCtx.strokeStyle = props.color
    canvasCtx.lineWidth = props.lineWidth
    canvasCtx.lineJoin = 'round'
    for (let k = 0; k < currentStep; k++) {
      for (let i = 0; i < actions[k].length - 1; i ++){
        canvasCtx.beginPath()
        canvasCtx.moveTo(actions[k][i].x, actions[k][i].y)
        canvasCtx.lineTo(actions[k][i + 1].x, actions[k][i + 1].y)
        canvasCtx.stroke()
      }
    }
    currentStep -= 1
  }
}

// 恢复
function restore () {
  if (currentStep < actions.length - 1) {
    currentStep ++
    for (let i = 0; i < actions[currentStep].length - 1; i++) {
      canvasCtx.beginPath()
      canvasCtx.moveTo(actions[currentStep][i].x, actions[currentStep][i].y)
      canvasCtx.lineTo(actions[currentStep][i + 1].x, actions[currentStep][i + 1].y)
      canvasCtx.stroke()
    }
  }
}

// 下载
function download () {
  let aEle = document.createElement('a')
  aEle.href = deSignBoard.value.toDataURL()
  aEle.download = 'sign.png'
  aEle.click()
  document.removeChild(aEle)
}

defineExpose({ clear, back, restore, download })
</script>

<template>
  <div class="sign-board-box">
    <canvas ref="deSignBoard" :width="width + unit" :height="height + unit"></canvas>
  </div>
</template>

<style>
.sign-board-box {
  width: fit-content;
  border: 1px solid #CCC;
  border-radius: 4px;
}
</style>