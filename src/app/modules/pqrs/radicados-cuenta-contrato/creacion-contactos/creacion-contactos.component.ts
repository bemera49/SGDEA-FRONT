/**
 * @description Bibliotecas y dependencias
 */
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from "@angular/router";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

/**
 * @description Servicios generales
 */
import { ModalService } from "src/app/services/modal/modal.service";
import { ToastService } from "src/app/services/toast/toast.service";
import { CreacionContactosService } from 'src/app/services/pqrs/creacion_contactos.service'

/**
 * @description Componentes
 */
import { ActionModalComponent } from "@app/services/modal/components/action-modal/action-modal.component";
import { UploadModalComponent } from '../upload-modal/upload-modal.component';

@Component({
  selector: 'app-creacion-contactos',
  templateUrl: './creacion-contactos.component.html',
  styleUrls: ['./creacion-contactos.component.css']
})
export class CreacionContactosComponent implements OnInit {

  public dataListCuentasContratos: any
  public dataListCuentaContratoFound: any

  public idRadiRadicado: string;
  public cuentasContrato: any[] = [];
  public cuentasContratoExcel: any[] = [];

  public checkboxBoolean: boolean = false;
  public flujoDato: boolean = false;
  public buttonsSave: number = 0;

  public newContract = new FormControl('', [Validators.maxLength(50), Validators.required]);
  public observacion = new FormControl('', [Validators.maxLength(500), Validators.required]);

  selectedIds: number[] = [];

  constructor(
    public dialog: MatDialog,
    private modal: ModalService,
    @Inject(ToastService) private toast: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public creacionContactosService: CreacionContactosService,
    private dialogRef: MatDialogRef<CreacionContactosComponent>,
    private router: Router
  ) {
    this.idRadiRadicado = data;
  }

  ngOnInit(): void {
    this.obtenerCuentasContratoByIdRadiRadicado();
  }


  /**
   * @description Obtener Cuentas contrato relacionadas con el radicado.
   */
  obtenerCuentasContratoByIdRadiRadicado() {
    //this.idRadiRadicado == 1 reemplazar !!!!
    const contractNumber = parseInt(this.idRadiRadicado);
    console.log('contractNumber', contractNumber)
    this.creacionContactosService.obtenerCuentasContratoByIdRadiRadicado(contractNumber).subscribe({
      next: (res) => {
        this.dataListCuentasContratos = res['data']
      }, error: (err) => {
        console.log('err obtenerCuentasContratoByIdRadiRadicado', err)
      }
    })
  }

  /**
   * @description Obtener el contacto por el numero de cuenta contrato
   */
  getCuentaContratoByNumber() {
    const contractNumber = parseInt(this.newContract.value);
    this.creacionContactosService.getCuentaContratoByNumber(contractNumber).subscribe({
      next: (res) => {
        if (res && res['data'] && res['data'].length > 0) {
          this.addCuentasContrato(res['data'][0])
        } else {
          this.toast.open({
            description: 'Cuenta contrato no encontrada'
          });
        }
      },
      error: (err) => {
        console.log('err getCuentaContratoByNumber', err);
      }
    });
  }

  /**
   * @description Obtener los contactos por el array de cuentas contrato
   */
  getCuentasContratoByCuentasContrato(cuentas: number[]) {
    let dataCuentas = {
      "numeroCuentaContratos": cuentas
    }
    this.creacionContactosService.getCuentasContratoByCuentasContrato(dataCuentas).subscribe({
      next: (res) => {
        for (let i = 0; i < res.data.length; i++) {
          this.addCuentasContrato(res['data'][i])
        }
      }, error: (err) => {
        console.log('err obtenerCuentasContratoByCuentasContrato', err)
      }
    })
  }

  /**
   * @description Iniciar busqueda del numero cuenta contrato para agregarlo
   */
  searchTableContractNew() {
    this.getCuentaContratoByNumber();
    this.newContract.reset()
  }

  /**
   * @description Eliminar Cuentas contrato de la tabla temporal
   */
  deleteCuentaContratoById(id: number) {
    const index = this.cuentasContrato.findIndex(cuenta => cuenta.id === id);
    if (index !== -1) {
      this.cuentasContrato.splice(index, 1);
    }
  }

  /**
   * @description Capturar los numeros de cuentas contrato obtenidos del excel
   */
  dialogUploadFile(): void {
    const dialogRef = this.dialog.open(UploadModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cuentasContratoExcel = result
        this.getCuentasContratoByCuentasContrato(result)
      }
    });
  }

  /**
   * @description Agregar elementos a la tabla temporal de cuentas contratos
   * @param cuenta 
   */
  addCuentasContrato(cuenta: any): void {
    const exists = this.cuentasContrato.some(existingCuenta => existingCuenta.id === cuenta.id);
    if (!exists) {
      this.cuentasContrato.push(cuenta);
    } else {
      this.toast.open({
        description: 'Algunas cuentas contrato ya fueron agregadas'
      });
    }
  }

  validateAndSubmit(): void {
    if (this.observacion.invalid) {
      this.observacion.markAsTouched();
      return;
    }
    this.actionAccountContract();
  }

  /**
   * @description 
   */
  actionAccountContract() {
    const modalRef = this.modal.open(ActionModalComponent, {
      message: '¿Está seguro de la acción a realizar?',
    });

    modalRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        if (this.buttonsSave == 1) {
          this.addAccountContract()
        }

        if (this.buttonsSave == 2) {
          this.updateAccountContract();
        }

        if (this.buttonsSave == 3) {
          this.deleteAccountContract()
        }
      }
      if (result === 'denied') {
        this.onCancel();
      }
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onCancel(): void {
    const modalRef = this.modal.open(ActionModalComponent, {
      message: '¿Está seguro de cancelar la acción?',
    });

    modalRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.dialogRef.close();
      }
    });
  }

  addAccountContract() {
    let crearCuentas = {
      description: this.observacion.value,
      idRadiRadicado: this.idRadiRadicado,
      cuentaContrato: this.cuentasContrato
    }
    this.creacionContactosService.addAccountContract(crearCuentas).subscribe({
      next: (res) => {
        console.log('res: addAccountContract: ', res)
        this.obtenerCuentasContratoByIdRadiRadicado();
        this.initConfig();
        this.toast.open({
          description: 'Registro Exitoso'
        });
        this.dialogRef.close();
      }, error: (err) => {
        console.log('err addAccountContract', err)
      }
    })
  }

  updateAccountContract() {
    let reemplazarCuentas = {
      description: this.observacion.value,
      idRadiRadicado: this.idRadiRadicado,
      cuentaContratoEliminar: this.selectedIds,
      cuentaContrato: this.cuentasContrato
    }
    this.creacionContactosService.updateAccountContract(reemplazarCuentas).subscribe({
      next: (res) => {
        this.obtenerCuentasContratoByIdRadiRadicado();
        this.initConfig();
        this.toast.open({
          description: 'Edición Exitosa'
        });
        this.dialogRef.close();
      }, error: (err) => {
        console.log('err updateAccountContract', err)
      }
    })
  }

  deleteAccountContract() {
    let eliminarCuentas = {
      description: this.observacion.value,
      idRadiRadicado: this.idRadiRadicado,
      cuentaContratoEliminar: this.selectedIds,
    }
    this.creacionContactosService.deleteAccountContract(eliminarCuentas).subscribe({
      next: (res) => {
        this.obtenerCuentasContratoByIdRadiRadicado();
        this.initConfig();
        this.toast.open({
          description: 'Eliminación exitosa'
        });
        this.dialogRef.close();
      }, error: (err) => {
        console.log('err deleteAccountContract', err)
      }
    })
  }

  onCheckboxChange(event: any, id: number): void {
    if (event.checked) {
      // Agregar el id al array si está seleccionado
      this.selectedIds.push(id);
    } else {
      // Eliminar el id del array si está deseleccionado
      this.selectedIds = this.selectedIds.filter(selectedId => selectedId !== id);
    }
  }

  isSelected(id: number): boolean {
    return this.selectedIds.includes(id);
  }

  initConfig() {
    this.observacion.reset();
    this.checkboxBoolean = false;
    this.flujoDato = false;
    this.buttonsSave = 0
    this.cuentasContrato = [];
    this.selectedIds = [];
  }

  clickAdd() {
    this.flujoDato = true
    this.checkboxBoolean = false
    this.buttonsSave = 1;
  }

  clickEdit() {
    this.flujoDato = true
    this.checkboxBoolean = true
    this.buttonsSave = 2;
  }

  clickDelete() {
    this.checkboxBoolean = true
    this.flujoDato = false
    this.buttonsSave = 3;
  }

  downloadExcel() {
   var dataFile = [
      { numeroCuentaContratos: 'Cuenta Contrato 1' },
      { numeroCuentaContratos: 'Cuenta Contrato 2' },
      { numeroCuentaContratos: 'Cuenta Contrato 3' },
      { numeroCuentaContratos: 'No modificar el titulo de la columna.' },
  ];
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataFile);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Cuentas contrato carga');

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    saveAs(data, 'Cuentas_contrato_carga.xlsx');
}

}
