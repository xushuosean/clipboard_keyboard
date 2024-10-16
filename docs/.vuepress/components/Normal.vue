<template>
  <div class="normal">
    <div class="normal_left">
      <el-checkbox-group v-model="checkList">
        <el-checkbox v-for="item in leftLists" :label="item"></el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="normal_right">
      <el-checkbox v-for="item in rightList" :label="item"></el-checkbox>
    </div>
  </div>
</template>

<script>
import { ClipboardPaste } from '../../../dist/index.browser.js'

const clipboard = new ClipboardPaste()
export default {
  data() {
    return {
      leftLists: [1,2,3,4,5],
      rightList: [],
      checkList: [],
    }
  },
  created() {
    document.addEventListener('keydown', (evt) => {
      if (!(evt.ctrlKey || evt.metaKey)) return
      if (evt.key === 'c') {
        const data = JSON.stringify(this.checkList)
        clipboard?.setCopyValue(data);
        this.$message.success('复制成功！' + data)
      } else if (evt.key === 'v') {
        clipboard?.getPasteValue().then(res => {
          this.rightList = JSON.parse(res)
        })
      }
    })
  }
}
</script>

<style lang="less" scoped>
.normal {
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 10px;
  height: 100px;
  
  & > div {
    border: 1px solid gainsboro;
  }
}
</style>