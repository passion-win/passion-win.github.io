---
title: 链接汇总
links:
  - title: 查看IP地址
    description: 查看IP地址
    website: https://www.myip.com
    image: 
  - title: 示例网站2
    description: 这是第二个示例网站的简要描述信息
    website: https://example2.com
    image: local-image2.jpg
  - title: 示例网站3
    description: 这是第三个示例网站的简要描述信息
    website: https://example3.com
    image: https://example3.com/icon.png
menu:
    main: 
        weight: -50
        params:
            icon: link

comments: false
---

这里可以添加关于这些链接的说明文字，例如介绍这些链接的分类、用途等。

你可以根据需要添加更多链接，每个链接包含以下字段：
- `title`：链接的标题（必填）
- `description`：对链接的简要描述（可选）
- `website`：链接的网址（必填）
- `image`：展示的图片，支持外部图片URL或本地图片路径（可选）

如果需要调整导航栏中的位置，可以修改`menu.main.weight`的值，数值越小越靠左侧。