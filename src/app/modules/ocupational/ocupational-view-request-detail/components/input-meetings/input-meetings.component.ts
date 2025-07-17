import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ValidateFileService } from '@app/modules/quality/quality-create-request/services/validate-file.service';
import { ToastService } from '@app/services/toast/toast.service';


@Component({
  selector: 'app-input-meetings',
  templateUrl: './input-meetings.component.html',
  styleUrls: ['./input-meetings.component.css']
})
export class InputMeetingsComponent {
  @Input() type!: string;
  @Input() placeholder!: string;
  @Input() model!: string | File;
  @Input() disabled!: boolean;
  @Output() modelChange = new EventEmitter<string | File>();

  constructor(private toast: ToastService,
    private validate: ValidateFileService
  ) { }
  required = false;

  onInputChange(event: Event): void {
    const inputEvent = event as InputEvent;
    this.model = (inputEvent.target as HTMLInputElement).value;
    this.required = this.model.trim() === '';
    this.modelChange.emit(this.model);
  }


  handleRequerid(input: string) {
    console.log('input', input)
  }

  handleFileInput(event: Event, label: HTMLLabelElement): void {
    const inputEvent = event as InputEvent;

    this.model = (inputEvent.target as HTMLInputElement).files?.[0] || null;

    const validateMb = this.validate.validateFileMB(this.model);
    const validateTypes = this.validate.validateFileTypes(this.model);

    this.validate.validateCorrupt(this.model).then(res => {

      if (res.status) {
        this.toast.open({
          title: res.num,
          description: res.message,
        })
        if (!validateMb.status) {
          this.toast.open({
            title: validateMb.num,
            description: validateMb.message,
          });
        }

        if (!validateTypes.status) {
          this.toast.open({
            title: validateTypes.num,
            description: validateTypes.message,
          })
        }

        this.required = !this.model;
        this.modelChange.emit(this.model);
      }
    })

    label.textContent = this.model.name;
  }
}
