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
