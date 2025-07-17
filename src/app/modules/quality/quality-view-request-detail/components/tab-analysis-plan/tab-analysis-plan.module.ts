import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MaterialModule } from '@app/app.material.module';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { SortAlphabeticalModule } from '@app/modules/quality/pipes/sort-alphabetical/sort-alphabetical.module';
import { ButtonContinueModule } from '@app/modules/quality/quality-create-request/components/button-continue/button-continue.module';
import { ContainerRadioModule } from '../container-radio/container-radio.module';
import { InputAnalysisModule } from '../input-analysis/input-analysis.module';
import { LayoutSectionModule } from '../layout-section/layout-section.module';
import { TableARItemsModule } from '../table-ar-items/table-ar-items.module';
import { TableTabMeetingsModule } from '../table-tab-meetings/table-tab-meetings.module';
import { ShowDateModule } from './components/show-date/show-date.module';
import { VisualizationConversationModule } from './components/visualization-conversation/visualization-conversation.module';
import { TabAnalysisPlanComponent } from './tab-analysis-plan.component';
import { SearchDocumentModule } from './components/search-document/search-document.module';

@NgModule({
  declarations: [TabAnalysisPlanComponent],
  imports: [
    CommonModule,
    LayoutSectionModule,
    InputAnalysisModule,
    TableTabMeetingsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MaterialModule,
    TableARItemsModule,
    ContainerRadioModule,
    MatSelectModule,
    MaterialModule,
    MatDatepickerModule,
    ButtonContinueModule,
    MatAutocompleteModule,
    SortAlphabeticalModule,
    MatChipsModule,
    ShowDateModule,
    VisualizationConversationModule,
    SearchDocumentModule

  ],
  exports: [TabAnalysisPlanComponent]
})

export class TabAnalysisPlanModule { }
