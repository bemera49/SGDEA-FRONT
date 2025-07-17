import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { LayoutSectionModule } from '@app/modules/quality/quality-view-request-detail/components/layout-section/layout-section.module';
import { TabRequestComponent } from './tab-request.component';

@NgModule({
  declarations: [TabRequestComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    LayoutSectionModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  exports: [TabRequestComponent]
})
export class TabRequestModule { }
