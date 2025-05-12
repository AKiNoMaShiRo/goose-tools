# 签名板

可绘制图案并导出的组件。

<script setup>
import { SignBoard } from '@goose-tools/components'
import '@goose-tools/components/goose-tools-componets.css'
import { ref } from 'vue'

let signBoard = ref()
</script>

<button style="margin-right: 12px;" @click="signBoard.clear()">清除</button>
<button style="margin-right: 12px;" @click="signBoard.back()">撤销</button>
<button style="margin-right: 12px;" @click="signBoard.restore()">恢复</button>
<button @click="signBoard.download()">保存</button>
<SignBoard ref="signBoard" :width="300" :height="200" :backgroundcolor="'#fff'" />

## 属性
| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| width | number | 500 | 画布宽度 |
| height | number | 200 | 画布高度 |
| height | string | 'px' | 画布宽高单位 |
| backgroundcolor | string | 'transparent' | 画布背景色 |
| color | string | 'black' | 画笔颜色 |
| lineWidth | number | 2 | 画笔粗细 |

## 方法
通过ref获取组件实例，并调用方法。

| 方法名 | 参数 | 说明 |
| --- | --- | --- |
| clear | 无 | 清除画布 |
| back | 无  | 撤销 |
| restore | 无  | 恢复 |
| download | 无  | 保存为图片 |

