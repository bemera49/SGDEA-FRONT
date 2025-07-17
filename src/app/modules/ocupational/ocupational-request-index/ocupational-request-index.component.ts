import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastService } from '@app/services/toast/toast.service';
import { MatTabGroup } from '@angular/material/tabs';
import { Items } from '../ocupational-main/components/sub-menu-ocupational/items';

@Component({
  selector: 'app-ocupational-request-index',
  templateUrl: './ocupational-request-index.component.html',
  styleUrls: ['./ocupational-request-index.component.css']
})
export class OcupationalRequestIndexComponent implements OnInit {

  items: Items[] = [{
    link: 'ocupational-request-index',
    text: 'Solicitudes'
  }]

  @ViewChild('stepper') stepper!: MatTabGroup;

  //Variables
  statusButton: boolean = false;
  

  AnalystReceived: any[] = [];
  elementPaginator: any = {};
  editorContent = "";

  constructor(
    public toast: ToastService,
  ) { }


  ngOnInit(): void {
    (!navigator.onLine) ? this.showToastError() : console.log('Conexión estable');
    this.setupConnectionEvents();
    this.editorContent = "<html><head></head><body><h1>Hola</h1></body></html>";
    this.changeDocument("<html><head></head><body><h1>Hola</h1></body></html>");

  }

  setupConnectionEvents(): void {
    window.addEventListener('online', () => {
      console.log('Conexión restablecida');
    });

    window.addEventListener('offline', () => {
      this.showToastError();
    });
  }

  showToastError(): void {
    this.toast.open({ title: '¡Error!', description: '022.Conexión inestable ' });
  }


  // Asumiendo que el evento $event contiene el índice de la pestaña a mostrar
  onSelectionChange(selectedTabIndex: number) {
    this.stepper.selectedIndex = selectedTabIndex;
  }

  changeDocument(content: string) {
    this.editorContent = content;
    console.log("Contenido del editor: ", this.editorContent)
  }


}
