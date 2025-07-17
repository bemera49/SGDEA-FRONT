import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { CkeditorService } from '@app/ckeditor.service';
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
export class SgdaEditorV2Component implements OnInit {

  @Input() initialData
  @Output() ckDocument = new EventEmitter();

  constructor(
    private ckeditorService: CkeditorService
  ) { }


  editorConfig = this.ckeditorService.getEditorConfig();
  public editorData: string = '';
  public editorInstance: any;
  public Editor = ClassicEditor;

  ngOnInit(): void {

  }

  onReady(editor: any): void {

    this.editorInstance = editor;

  }

  getEditorContent(): string {
    if (this.editorInstance) {
      return this.editorInstance.getData();
    }
    return '';
  }

  setEditorContent(content: string): void {

    if (this.editorInstance) {
      this.editorInstance.setData(content);
    }
  }

  onChange({ editor }: { editor: any }) {
    // Obtén el contenido HTML del editor
    const data = editor.getData();
    //this.ckDocument.emit(data);

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.initialData || !changes.initialData.firstChange) {
      this.setEditorContent(this.initialData);
    }
  }

}
