import { ChangeDetectorRef, Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { ProcesoDetallesService } from '../../../services/proceso-detalles.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-alternate-data-viewer-step-two',
  templateUrl: './alternate-data-viewer-step-two.component.html',
  styleUrls: ['./alternate-data-viewer-step-two.component.css']
})
export class AlternateDataViewerStepTwoComponent implements OnChanges, OnDestroy {
  @Input() ID: number
  @Input() isCharacterizationSelected: boolean
  pathDoc: string = ''
  datosProceso = null
  item: any = null
  url: string = ''
  private urlBase = environment.apiUrl;
  //variables de subscription
  private procesoSubscription: Subscription
  private fileIdSubscription: Subscription

  constructor(
    private procesoDetallesService: ProcesoDetallesService,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnChanges() {
    this.updateViewer()
  }

  ngOnDestroy(): void {
    // Cualquier limpieza necesaria al destruir el componente
    this.cancelsuscription()
    this.resetall()
  }
  private cancelsuscription(): void {
    if (this.procesoSubscription) {
      this.procesoSubscription.unsubscribe()
    }
    if (this.fileIdSubscription) {
      this.fileIdSubscription.unsubscribe()
    }
  }

resetall() {
  this.pathDoc = ''
  this.datosProceso = null
  this.item = null
  this.url = ''
}


  updateViewer() {
    if (this.isCharacterizationSelected) {
      this.updateTrueCharacterization()
    } else {
      this.updateFileById()
    }
  }

  updateTrueCharacterization() {
    this.pathDoc = ''
    this.procesoSubscription = this.procesoDetallesService.getDatosProceso().subscribe({
      next: (value) => {
        if(value !== null && value !== undefined) {
        this.datosProceso = value.characterizations.files
        this.item = null
        this.url = ''
        console.log('datos en caracterización:', value)
        this.item = value.characterizations.files[0]
        this.url = `${this.urlBase}${this.item.path}/${encodeURIComponent(this.item.original_name)}&embedded=true`
        this.pathDoc = `https://docs.google.com/viewer?url=${this.url}`
        console.log('ruta a solicitar el documento:', this.pathDoc)
        this.cd.detectChanges()
        }
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  updateFileById() {
    this.pathDoc = ''
    this.fileIdSubscription = this.procesoDetallesService.getFileById().subscribe({
      next: (res) => {
        if (res !== null && res !== undefined) {
          this.item = null
          this.url = ''
          console.log('suscripcion filesbyId: ', res)
          this.item = res
          this.url = `${this.urlBase}${encodeURIComponent(this.item.path)}/${encodeURIComponent(this.item.original_name)}&embedded=true`
          this.pathDoc = `https://docs.google.com/viewer?url=${this.url}`
          console.log('ruta de file:',this.pathDoc)
          this.cd.detectChanges()
        }
      },
      error: (error) => {
        console.log(error)
      }
    });
  }
}
