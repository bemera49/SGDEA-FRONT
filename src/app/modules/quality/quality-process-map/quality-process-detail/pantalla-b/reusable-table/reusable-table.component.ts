import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-reusable-table',
  templateUrl: './reusable-table.component.html',
  styleUrls: ['./reusable-table.component.css']
})
export class ReusableTableComponent implements OnChanges {
  @Input() data: any
  @Input() tableType: string = ''
  @Input() datossubproces: any
  @Input() nameProces: string = ''
  //variables de flujo
  rows: any[] = []
  tablaprocedimiento: boolean = false
  Areaname: string = ''
  DirectionName: string = ''
  managementName: string = ''
  centerOfCostName: string = ''
  areaHeadName: string = ''

  constructor(private cd: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.tableType === 'Arearesponsable') {
      this.getdataname()
    }
  }

  private getdataname() {
    const datosCopia = { ...this.data }
    this.Areaname = this.getAreaName(datosCopia)
    this.DirectionName = this.getDirectionName(datosCopia)
    this.managementName = this.getManagementName(datosCopia)
    this.centerOfCostName = this.getCenterOfCostName(datosCopia)
    this.areaHeadName = this.getAreaHeadName(datosCopia)
    // Detecta cambios si es necesario
    this.cd.detectChanges();
  }
  //función limpia nombres
  cleanName(name: string, code: string): string {
    // Reemplaza los guiones bajos por espacios
    let cleanedName = name.replace(/_/g, ' ');

    // Si el nombre empieza con el código, lo elimina
    if (cleanedName.startsWith(code)) {
      cleanedName = cleanedName.replace(code, '').trim();
    }

    // Elimina cualquier contenido entre paréntesis junto con los paréntesis
    cleanedName = cleanedName.replace(/\s*\(.*?\)\s*/g, '').trim();

    // Elimina cualquier extensión de archivo al final del nombre
    const extensionIndex = cleanedName.lastIndexOf('.');
    if (extensionIndex > -1) {
      cleanedName = cleanedName.substring(0, extensionIndex);
    }
    return cleanedName;
  }



  private getDirectionName(datos: any): string {
    if (!datos.direction || datos.direction === "") {
      return "No hay datos";
    }
    return Array.isArray(datos.direction) ? datos.direction.map((item: any) => item.name).join(", ") : datos.direction;
  }

  private getAreaHeadName(datos: any): string {
    if (!datos.area_head || datos.area_head === "") {
      return "No hay datos";
    }
    return Array.isArray(datos.area_head) ? datos.area_head.map((item: any) => item.name).join(", ") : datos.area_head;
  }

  private getAreaName(datos: any): string {
    // Verificar si no hay datos o si el array de áreas está vacío
    if (!datos || !datos.area || datos.area.length === 0) {
      return "No hay datos";
    }
    this.cd.detectChanges();
    // Si `datos` es un objeto único con la propiedad `area`
    return datos.area.map(item => item.name).join(", ");
  }

  private getManagementName(datos: any): string {
    if (datos.management) {
      return datos.management.map((item: any) => item.name).join(", ");
    }
    return "No hay datos";
  }

  private getCenterOfCostName(datos: any): string {
    if (datos.cost_center) {
      return datos.cost_center.map((item: any) => item.code).join(", ");
    }
    return "No hay datos";
  }

  toggleMostrarTabla() {
    this.tablaprocedimiento = !this.tablaprocedimiento;
  }
}