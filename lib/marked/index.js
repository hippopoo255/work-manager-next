import marked from 'marked'
import highlightjs from 'highlight.js'
import 'highlight.js/styles/github.css'

marked.setOptions({
  langPrefix: '',
  highlight: (code, lang) => {
    return highlightjs.highlightAuto(code, [lang]).value
  },
})

export default marked
