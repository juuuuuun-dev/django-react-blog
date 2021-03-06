import 'easymde/dist/easymde.min.css';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import SimpleMDE from 'react-simplemde-editor';

import { MarkdownEditorProps } from '../../types/markdownEditor';
import { MediaDetail } from '../../types/media';
import MediaModal from '../admin/MediaModal';
import MarkdownContent from './MarkdownContent';

const MarkdownEditor = (props: MarkdownEditorProps) => {
  const [codemirror, setCodeMirror] = React.useState<any>();
  const [mediaModalVisible, setMediaModalVisible] = React.useState<boolean>(false)

  const handleAddMedia = (value: MediaDetail) => {
    const text = `<img class="markdown-image" src="${value.file}" alt="${value.name}" width="${value.width}" height="${value.height}" loading="lazy">`
    if (codemirror) {
      const { line, ch } = codemirror.getCursor();
      codemirror.replaceRange(text, { line: line, ch: ch })
      props.onChangeHandler(codemirror.getValue())
    }
  }

  const handleAddTableOfContents = (codemirror: any) => {
    console.log("handleAddTableOfContents")
    const text = `
<div class="table-of-contents">
  <h3 class="table-of-contents-title">目次</h3>
  <ul>
    <li><a href="#list1">list1</a></li>
    <li><a href="#list2">list2</a></li>
    <li><a href="#list3">list3</a></li>
  </ul>
</div>

<span id="list1"></span>
## list1
<span id="list2"></span>
## list2
<span id="list3"></span>
## list3
`;
    if (codemirror) {
      const { line, ch } = codemirror.getCursor();
      codemirror.replaceRange(text, { line: line, ch: ch })
      props.onChangeHandler(codemirror.getValue())
    }
  }


  // 
  return (
    <>
      <SimpleMDE
        data-testid="text-area"
        onChange={props.onChangeHandler}
        value={props.value}
        options={{
          spellChecker: false,
          previewRender(text) {
            return ReactDOMServer.renderToString(
              <MarkdownContent name="about-me-form" content={text} />
            )
          },
          toolbar: ["bold", "italic", "heading", "|", "quote", "code", "table", "|", "preview", "side-by-side", "fullscreen",
          {
            name: "addMedia",
            action: async function customFunction(editor) {
              await new Promise((resolve) => {
                setCodeMirror(editor.codemirror)
                resolve();
              })
              // setMediaModalType('content');
              setMediaModalVisible(true)
            },
            className: "fa fa-image",
            title: "Add media",
          },
          {
            name: "table-of-contents",
            action: async function customFunction(editor) {
              await new Promise(() => {
                handleAddTableOfContents(editor.codemirror)
              })
            },
            className: "fa fa-list-ul",
            title: "Table of contents",
          },
        ],
        }}
      />
      <MediaModal
        handleAddMedia={handleAddMedia}
        visible={mediaModalVisible}
        setVisible={setMediaModalVisible}
      />
    </>
  )
}

export default MarkdownEditor;