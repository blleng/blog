---
{"alias":"More convenient ToC","info":"Modify the digital garden for convenient table of contents","date":"2023-08-28T00:36","update":"2023-08-28T14:13","tags":["note/2023/08","note/tech"],"id":"note20230828003602","dg-publish":true,"noteIcon":3,"permalink":"/notes/tech/table-of-contents-modification-of-digital-garden/","dgPassFrontmatter":true,"created":"2023-08-28T00:36","updated":"2023-08-28T14:13"}
---

{%raw%}
`Obsidian`的`Digital Garden`插件将文章目录与`Graph`、`Backlink`模块一同放在`sidebar`中，在移动端难以使用。
这里对其模板做一些改动，让文章目录与`filetree`显示在同一区域，利用`js`实现Tab切换，方便使用。

# Details

首先删除`src/site/_include/components/sidebar.njk`文件中关于目录的代码：
```diff 
- {%if settings.dgShowToc === true%}
- {%set tocHtml= (content and (content\|toc)) %}
- {%if tocHtml %}
- <div class="toc">
- <div class="toc-title-container">
- <div class="toc-title">
- On this page
- </div>
- </div>
- <div class="toc-container">
- {{ tocHtml | safe }}
- </div>
- </div>
- {%endif%}
- {%endif%}
```

在`src/site/_include/components/filetree.njk`文件中做如下修改：
```diff
 <div class="folder" x-data="{isOpen: true}">
+    <div class="sidebar-nav">
+        <ul>
+            <li class="current">
+                Overview
+            </li>
+            <li>
+                Contents
+            </li>
+        </ul>
+    </div>
+    <div class="sidebar-panel-container">
+        <div class="item" style="display: block;">
+			<div class="site-overview">
	            {% for fileOrFolderName, fileOrFolder in filetree -%}
					{{menuItem(fileOrFolderName, fileOrFolder, 0, fileOrFolderName)}}
	            {% endfor -%}
+	        </div>
+	    </div>
+        {% if settings.dgShowToc === true %}
+        <div class="item">
+	        {%set tocHtml= (content and (content|toc)) %}
+	        {%if tocHtml %}
+            <div class="toc">
+	            <div class="toc-container">
+	                {{ tocHtml | safe }}
+                </div>
+            </div>
+	        {%endif%}
+        </div>
+        {% endif %}
+    </div>
 </div>
```

在`src/site/styles/custom-style.scss`中添加以下样式：
```css
li.current {
    border-bottom: 1px solid;
}

.sidebar-nav li {
    float: left;
    list-style-type: none;
    padding: 0 10px;
    text-align: center;
    cursor: pointer;
    font-size: 14px;
}

.item {
    display: none;
}
```

在`src/site/_include/layouts`文件夹的两个`.njk`文件的`</html>`标签前添加：
```diff
	</body>
+	<script>
+	var lis = document.querySelectorAll('div.sidebar-nav li');
+	var items = document.querySelectorAll('.item');
+	for (var i = 0; i < lis.length; i++) {
+	    lis[i].setAttribute('data-index', i);
+	    lis[i].onclick = function () {
+	        for (var i = 0; i < lis.length; i++) {
+	            lis[i].className = '';
+	        }
+	        this.className = 'current';
+	        var index = this.getAttribute('data-index');
+	        for (var j = 0; j < items.length; j++) {
+	            items[j].style.display = 'none';
+	        }
+	        items[index].style.display = 'block';
+	    }
+	}
+	</script>
	</html>
```

```ad-tip
title: Important
此外还需根据您的实际情况对样式文件中有关目录和文件树的样式进行修改。
```

# Showcase

![toc1](https://cdn.jsdelivr.net/gh/blleng/images/upload/202308280119703.png)

![toc2](https://cdn.jsdelivr.net/gh/blleng/images/upload/202308280119708.png)

{%endraw%}