# Format output html extension for the HTML Webpack Plugin

将 HTML Webpack Plugin 输出的 html 文件格式化
参考： [rehypejs/rehype-format](https://github.com/rehypejs/rehype-format) 对格式逻辑做了些修改

## Basic Usage

在 Webpack 中使用

```javascript
var HtmlWebpackFormatPlugin = require('html-webpack-format-plugin')
```

添加到插件列表

```javascript
plugins: [new HtmlWebpackPlugin(), new HtmlWebpackFormatPlugin()]
```

HtmlWebpackPlugin 之前输出的文件

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Hello!</title>
    <meta charset="utf8" />
  </head>
  <body>
    <!-- body/section.html -->
    <section><p>hi there</p></section>
  </body>
</html>
```

使用此插件之后输出的 html 文件

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Hello!</title>
    <meta charset="utf8" />
  </head>
  <body>
    <!-- body/section.html -->
    <section>
      <p>hi there</p>
    </section>
  </body>
</html>
```

## API

### `HtmlWebpackFormatPlugin(options)`

Format white-space in the processed tree.

- Collapse all white-space (to a single space or newline)
- Remove unneeded white-space
- Inject needed newlines and indentation
- Indent previously collapsed newlines properly

All superfluous white-space is removed. However, as newlines
are kept (and later properly indented), your code will still
line-wrap as expected.

##### `options`

###### `options.indent`

`number`, `string`, default: `2`
— Indentation per level. When number, uses that amount of spaces. When
`string`, uses that per indentation level.

###### `options.indentInitial`

`boolean`, default: `true`
— Whether to indent the first level (usually, in the `html` element, thus
not indenting `head` and `body`).

###### `options.blanks`

`Array.<string>`, default: `[]`
— List of tag-names, which, when next to each other, are joined by a blank
line (`\n\n`). For example, when `['head', 'body']` is given, a blank line
is added between these two.

## Related

- [`rehype-minify`](https://github.com/rehypejs/rehype-minify)
  — Minify HTML

- [rehypejs/rehype-format](https://github.com/rehypejs/rehype-format)
  — Modified from rehypejs/rehype-format

## License

[MIT][license]

<!-- Definitions -->

[license]: license
