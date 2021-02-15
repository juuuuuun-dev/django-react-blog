import 'easymde/dist/easymde.min.css';

import EasyMDE from 'easymde';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import SimpleMDE from 'react-simplemde-editor';

import {
    BoldOutlined, BorderHorizontalOutlined, CodeOutlined, EyeOutlined, FullscreenOutlined,
    ItalicOutlined, PictureFilled, TableOutlined
} from '@ant-design/icons-svg';
import { renderIconDefinitionToSVGElement } from '@ant-design/icons-svg/es/helpers';

import { MarkdownEditorProps } from '../../types/markdownEditor';
import { MediaDetail } from '../../types/media';
import MediaModal from '../admin/MediaModal';
import MarkdownContent from './MarkdownContent';

const MarkdownEditor = (props: MarkdownEditorProps) => {
  const [codemirror, setCodeMirror] = React.useState<any>();
  const [mediaModalVisible, setMediaModalVisible] = React.useState<boolean>(false)

  const handleAddMedia = (value: MediaDetail) => {
    const text = `<img src="${value.file}" alt="${value.name}" width="${value.width}" height="${value.height}" loading="lazy">`
    if (codemirror) {
      const { line, ch } = codemirror.getCursor();
      codemirror.replaceRange(text, { line: line, ch: ch })
      props.onChangeHandler(codemirror.getValue())
    }
  }

  const renderIcon = (icon: any): string => {
    return renderIconDefinitionToSVGElement(icon, {
      extraSVGAttrs: { width: '1em', height: '1em', fill: 'currentColor' }
    })
  }
  // 
  return (
    <>
      <SimpleMDE
        data-testid="text-area"
        onChange={props.onChangeHandler}
        value={props.value}
        options={{
          autoDownloadFontAwesome: false,
          spellChecker: false,
          previewRender(text) {
            return ReactDOMServer.renderToString(
              <MarkdownContent name="about-me-form" content={text} />
            )
          },
          // Use a custom icon as the default icon will load jquery and bootstrap
          // @ts-ignore
          toolbar: [
            {
              name: "bold",
              action: EasyMDE.toggleBold,
              title: "Bold",
              // @ts-ignore
              icon: renderIcon(BoldOutlined)
            },
            {
              name: "italic",
              action: EasyMDE.toggleItalic,
              title: "Italic",
              // @ts-ignore
              icon: renderIcon(ItalicOutlined)
            },
            {
              name: "code",
              action: EasyMDE.toggleCodeBlock,
              title: "Code",
              // @ts-ignore
              icon: renderIcon(CodeOutlined)
            },
            {
              name: "table",
              action: EasyMDE.drawTable,
              title: "Table",
              // @ts-ignore
              icon: renderIcon(TableOutlined)
            },
            {
              name: "preview",
              action: EasyMDE.togglePreview,
              title: "Preview",
              className: "fa fa-eye no-disable",
              // @ts-ignore
              icon: renderIcon(EyeOutlined)
            },
            {
              name: "side-by-side",
              action: EasyMDE.toggleSideBySide,
              title: "side-by-side",
              className: "fa fa-columns no-disable no-mobile",
              // @ts-ignore
              icon: renderIcon(BorderHorizontalOutlined)
            },
            {
              name: "fullscreen",
              action: EasyMDE.toggleFullScreen,
              title: "Fullscreen",
              className: "fa fa-arrows-alt no-disable no-mobile",
              // @ts-ignore
              icon: renderIcon(FullscreenOutlined)
            },
            {
              name: "custom",
              action: async function customFunction(editor) {
                await new Promise((resolve) => {
                  setCodeMirror(editor.codemirror)
                  resolve();
                })
                setMediaModalVisible(true)
              },
              className: "fa fa-image",
              title: "Add media",
              // @ts-ignore
              icon: renderIcon(PictureFilled)
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