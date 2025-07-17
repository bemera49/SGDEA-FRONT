import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { JuridicalService } from '@app/services/juridical/juridical.service';
import { debounceTime, Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-request-extension',
  templateUrl: './request-extension.component.html',
  styleUrls: ['./request-extension.component.css']
})
export class RequestExtensionComponent implements OnInit {
  @Output() observacionForm = new EventEmitter<{ value: string, valid: boolean }>();
  @Output() rangoForm = new EventEmitter<{ value: string, valid: boolean }>();
  public justification = new FormControl('',);
  public range = new FormControl('',);
  public observation = new FormControl('', [Validators.required]);
  ranges = [];
  constructor(
    private jurudicaService: JuridicalService
  ) { }

  ngOnInit(): void {
    this.justification.disable();
    this.getRangeValue();
    this.observation.valueChanges.pipe(debounceTime(500)).subscribe(value => {
      this.observacionForm.emit({ value, valid: this.observation.valid });
    });
    this.range.valueChanges.pipe(debounceTime(500)).subscribe(value => {
      this.rangoForm.emit({ value, valid: this.range.valid });
    });
  }

  private unsubscribe$ = new Subject<void>();
  data: any
  ngAfterViewInit() {
    this.validarDatoHijo().pipe(takeUntil(this.unsubscribe$)).subscribe((data: any) => {
      this.data = data;
      if (this.data?.key_tipo_tarea === 'PRORROGA_APROBADA' || this.data?.key_tipo_tarea === 'PRORROGA_RECHAZADA') {
        this.range.disable();
        this.observation.disable();
        this.getJustification();
        if (this.data?.observaciones) {
          this.observation.setValue(this.data.observaciones);
        }
      }else{
        if (this.data?.observaciones) {
          this.justification.setValue(this.data.observaciones);
        }
      }
    });
  }

  private getJustification() {
    this.jurudicaService.getInfoExtension(this.data.tarea_anterior).subscribe((data: any) => {
      this.justification.setValue(data?.data);
    });
  }

  private getRangeValue() {
    this.jurudicaService.getRangosProrroga().subscribe((data: any) => { 
      this.ranges = data.data;
      if (this.data?.key_tipo_tarea === 'PRORROGA_APROBADA' || this.data?.key_tipo_tarea === 'PRORROGA_RECHAZADA' || this.data?.key_tipo_tarea === 'VERIFICAR_RANGO_COMPLEJIDAD') {
        this.range.setValue(this.data?.rango_complejidad);
      }else{
        this.range.setValue(this.ranges[0]?.id);
      }
    });
  }

  validarDatoHijo(): Observable<Object>{
    return new Observable<Object>(observer => {
      this.jurudicaService.recibirObjetoPadre().subscribe((data: any) => {
        observer.next(data);
      });
    });
  }

}
