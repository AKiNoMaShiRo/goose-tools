<script setup>
import { WaterFall } from '@goose-tools/components'
import '@goose-tools/components/goose-tools-componets.css'
import { ref } from 'vue'

const waterFallRef = ref(null)

let options = ref({
  column: 3,
  gap: 10,
  bottomLoading: false,
  loadDistance: 100,
  data: [
    { msg: '远旅', imgUrl: 'https://gamecms-res.sl916.com/official_website_resource/50001/4/PICTURE/20250501/524%201440x2560_c5245dd009d242b0871d81f23adeb49f.jpg' },
    { msg: '远旅-横', imgUrl: 'https://gamecms-res.sl916.com/official_website_resource/50001/4/PICTURE/20250501/517%202436x1125_9df7c2a987504389b5b12a07b9b098f9.jpg' },
    { msg: '冷周六', imgUrl: 'https://gamecms-res.sl916.com/official_website_resource/50001/4/PICTURE/20250501/514%201440x2560_614f8473476c4e73ac1c2c36132f85dc.jpg' },
    { msg: '马库斯', imgUrl: 'https://gamecms-res.sl916.com/official_website_resource/50001/4/PICTURE/20250325/484%201440x2560_c5a16c179f784868a4d2152e2cdce02b.jpg' }
  ]
})

let addDataList = [
  { imgUrl: 'https://gamecms-res.sl916.com/official_website_resource/50001/4/PICTURE/20250325/488%202436x1125_d5a830a4f12d43fbbcb0b59c3fd54eef.jpg' },
  { imgUrl: 'https://gamecms-res.sl916.com/official_website_resource/50001/4/PICTURE/20250325/481%201440x2560_0d9a56ad77ff46b0af9a8b3854f517e6.jpg' },
  { imgUrl: 'https://gamecms-res.sl916.com/official_website_resource/50001/4/PICTURE/20250211/449%201440x2560_55d8eb48652a4aae88492bd77f0eba22.jpg'},
  { imgUrl: 'https://gamecms-res.sl916.com/official_website_resource/50001/4/PICTURE/20250211/447%201440x2560_571bd897a9ac4aefbbd570096c03ca7f.jpg' },
]
let isAdd = true
function addData () {
  if (isAdd) {
    waterFallRef.value.changeLoading(true)
    setTimeout(() => {
      options.value.data.push(...addDataList)
      waterFallRef.value.changeLoading(false)
    }, 8000)
  }
  isAdd = false
}
</script>

<template>
  <div
    style="
      width: fit-content;
      height: 300px;
      overflow-y: auto;
    "
  >
    <WaterFall
      ref="waterFallRef"
      :options="options" 
      style="width: 800px;"
    >
      <template v-slot="soltProps">
        <div>{{ soltProps.item.msg }}</div>
        <img
          :src="soltProps.item.imgUrl"
          :style="{
            'width': soltProps.item.imgWidth + 'px',
            'height': soltProps.item.imgHeight + 'px',
          }"
        />
      </template>
    </WaterFall>
  </div>
</template>
