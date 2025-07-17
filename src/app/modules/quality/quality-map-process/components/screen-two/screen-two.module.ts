import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { TableStyle2Module } from '@app/modules/quality/quality-process-map/quality-process-detail/components/table-style2/table-style2.module';
import { ReusableTableModule } from '@app/modules/quality/quality-process-map/quality-process-detail/pantalla-b/reusable-table/reusable-table.module';
import { HeaderProcessModule } from '../header-process/header-process.module';
import { TableDocumentsModule } from '../table-documents/table-documents.module';
import { TableProcessTreeModule } from '../table-process-tree/table-process-tree.module';
import { AlternateViewOneModule } from './components/alternate-view-one/alternate-view-one.module';
import { AlternateViewTwoModule } from './components/alternate-view-two/alternate-view-two.module';
import { ScreenTwoComponent } from './screen-two.component';
@NgModule({
  declarations: [
    ScreenTwoComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    HeaderProcessModule,
    ReusableTableModule,
    TableStyle2Module,
    TableDocumentsModule,
    AlternateViewOneModule,
    AlternateViewTwoModule,
    TableProcessTreeModule

  ],
  exports: [ScreenTwoComponent]
})
export class ScreenTwoModule { }
