import { Component, OnInit, Output, Input, EventEmitter, SimpleChanges } from '@angular/core';
import { saveAs } from 'file-saver';
import { Anexos } from '../../../../../services/juridical/models/detail-element';

@Component({
  selector: 'app-modify-attachments',
  templateUrl: './modify-attachments.component.html',
  styleUrls: ['./modify-attachments.component.css']
})
export class ModifyAttachmentsComponent implements OnInit {

  @Input() attachmentsDetail: Anexos;
  @Output() attachmentsChanged = new EventEmitter<{ nameFile: string, nomArchivo: string, dataArchivo: string }[]>();

  attachments: { nameFile: string, nomArchivo: string, dataArchivo: string }[] = [];

  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['attachmentsDetail'] && changes['attachmentsDetail'].currentValue) {
      this.attachments = [...changes['attachmentsDetail'].currentValue];
    }
  }

  addAttachment(): void {
    this.attachments.push({ nameFile: '', nomArchivo: '', dataArchivo: '' });
  }

  removeAttachment(index: number): void {
    this.attachments.splice(index, 1);
    this.emitAttachments();
  }

  onFileSelected(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const base64 = reader.result as string;
        // Remove the data prefix
        const base64Data = base64.split(',')[1];
        this.attachments[index].dataArchivo = base64Data;
        this.attachments[index].nomArchivo = file.name;
        this.emitAttachments();
      };

      reader.readAsDataURL(file);
    }
  }

  emitAttachments(): void {
    this.attachmentsChanged.emit(this.attachments);
  }
}

