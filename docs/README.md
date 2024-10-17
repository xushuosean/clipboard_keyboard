# 介绍

这是一个借助系统复制粘贴功能的剪切板library，

## 为什么不是？

### execCommand
这是一个过时的API，可能会在某次浏览器的更新后被移除，当然你现在可以使用它，但是后续可能会出现问题

### Clipboard API
这是一个相对较新的API，且必须使用https才能使用，并且兼容性目前来说并不优秀，如果你不在意，完全可以使用这个API

## 限制
你必须使用 `ctrl+c` / `commad+c` 和 `ctrl+v` / `commad+v` 来进行复制粘贴操作，复制的内容需要由你提供

## 原理
在copy 和 paste 事件前后，会有keydown和keyup事件发出，我们会在keydown时，将你给到的内容，设置到文本框中并全选，等待copy事件时，就会拷贝这部分文本

可以看下面的时序图

（时序图占位）

::: warning
只能存储`string`类型的数据
:::

## 示例

点击选中以后，使用`ctrl+c` / `commad+c`复制，接着使用`ctrl+v` / `commad+v`即可在右侧粘贴出来

<ClientOnly>
  <Normal />
</ClientOnly>


```vue
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
import { ClipboardPaste } from 'clipboard_keyboard'

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
```