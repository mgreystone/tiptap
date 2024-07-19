import './styles.scss'

import { Extension } from '@tiptap/core'
import Document from '@tiptap/extension-document'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'

const CustomDocument = Document.extend({
  content: 'heading block',
})

export default () => {
  const editor = useEditor({
    extensions: [
      CustomDocument,
      StarterKit.configure({
        document: false,
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return 'What’s the title?'
          }

          return 'Can you add some further context?'
        },
      }),
      Extension.create({
        addKeyboardShortcuts() {
          return {
            Enter: () => this.editor.commands.first(({ commands }) => [
              () => commands.splitBlock(),
              () => (console.log('success! splitBlock returned false'), false),
            ]),
          }
        },
      }),
    ],
    content: `
      <h1>
        It’ll always have a heading …
      </h1>
      <p>
        … if you pass a custom document. That’s the beauty of having full control over the schema.
      </p>
    `,
  })

  return (
    <EditorContent editor={editor} />
  )
}
