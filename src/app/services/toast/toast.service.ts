import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { ToastNotifyComponent } from './components/toast-notify/toast-notify.component';
import { toastConfig } from './interfaces/toastConfig';



@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private snackBack: MatSnackBar) { }

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  

  open(config: toastConfig) {
    this.snackBack.openFromComponent(ToastNotifyComponent, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: config.duration ?? 3000,
      data: config,
    })
  }
}
