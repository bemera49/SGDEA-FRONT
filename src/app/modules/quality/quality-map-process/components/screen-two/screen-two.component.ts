import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { tablenode } from '@app/modules/quality/quality-process-map/quality-process-detail/interfaces/Processnode';
import { ProcessData, SubprocessDetail } from '@app/services/quality-details/Interfaces/detailsConfig';
import { Subscription } from 'rxjs';
import { Interceptor } from '../../interface/interceptor-data';
import { InterceptorDataService } from '../../services/interceptor-data/interceptor-data.service';

@Component({
  selector: 'app-screen-two',
  templateUrl: './screen-two.component.html',
  styleUrls: ['./screen-two.component.css']
})
export class ScreenTwoComponent implements OnInit, OnDestroy {

  private ids$ = inject(InterceptorDataService);


  currentStep = 1;
  selectedTab: number = 0;
  dataIntercept: Interceptor = null;
  dataIntercept$: Subscription = null;
  Info = 'info';
  modifiedSubProcess: tablenode[] = [];
  modifiedDocument: tablenode[] = [];

  ngOnInit(): void {
    this.dataIntercept$ = this.ids$.getInterceptorObservable().subscribe({
      next: (res) => {

        this.dataIntercept = res;
        this.modifySubProcess();
        this.modifyDocuments();
      }
    })

  }

  modifyDocuments(): void {

    if (this.dataIntercept && this.dataIntercept.type === 'sub-process') {
      const data = this.dataIntercept.data;
      if (this.isSubProcess(data)) {
        console.log('files', data.documents[0].files[0]);
        if (data.documents.length > 0) {
          this.modifiedDocument = data.documents[0].files.map(item => ({
            id: item.id,
            name: item.name,
            

          }));
        } else {
          this.modifiedDocument.push({
            id: 999,
            name: 'No hay procedimientos para seleccionar',
            code: ''
          });
        }

      }
    }
  }

  modifySubProcess(): void {
    if (this.dataIntercept && this.dataIntercept.type === 'process') {
      const data = this.dataIntercept.data;
      if (this.isProcessData(data)) {
        if (data.subprocess.length > 0) {
          this.modifiedSubProcess = data.subprocess.map(item => ({
            id: item.id,
            name: item.name,
            code: item.code
          }));

        } else {
          this.modifiedSubProcess.push({
            id: 999,
            name: 'No hay procedimientos para seleccionar',
            code: ''
          });
        }

      }

    }
  }


  isSubProcess(data: any): data is SubprocessDetail {
    return 'documents' in data;
  }

  isProcessData(data: any): data is ProcessData {
    return 'subprocess' in data;
  }

  onRowClicked(id: number): void {
    // Actualiza el estado y el ID en el servicio
    /* this.selectedId = id
    this.(gostep({ id: id, step: 3 }) */
  }


  ngOnDestroy(): void {
    this.dataIntercept$?.unsubscribe();
  }

}
