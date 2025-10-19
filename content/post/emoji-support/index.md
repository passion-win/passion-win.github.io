+++
author = "win"
title = "Emoji Support"
date = "2025-10-18"
description = "Hugo中Emoji使用指南"
categories = [
    "Test"
]
tags = [
    "emoji",
]
image = "the-creative-exchange-d2zvqp3fpro-unsplash.jpg"
+++

“在 Hugo 项目中，有多种方式可以启用 Emoji 功能”
<!--more-->    #含义：Hugo 的「摘要分割标记」。此标记之前的内容会作为 “文章摘要”，在博客列表页显示；标记之后的内容仅在 “文章详情页” 显示（避免列表页内容过长）
The [`emojify`](https://gohugo.io/functions/emojify/) function can be called directly in templates or [Inline Shortcodes](https://gohugo.io/templates/shortcode-templates/#inline-shortcodes).  #“emojify 函数（链接到 Hugo 官方文档）可以直接在「模板文件」或「内联短代码」中调用”（介绍第一种启用方式：通过 Hugo 内置函数手动调用）。

To enable emoji globally, set `enableEmoji` to `true` in your site's [configuration](https://gohugo.io/getting-started/configuration/) and then you can type emoji shorthand codes directly in content files; e.g.       #“要全局启用 Emoji，需在网站的「配置文件」（如 hugo.yaml/config.toml，链接到 Hugo 配置文档）中，将 enableEmoji 设为 true；之后就能在文章（content 文件）中直接输入 Emoji 简写代码，例如：”（介绍第二种更便捷的方式：全局配置后直接用简写）。

<p><span class="nowrap"><span class="emojify">🙈</span> <code>:see_no_evil:</code></span>  <span class="nowrap"><span class="emojify">🙉</span> <code>:hear_no_evil:</code></span>  <span class="nowrap"><span class="emojify">🙊</span> <code>:speak_no_evil:</code></span></p>     #用 HTML 写的示例，展示 “Emoji 简写代码” 与 “实际显示效果” 的对应关系：:see_no_evil: 是 Emoji 简写，显示为 🙈；:hear_no_evil: 显示为 🙉；:speak_no_evil: 显示为 🙊；class="nowrap" 是 CSS 类，确保 “Emoji + 代码” 在一行显示，不换行；class="emojify" 是后续自定义的 CSS 类，用于设置 Emoji 字体。
<br>   #HTML 的换行标签，在示例和下文之间添加一个空行，优化排版。

The [Emoji cheat sheet](http://www.emoji-cheat-sheet.com/) is a useful reference for emoji shorthand codes.  #“Emoji 速查表 是查询 Emoji 简写代码的实用工具”（给读者提供查询简写的资源）。

***

**N.B.** The above steps enable Unicode Standard emoji characters and sequences in Hugo, however the rendering of these glyphs depends on the browser and the platform. To style the emoji you can either use a third party emoji font or a font stack; e.g.

{{< highlight html >}}
.emoji {
  font-family: Apple Color Emoji, Segoe UI Emoji, NotoColorEmoji, Segoe UI Symbol, Android Emoji, EmojiSymbols;
}
{{< /highlight >}}

{{< css.inline >}}
<style>
.emojify {
	font-family: Apple Color Emoji, Segoe UI Emoji, NotoColorEmoji, Segoe UI Symbol, Android Emoji, EmojiSymbols;
	font-size: 2rem;
	vertical-align: middle;
}
@media screen and (max-width:650px) {
  .nowrap {
    display: block;
    margin: 25px 0;
  }
}
</style>
{{< /css.inline >}}


整个文件的核心作用是：作为 Hugo 博客的一篇教程文章，详细讲解 “如何在 Hugo 中启用和使用 Emoji”，包括配置方法、简写示例、样式优化，同时通过 Front Matter 定义文章的元数据，确保 Hugo 能正确渲染和展示这篇文章。