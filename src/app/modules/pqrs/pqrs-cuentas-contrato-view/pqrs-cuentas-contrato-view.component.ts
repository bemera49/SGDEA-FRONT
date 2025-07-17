import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CuentaContrato, cuentasContrato } from '@app/helpers/CuentasContrato';

@Component({
  selector: 'app-pqrs-cuentas-contrato-view',
  templateUrl: './pqrs-cuentas-contrato-view.component.html',
  styleUrls: ['./pqrs-cuentas-contrato-view.component.css']
})
export class PqrsCuentasContratoViewComponent implements OnInit {
  breadcrumbOn = [
    { name: "PQRS", route: "/pqrs/pqrs-cuentas-contrato" },
  ];
  breadcrumbRouteActive = "Detalle de cuenta contrato";

  cuentaDetalle: CuentaContrato | undefined;
  detalles: { label: string; value: any; }[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.cargarDetalleCuenta(id);
      } else {
        this.router.navigate(['/pqrs/pqrs-cuentas-contrato']);
      }
    });
  }

  cargarDetalleCuenta(id: number) {
    this.cuentaDetalle = cuentasContrato.find(cuenta => cuenta.id === id);
    if (this.cuentaDetalle) {
      this.detalles = [
        { label: 'Cuenta Contrato', value: this.cuentaDetalle.CTACONTRATO },
        { label: 'Nº Cta. Contrato', value: this.cuentaDetalle.VKONT },
        { label: 'Número Documento de Impresión', value: this.cuentaDetalle.OPBEL },
        { label: 'Número de Socio Comercial', value: this.cuentaDetalle.PARTNER },
        { label: 'Concepto de Búsqueda', value: this.cuentaDetalle.BU_SORT1 },
        { label: 'Nombre Completo', value: this.cuentaDetalle.NAME1_TEXT },
        { label: 'Número de Teléfono', value: this.cuentaDetalle.TELF1 },
        { label: 'Población', value: this.cuentaDetalle.CITY1 },
        { label: 'Dirección', value: this.cuentaDetalle.DIRECCION },
        { label: 'Zona', value: this.cuentaDetalle.ZONA },
        { label: 'Porción', value: this.cuentaDetalle.ZPORTION },
        { label: 'Localidad', value: this.cuentaDetalle.LOCALIDAD },
        { label: 'Barrio', value: this.cuentaDetalle.BARRIO },
        { label: 'Categoría de Cuenta', value: this.cuentaDetalle.KTOKL },
        { label: 'Indicador de Posición', value: this.cuentaDetalle.IND },
        { label: 'Correo Electrónico', value: this.cuentaDetalle.CorreoElectronico },
        { label: 'Cuenta Interna', value: this.cuentaDetalle.CuentaInterna },
      ];
    } else {
      this.router.navigate(['/pqrs']);
    }
  }
}
