import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JoinPermissionsPipe } from './join-permissions.pipe';


@NgModule({
  declarations: [JoinPermissionsPipe],
  imports: [
    CommonModule
  ],
  exports: [JoinPermissionsPipe]
})
export class JoinPermissionsModule { }
