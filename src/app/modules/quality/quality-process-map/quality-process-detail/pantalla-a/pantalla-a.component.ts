import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { CommonSubprocessDetail, } from '../interfaces/Processnode';
import { Items } from './../../../quality-main/components/sub-menu-quality/items';

import { ValidateInternetService } from '@app/services/validate-internet/validate-internet.service';
import { ProcessData, } from 'src/app/services/quality-details/Interfaces/detailsConfig';
import { QualityDetailsService } from 'src/app/services/quality-details/quality-details.service';
import { ProcesoDetallesService } from '../services/proceso-detalles.service';

@Component({
  selector: 'app-pantalla-a',
  templateUrl: './pantalla-a.component.html',
  styleUrls: ['./pantalla-a.component.css']
})

export class PantallaAComponent implements OnInit, OnDestroy {
  items: Items[] = [{
    link: 'quality-process-map',
    text: 'Mapa proceso'
  }, {
    link: 'quality-process-detail',
    text: ''
  }];

  //Variables para iconos
  Info: string = 'info'
  circle: string = 'check'
  calendar: string = 'calendar_today'
  article: string = 'article'
  account_tree: string = 'account_tree'

  //variables logicas y flujo
  showDescription: boolean = false
  showIcon: boolean = false
  datosProceso: ProcessData = null
  datosTree: CommonSubprocessDetail[] = [];
  currentStep: number
  private procesoSubscription: Subscription
  selectedId: number
  isCharacterizationSelected: Boolean = false
  canExpandTree: boolean = true
  firstSubprocessId: number = null
  process$: Subscription;

  constructor(
    private procesoDetallesService: ProcesoDetallesService,
    private qualityDetailsServices: QualityDetailsService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private VIA: ValidateInternetService,
  ) {
    this.VIA.connect()
  }

  ngOnInit(): void {
    this.VIA.connect()
    this.getDatastep(this.currentStep)
    this.getDataProcess()
    this.showDescription = false
    this.showIcon = false
    this.VIA.connect()
    this.cd.detectChanges();

  }

  ngOnDestroy(): void {
    if (this.procesoSubscription) {
      this.procesoSubscription.unsubscribe()
    }
    this.procesoDetallesService.ngOnDestroy()
    this.procesoDetallesService.setIsCharacterizationSelected(false);
    this.procesoDetallesService.setMostrarDescripcion(false)
    this.process$?.unsubscribe();
  }

  //obtiene los datos del proceso seleccionado
  private getDataProcess(): void {
    if (this.VIA.validateConnection()) {
      this.process$ = this.qualityDetailsServices.getProcessDetailsById(this.route.snapshot.paramMap.get('id')).subscribe({
        next: (res) => {
          this.datosProceso = res.data
          this.items[1].text = this.getConcatenatedCodeName(this.datosProceso) || '';
          this.procesoDetallesService.setDatosProceso(this.datosProceso)
          if (this.datosProceso && this.datosProceso.subprocess && this.datosProceso.subprocess.length > 0) {
            this.firstSubprocessId = res.data.subprocess[0].id;
            this.procesoDetallesService.setSubprocessById(this.firstSubprocessId); // Establece el ID del primer subproceso
            this.getSubprocessAndExpanded(this.datosProceso);
            this.cd.detectChanges();
          }
        }, error: (error) => {
          console.log('Error cargando procesos', error)
        }
      })
    }
  }
  private getConcatenatedCodeName(proceso: any): string {
    return `${proceso.code} - ${proceso.name}`;
  }
  //se obtienen datos de subproceso y se agrega expanded para la funcionalidad del arbol
  private getSubprocessAndExpanded(Dataproceso: any): void {
    if (this.VIA.validateConnection()) {
      this.datosTree = Dataproceso.subprocess.map(subprocess => {
        let subprocessCopy = { ...subprocess, expanded: false }; // Crea una copia con expanded en false
        if (subprocessCopy.documents) {
          subprocessCopy.documents = subprocessCopy.documents.map(document => {

            let documentCopy = { ...document, expanded: false }; // Crea una copia con expanded en false
            if (documentCopy.files && Array.isArray(documentCopy.files)) {
              documentCopy.files = documentCopy.files.map(file => {
                // Crea una copia de cada archivo y establece expanded en false
                let fileCopy = { ...file, expanded: false };
                return fileCopy;
              }).filter(file => file.extesion.toLowerCase() !== 'vsdx'); // Filtra los archivos con extensión 'vsdx'
            } else {
              documentCopy.files = []; // Asegúrate de que files sea siempre un array
            }
            return documentCopy;
          });
        }
        return subprocessCopy;
      });
      this.canExpandFirst();
    }
  }


  toggleButtonDescription() {
    if (this.VIA.validateConnection()) {
      this.showDescription = !this.showDescription
      this.showIcon = !this.showIcon
      this.canExpandTree = !this.canExpandTree;
      if (this.showDescription) {
        this.collapseAllTreeItems();
        this.procesoDetallesService.setIsCharacterizationSelected(true)
        this.procesoDetallesService.setsubprocesOrProcedure(false)
        this.procesoDetallesService.setFileId(null)
        this.currentStep = 1
      } else {
        this.canExpandFirst()
        this.procesoDetallesService.setIsCharacterizationSelected(false)
      }
      this.procesoDetallesService.toggleShowDescription();
    }
  }
  private canExpandFirst(): void {
    if (this.VIA.validateConnection()) {
      if (this.datosTree.length > 0) {
        const firstSubprocess = this.datosTree[0];
        firstSubprocess.expanded = false;
        this.procesoDetallesService.setSubprocessById(this.firstSubprocessId); // Establece el ID del primer subproceso
        this.cd.detectChanges();
      }
    }
  }
  private collapseAllTreeItems(): void {
    if (this.VIA.validateConnection()) {
      this.datosTree.forEach(subprocess => {
        subprocess.expanded = false;
        subprocess.documents?.forEach(document => {
          document.expanded = false;
        });
      });
      this.cd.detectChanges();
    }
  }


  getDatastep(currentStep?: number): void {
    if (this.VIA.validateConnection()) {
      this.procesoDetallesService.getbyidrouterstep().subscribe({
        next: (res) => {
          this.currentStep = res.step;
          /* this.getIDforstep(this.currentStep); */

        },
        error: (error) => {
          console.error('Error al obtener los datos del paso:', error);
        }
      });

      this.procesoDetallesService.getIsCharacterizationSelected().subscribe(isSelected => {
        this.isCharacterizationSelected = isSelected;
        // Si se seleccionó una caracterización, actualiza el paso actual a 3
        if (isSelected && this.currentStep !== 1) {
          this.procesoDetallesService.getSelectedCharacterizationId().subscribe(id => {
            this.selectedId = id;
            // Aquí puedes realizar cualquier otra lógica necesaria con el ID
            this.currentStep = 3; // Asegúrate de que el paso actual sea 3
          });
        }
      });
    }


  }
  getIDforstep(currentStep): void {
    if (this.VIA.validateConnection()) {
      if (this.currentStep === 2) {
        this.procesoDetallesService.getSubprocessById().subscribe({
          next: (id) => {
            this.selectedId = id;
          }
        });
      } else if (this.currentStep === 3) {
        this.procesoDetallesService.getDocumentById().subscribe({
          next: (id) => {
            this.selectedId = id;
          }
        });
      } else {
        this.currentStep = 1
        this.collapseAllTreeItems()
      }
    }
  }
  onSubprocesoExpandio(subproceso: any): void {
    // Llamar a toggleButtonDescription cuando se expande un subproceso
    if (this.showDescription) {
      this.toggleButtonDescription();

    }
  }
}
