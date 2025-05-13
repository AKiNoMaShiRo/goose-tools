# 无缝滚动

实现无缝的自动滚动。

<script setup>
import { SeamlessScroll } from '@goose-tools/components'
import '@goose-tools/components/goose-tools-componets.css'
import { ref } from 'vue'

let scrollData = ref([
  { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10},
])
let options = ref({
  speed: 0.1,
})
</script>

<SeamlessScroll 
  :scrollData="scrollData"
  :options="options"
>
  <div v-for="item in scrollData" :key="item.id" style="height: 20px;">{{ item.id }}</div>
</SeamlessScroll>


``` js
<script setup>
import { SeamlessScroll } from '@goose-tools/components'
import '@goose-tools/components/goose-tools-componets.css'
import { ref } from 'vue'

let scrollData = ref([
  { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10},
])
let options = ref({
  speed: 0.1,
})
</script>
```
``` html
<SeamlessScroll 
  :scrollData="scrollData"
  :options="options"
>
  <div v-for="item in scrollData" :key="item.id" style="height: 20px;">{{ item.id }}</div>
</SeamlessScroll>
```

## 组件属性
### `scrollData`
    滚动数据
### `options`
    滚动配置项
#### 配置项列表
| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| speed | number | 0.4 | 滚动速度 |
| direction | string | 'up' | 滚动方向，可选值：'up'、'down'、'left'、'right' |
| scrollNum | number | 5 | 开启滚动的数量 |
| isStop | boolean | true | 是否开启光标悬浮停止功能 |
| wheelSpeed | number | 5 | 滚轮滚动速度（开启光标悬浮停止时可用） |