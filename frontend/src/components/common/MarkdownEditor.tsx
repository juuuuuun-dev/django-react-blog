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
          toolbar: ["bold", "italic", "heading", "|", "quote", "code", "table", "|", "preview", "side-by-side", "fullscreen", {
            name: "custom",
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
          }],
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