import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { CkeditorService } from '../../../ckeditor.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'sgda-editor',
  templateUrl: './sgda-editor.component.html',
  styleUrls: ['./sgda-editor.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    CKEditorModule,
    FormsModule
  ]
})
export class SgdaEditorComponent implements OnInit {

  @Input() initialData: string;
  @Output() ckDocument = new EventEmitter();

  public editorData: string = '';
  public editorInstance: any;
  public Editor = ClassicEditor;

  constructor(
    private ckeditorService: CkeditorService
  ) { }

  editorConfig = this.ckeditorService.getEditorConfig();

  ngOnInit(): void { }

  onReady(editor: any): void {
    this.editorInstance = editor;
    if (this.initialData) {
      this.setEditorContent(this.initialData);
    }
  }

  getEditorContent(): string {
    return this.editorInstance ? this.editorInstance.getData() : '';
  }

  setEditorContent(content: string): void {
    if (this.editorInstance && content !== this.getEditorContent()) {
      const view = this.editorInstance.editing.view;
      const selection = view.document.selection;
      const range = selection.getFirstRange();
      const cursorPosition = range ? range.start.offset : null;

      this.editorInstance.setData(content);

      if (cursorPosition !== null) {
        view.change(writer => {
          const position = writer.createPositionAt(view.document.getRoot(), cursorPosition);
          writer.setSelection(position);
        });
      }
    }
  }

  onChange({ editor }: { editor: any }) {
    const data = editor.getData();

    // Emitir los datos y la posición del cursor
    this.ckDocument.emit({
      data: data,
      cursorPosition: {
        start: editor.model.document.selection.getFirstRange().start.offset,
        end: editor.model.document.selection.getFirstRange().end.offset,
      },
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.initialData && !changes.initialData.firstChange) {
      this.setEditorContent(this.initialData);
    }
  }
}
