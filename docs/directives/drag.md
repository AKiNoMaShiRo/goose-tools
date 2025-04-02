# 拖拽

通过指令的形式，实现元素拖拽。

``` js
<script setup>
import { VDrag } from '@goose-tools/directives'
</script>
```
``` html
<div v-drag></div>
```

<script setup>
import { VDrag } from '@goose-tools/directives'
import { ref, onMounted } from 'vue'
let dragArea = ref(null)
function getArea() {
  return dragArea.value
}
onMounted(() => {
  console.log(dragArea.value.getBoundingClientRect())
})
</script>

<section class="drag-content">
  <div v-drag class="my-drag">
    <div>点击拖拽我！</div>
  </div>
</section>

<style>
.drag-content {
  height: 50px;
}
.my-drag {
  position: fixed;
  left: 180px;
  top: 60px;
  padding: 12px;
  border-radius: 5px;
  background: #fff;
  z-index: 99;
  box-shadow: 2px 2px 5px rgba(35, 35, 37, 0.5);
}
</style>

在指定区域内拖拽：
``` js
<script setup>
import { VDrag } from '@goose-tools/directives'
import { ref } from 'vue'
let dragArea = ref(null)
function getArea() {
  return dragArea.value
}
</script>
```
``` html
<section ref="dragArea" class="area-drag-content">
  <div v-drag="getArea" class="area-my-drag"></div>
</section>
```

::: tip
● 拖拽区域需要将 `position` 设置为 `relative`；  
● 如果拖拽区域需要设置边框，请用 `outline` 属性代替为 `border` 属性。
:::

<section ref="dragArea" class="area-drag-content">
  <div v-drag="getArea" class="area-my-drag">
    <div>点击在指定范围内拖拽我！</div>
  </div>
</section>

<style>
.area-drag-content {
  position: relative;
  width: 100%;
  height: 500px;
  outline: 1px solid #ccc;
  box-sizing: border-box;
}
.area-my-drag {
  padding: 12px;
  border-radius: 5px;
  white-space: no-wrap;
  background: #fff;
  box-shadow: 2px 2px 5px rgba(35, 35, 37, 0.5);
  z-index: 99;
}
</style>
