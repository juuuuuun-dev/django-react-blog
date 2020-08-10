import 'highlight.js/styles/dark.css';
import '../../../less/highlightCode.less';

import marked from 'marked';
import React from 'react';

const highlight = require('highlight.js/lib/core');
highlight.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
highlight.registerLanguage('typescript', require('highlight.js/lib/languages/typescript'));
highlight.registerLanguage('json', require('highlight.js/lib/languages/json'));
highlight.registerLanguage('python', require('highlight.js/lib/languages/python'));
highlight.registerLanguage('go', require('highlight.js/lib/languages/go'));
highlight.registerLanguage('rust', require('highlight.js/lib/languages/rust'));
highlight.registerLanguage('bash', require('highlight.js/lib/languages/bash'));
highlight.registerLanguage('nginx', require('highlight.js/lib/languages/nginx'));
highlight.registerLanguage('less', require('highlight.js/lib/languages/less'));
highlight.registerLanguage('yaml', require('highlight.js/lib/languages/yaml'));


marked.setOptions({
  langPrefix: 'hljs ',
  highlight: function (code, lang) {
    return highlight.highlightAuto(code, [lang]).value
  },
});

const PostDetailContent = ({ content }: { content: string }) => {
  return (
    <div className="post-detail__content" data-testid="post-md-content" dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
  )
}

export default PostDetailContent;
