/**
 * @description Bibliotecas y dependencias
 */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

/**
 * @description Servicios generales
 */
import { PaginationServiceService } from 'src/app/modules/components/table/pagination/pagination-service/pagination-service.service';
import { JuridicalService } from '../../../../../services/juridical/juridical.service';

/**
 * @description Modelos juridica
 */
import { clasificacionRelatoria, restrictoresRelatoria, descriptoresRelatoria, subClasificacionRelatoria, conceptosRelatoria } from '../../../../../services/juridical/models/conceptos-element'

@Component({
  selector: 'app-search-concept',
  templateUrl: './search-concept.component.html',
  styleUrls: ['./search-concept.component.css']
})
export class SearchConceptComponent implements OnInit {

  //Variables logicas
  public booleanGetFicha: boolean = false;
  public itemsPerDefault: number = 2;

  //Almacenar data response de los services
  public dataClasificacionRelatoria: clasificacionRelatoria;
  public dataRestrictoresRelatoria: restrictoresRelatoria;
  public dataDescriptoresRelatoria: descriptoresRelatoria;
  public dataSubClasificacionRelatoria: subClasificacionRelatoria;
  public dataListConcepts: any;
  public dataListConceptsLength: [];
  public conceptsFichaReceived: conceptosRelatoria;

  public formSearchConcepts = new FormGroup({
    id_concepto: new FormControl('', [Validators.maxLength(20), ]),
    rangoInicial: new FormControl('', [Validators.maxLength(20), ]),
    rangoFinal: new FormControl('', [Validators.maxLength(20), ]),
    abogado: new FormControl('', [Validators.maxLength(50), ]),
    clasificacion: new FormControl('', [Validators.maxLength(50), ]),
    subclasificacion: new FormControl('', [Validators.maxLength(50), ]),
    problema_juridico: new FormControl('', [Validators.maxLength(300), ]),
    respuesta: new FormControl('', [Validators.maxLength(300), ]),
    descriptor: new FormControl('', [Validators.maxLength(50), ]),
    restrictor: new FormControl('', [Validators.maxLength(50), ])
  });

  constructor(
    private paginationService: PaginationServiceService,
    private juridicalService: JuridicalService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.getConceptsList();
    this.getClasificaciónRelatoria();
    this.getDescriptoresRelatoria();
    this.getRestrictoresRelatoria();
    this.getClasificaciónRelatoria();

    this.paginationService.getItems().subscribe({
      next: (res) => {
        this.dataListConcepts = res
      }
    })
  }

  getConceptsList(): void {
    this.juridicalService.getAllConcepts().subscribe({
      next: (res) => {
        this.dataListConcepts = res;
        this.dataListConceptsLength = this.dataListConcepts
        this.paginationService.setTotalItems(this.dataListConcepts)
      }, error: (error) => {
        console.log('Error getConceptsList', error)
      }
    })
  }

  getClasificaciónRelatoria() {
    this.juridicalService.getClasificaciónRelatoria().subscribe({
      next: (res) => {
        this.dataClasificacionRelatoria = res;
      },
      error: (error) => {
        console.log('error getClasificaciónRelatoria', error)
      }
    })
  }

  getDescriptoresRelatoria() {
    this.juridicalService.getDescriptoresRelatoria().subscribe({
      next: (res) => {
        this.dataDescriptoresRelatoria = res;
      },
      error: (error) => {
        console.log('error getDescriptoresRelatoria', error)
      }
    })
  }

  getRestrictoresRelatoria() {
    this.juridicalService.getRestrictoresRelatoria().subscribe({
      next: (res) => {
        this.dataRestrictoresRelatoria = res;
      },
      error: (error) => {
        console.log('error getRestrictoresRelatoria', error)
      }
    })
  }

  getSubClasificacionRelatoria() {
    let idClasificacion = parseInt(this.formSearchConcepts.get('clasificacion').value)
    this.juridicalService.getSubClasificacionRelatoria(idClasificacion).subscribe({
      next: (res) => {
        this.dataSubClasificacionRelatoria = res;
      },
      error: (error) => {
        console.log('error getRestrictoresRelatoria', error)
      }
    })
  }

  /**
   * @param data 
   * @returns Data formateada para aplicar a los filtros
   */
  setValuesForm(data: any) {
    const rangoInicialValue = this.datePipe.transform(this.formSearchConcepts.get('rangoInicial').value, 'yyyy/MM/dd');
    const rangoFinalValue = this.datePipe.transform(this.formSearchConcepts.get('rangoFinal').value, 'yyyy/MM/dd');

    let formSet = {
      id_concepto: data.id_concepto,
      rangoInicial: rangoInicialValue,
      rangoFinal: rangoFinalValue,
      abogado: data.abogado,
      clasificacion: data.clasificacion,
      subclasificacion: data.subclasificacion,
      problema_juridico: data.problema_juridico,
      respuesta: data.respuesta,
      descriptor: data.descriptor,
      restrictor: data.restrictor
    }

    return formSet;
  }

  searchConcepts() {
    this.juridicalService.getAllConceptsWithFilters(this.setValuesForm(this.formSearchConcepts.value)).subscribe({
      next: (res) => {
        this.dataListConcepts = res;
        this.dataListConceptsLength = this.dataListConcepts
        this.paginationService.setTotalItems(this.dataListConcepts)
      },
      error: (error) => {
        console.log('error searchConcepts', error)
      }
    })
  }



  //Dezplazar la vista a la parte inicial de card (Usabilidad)
  consultaFicha(idConcepto?: number) {
    this.booleanGetFicha = true;

    let filter = { "id_concepto": idConcepto }

    this.juridicalService.getAllConceptsWithFilters(filter).subscribe({
      next: (res) => {
        this.conceptsFichaReceived = res;
      },
      error: (error) => {
        console.log('error searchConcepts', error)
      }
    })

    setTimeout(() => {
      const detailElement = document.getElementById('detalleFicha');
      if (detailElement) {
        detailElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
  }

  //Regresar a los filtros
  volverAlBuscador() {
    this.booleanGetFicha = false;
    this.getConceptsList();
  }

  resetForm(): void {
    this.formSearchConcepts.reset();

    // Marcar los controles como no sucios y no tocados
    Object.keys(this.formSearchConcepts.controls).forEach(key => {
      this.formSearchConcepts.get(key).setErrors(null);
      this.formSearchConcepts.get(key).markAsPristine();
      this.formSearchConcepts.get(key).markAsUntouched();
    });
  }

  //Refresh table on button update
  refreshTaskReceived() {
    this.getConceptsList()
  }
}
