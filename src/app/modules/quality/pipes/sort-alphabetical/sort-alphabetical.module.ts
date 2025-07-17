import { NgModule } from '@angular/core';
import { SortAlphabeticalPipe } from './sort-alphabetical.pipe';


@NgModule({
  declarations: [SortAlphabeticalPipe],
  exports: [SortAlphabeticalPipe]
})
export class SortAlphabeticalModule { }
