const rehype = require('rehype')
const minify = require('rehype-minify-whitespace')({ newlines: true })
const phrasing = require('hast-util-phrasing')
const embedded = require('hast-util-embedded')
const sensitive = require('html-whitespace-sensitive-tag-names')
const repeat = require('repeat-string')
const visit = require('unist-util-visit-parents')

const double = '\n\n'
const single = '\n'
const re = /\n/g
const htmlFileCommetReg = /\.html/

function format(options) {
  const settings = options || {}
  let indent = settings.indent || 2
  let indentInitial = settings.indentInitial
  const blanks = settings.blanks || []

  if (typeof indent === 'number') {
    indent = repeat(' ', indent)
  }

  // Default to indenting the initial level.
  if (indentInitial === null || indentInitial === undefined) {
    indentInitial = true
  }

  return transform

  function transform(tree) {
    const root = minify(tree)
    let head = false

    visit(root, visitor)

    return root

    function visitor(node, parents) {
      const children = node.children || []
      const length = children.length
      let level = parents.length
      let index = -1
      let result
      let prev
      let child
      let newline

      if (node.type === 'element' && node.tagName === 'head') {
        head = true
      }

      if (head && node.type === 'element' && node.tagName === 'body') {
        head = false
      }

      // Don’t indent content of whitespace-sensitive nodes / inlines.
      if (!length || !padding(node, head) || ignore(parents.concat(node))) {
        return
      }

      if (!indentInitial) {
        level--
      }

      // Indent newlines in `text`.
      while (++index < length) {
        child = children[index]

        if (child.type === 'text') {
          if (child.value.indexOf('\n') !== -1) {
            newline = true
          }

          child.value = child.value.replace(re, '$&' + repeat(indent, level))
        }
      }

      result = []
      index = -1

      node.children = result

      while (++index < length) {
        child = children[index]

        if (padding(child, head) || newline && index === 0) {
          result.push({
            type: 'text',
            value: (prev && blank(prev) && blank(child) ? double : single) + repeat(indent, level)
          })
        }

        if (comment(child, node, index)) {
          result.push({
            type: 'text',
            value: double + repeat(indent, level)
          })
        }

        prev = child
        result.push(child)
      }

      if (newline || padding(prev, head)) {
        result.push({
          type: 'text',
          value: single + repeat(indent, level - 1)
        })
      }
    }
  }

  function blank(node) {
    return node.type === 'element' && blanks.length !== 0 && blanks.indexOf(node.tagName) !== -1
  }
}

function padding(node, head) {
  if (node.type === 'root') {
    return true
  }

  if (node.type === 'element') {
    return head || node.tagName === 'script' || embedded(node) || !phrasing(node)
  }

  return false
}

// 模板模块级注释换行 如 <!-- ../src/tpl/layout/main/index.html -->
function comment(node, parents, index) {
  if (node.type === 'comment' && htmlFileCommetReg.test(node.value)) {
    if (parents.type === 'root' && index === 0) {
      return false
    }

    return true
  }

  return false
}

function ignore(nodes) {
  let index = nodes.length

  while (index--) {
    if (sensitive.indexOf(nodes[index].tagName) !== -1) {
      return true
    }
  }

  return false
}

class HtmlWebpackInlineStorePlugin {
  constructor(options) {
    this.formatOptions = options || {}
  }

  apply(compiler) {
    // Hook into the html-webpack-plugin processing
    (compiler.hooks
      ? compiler.hooks.compilation.tap.bind(compiler.hooks.compilation, 'html-webpack-format-plugin')
      : compiler.plugin.bind(compiler, 'compilation'))(compilation => {
      (compilation.hooks
        ? compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync.bind(
          compilation.hooks.htmlWebpackPluginAfterHtmlProcessing,
          'html-webpack-format-plugin'
        )
        : compilation.plugin.bind(compilation, 'html-webpack-plugin-after-html-processing'))((htmlPluginData, callback) => {
        rehype()
          .use(format, this.formatOptions)
          .process(htmlPluginData.html, (err, file) => {
            if (err) {
              console.log('html-webpack-format-plugin error: ', err)
            }

            htmlPluginData.html = String(file)

            callback(null, htmlPluginData)
          })
      })
    })
  }
}

module.exports = HtmlWebpackInlineStorePlugin
