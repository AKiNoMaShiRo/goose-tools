# 自动滚动虚拟列表

可无限自动滚动，展示大量数据的组件。支持不定高的内容。

<script setup>
import { VirtualInfiniteScroll } from '@goose-tools/components'
import '@goose-tools/components/goose-tools-componets.css'
import { ref } from 'vue'

let dataList = ref([{id: 0}, {id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}, {id: 9},
  {id: 10}, {id: 11}, {id: 12}, {id: 13}, {id: 14}, {id: 15}, {id: 16}, {id: 17}, {id: 18}, {id: 19}])
</script>

<VirtualInfiniteScroll
  :dataList="dataList"
>
  <template v-slot="slotProps">
    <div v-for="item in slotProps.slotItem" :key="item.id" :style="{ height: 20 + item.id + 'px' }">
      这是第{{ item.id }}条数据
    </div>
  </template>
</VirtualInfiniteScroll>


## 组件属性
### `dataList`
    滚动数据
### `scrollSpeed`
    滚动速度，默认值 0.1
### `amount`
    开启滚动的数据项数量，默认值 10
### `hoverStop`
    是否启用悬浮暂停滚动，默认值 true
### `scrollRate`
    启用悬浮暂停滚动时，滚轮滚动速度，默认值 10
