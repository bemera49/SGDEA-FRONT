import { Component, } from '@angular/core';
import { Router } from '@angular/router';
import { CuentaContrato, cuentasContrato } from '@app/helpers/CuentasContrato';

@Component({
  selector: 'app-pqrs-cuentas-contrato',
  templateUrl: './pqrs-cuentas-contrato.component.html',
  styleUrls: ['./pqrs-cuentas-contrato.component.css']
})
export class PqrsCuentasContratoComponent {
  initCardHeaderStatus = true;
  initCardHeaderIcon = 'timer';
  initCardHeaderTitle = 'Listado de Cuentas Contrato';

  breadcrumbOn = [
    { name: "PQRS", route: "/pqrs" },
  ];
  breadcrumbRouteActive = "Cuenta Contrato";


  dtTitles: any = [
    { "id": "ID", "data": "id" },
    { "title": "Cuenta Contrato", "data": "CTACONTRATO" },
    { "title": "Nº Cta. Contrato", "data": "VKONT" },
    { "title": "Número Documento de Impresión", "data": "OPBEL" },
    { "title": "Número de Socio Comercial", "data": "PARTNER" },
    { "title": "Concepto de Búsqueda", "data": "BU_SORT1" },
    { "title": "Nombre Completo", "data": "NAME1_TEXT" },
    { "title": "Número de Teléfono", "data": "TELF1" },
    { "title": "Población", "data": "CITY1" },
    { "title": "Dirección", "data": "DIRECCION" },
    { "title": "Zona", "data": "ZONA" },
    { "title": "Porción", "data": "ZPORTION" },
    { "title": "Localidad", "data": "LOCALIDAD" },
    { "title": "Barrio", "data": "BARRIO" },
    { "title": "Categoría de Cuenta", "data": "KTOKL" },
    { "title": "Indicador de Posición", "data": "IND" },
    { "title": "Correo Electrónico", "data": "CorreoElectronico" },
    { "title": "Cuenta Interna", "data": "CuentaInterna" }
  ];

  cuentasContrato: CuentaContrato[] = cuentasContrato.map(cuenta => ({ ...cuenta, selected: false }));

  menuButtons: any = [];

  constructor(private router: Router) { }

  selectRow(index: number) {
    this.cuentasContrato.forEach((cuenta, i) => {
      cuenta.selected = i === index ? !cuenta.selected : false;
    });
    this.updateFloatingMenuButtons();
  }

  updateFloatingMenuButtons() {
    const selectedCuenta = this.cuentasContrato.find(cuenta => cuenta.selected);
    this.menuButtons = selectedCuenta ? [{ icon: 'remove_red_eye', title: 'Ver', action: 'view', data: selectedCuenta.id }] : [];
  }

  menuReceiveData(event) {
    if (event.action === 'view') {
      const selectedCuenta = this.cuentasContrato.find(cuenta => cuenta.id === event.data);
      if (selectedCuenta) {
        this.router.navigate(['/pqrs/pqrs-cuentas-contrato', selectedCuenta.id]);
      }
    }
  }

  verDetalle(id: number) {
    this.router.navigate(['/pqrs/pqrs-cuentas-contrato', id]);
  }

}