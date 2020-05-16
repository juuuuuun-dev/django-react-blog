import React from 'react';
import hljs from 'highlight.js';
import marked from 'marked';
import 'highlight.js/styles/dark.css';
import '../../../less/highlightCode.less'

const PostDetailContent = ({ content }: { content: string }) => {
  hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
  marked.setOptions({
    langPrefix: 'hljs ',
    highlight: function (code, lang) {
      return hljs.highlightAuto(code, [lang]).value
    },
  });
  return (
    <div className="post-detail__content" dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
  )
}

export default PostDetailContent;
