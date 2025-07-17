import { Component, OnInit, Inject, inject } from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';
import { toastConfig } from '../../interfaces/toastConfig';

@Component({
  selector: 'app-toast-notify',
  templateUrl: './toast-notify.component.html',
  styleUrls: ['./toast-notify.component.css'],
  
})
export class ToastNotifyComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: toastConfig,
  ) { }

  snackBarRef = inject(MatSnackBarRef);

  ngOnInit(): void {
  }

}
