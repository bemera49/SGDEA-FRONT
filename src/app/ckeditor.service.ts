import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CkeditorService {

  private config = {
    editorConfig: {
      toolbar: [
        'undo', 'redo',
        '|',
        'bold', 'italic', 'underline', 'strikethrough', // Formatos más usados
        '|',
        'link', 'blockQuote', 'uploadImage', 'insertTable', 'mediaEmbed', 'horizontalLine',
        '|',
        {
          label: 'Lists',
          icon: false,
          items: ['bulletedList', 'numberedList', 'outdent', 'indent']
        },
        '|',
        'pasteFromWord', // Opción para pegar desde Word
        'removeFormat'   // Opción para eliminar el formato
      ],
      heading: {
        options: [
          { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
          { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
          { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
          { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
          { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
          { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
          { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' },
        ]
      },
      language: 'es',
      extraPlugins: [ 'PasteFromOffice' ], // Plugin para pegar desde Word y otras aplicaciones de Office
    }
  };

  getEditorConfig() {
    return this.config.editorConfig;
  }
}
