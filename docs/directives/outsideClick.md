# 元素外点击

当元素外部发生点击事件时，执行传入的回调函数。

``` js
<script setup>
import { VOutsideclick } from '@goose-tools/directives'
import { ref } from 'vue'
let num = ref(0)
function onClick () {
  num.value++
}
</script>
```
``` html
<div style="font-size: 14px">{{ '触发了 ' + num + ' 次外部点击' }}</div>
<div v-outsideclick="onClick"></div>
```

<script setup>
import { VOutsideclick } from '@goose-tools/directives'
import { ref } from 'vue'
let num = ref(0)
function onClick () {
  num.value++
}
</script>

<div style="font-size: 14px">{{ '触发了 ' + num + ' 次外部点击' }}</div>
<div v-outsideclick="onClick" class="outside-click-demo">
</div>

<style>
.outside-click-demo {
  width: 100px;
  height: 100px;
  background-color: #ccc;
}
</style>
