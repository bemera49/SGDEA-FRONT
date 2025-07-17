import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MaterialModule } from '@app/app.material.module';
import { CanDirective } from '@app/directives/can.directive';
import { PaginatorComponent } from './paginator.component';
import { PaginatorService } from './services/paginator.service';
@NgModule({
  declarations: [PaginatorComponent],
  imports: [
    CommonModule,
    MatIconModule,
    CanDirective,
    MatFormFieldModule,
    MatSelectModule,
    MaterialModule,
  ],
  providers: [PaginatorService],
  exports: [PaginatorComponent]
})
export class PaginatorModule { }
