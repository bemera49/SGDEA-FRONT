import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ActionModalComponent } from "./components/action-modal/action-modal.component";
import { DevolverSolicitudComponent } from "./components/pqrs/devolver-solicitud/devolver-solicitud.component";
import { GestionarTrasladoComponent } from "./components/pqrs/gestionar-traslado/gestionar-traslado.component";
import { NotifyModalComponent } from "./components/pqrs/notify-modal/notify-modal.component";
import { YesNoModalComponent } from "./components/yes-no-modal/yes-no-modal.component";
import { SweetAlertService } from "src/app/services/sweet-alert.service";
import { ActionTextareaModalComponent } from "./components/action-textarea-modal/action-textarea-modal.component";
import { Observable } from "rxjs";

export interface ModalConfig {
  title?: string;
  description?: string;
  void?: () => void;
  onConfirmAction?: () => void;
}

@Injectable({
  providedIn: "root",
})
export class ModalService {
  constructor(
    public dialog: MatDialog,
    private sweetAlertService: SweetAlertService,
  ) {}

  open<T>(
    component: new (...args: any[]) => T,
    data?: ModalConfig | any,
    width?: string,
  ): MatDialogRef<T> {
    const dialogRef = this.dialog.open(component, {
      width: width,
      disableClose: true,
      data: data,
    });

    return dialogRef;
  }

  //Modal exito o error
  openNotify(
    message: string,
    description: string,
    isSuccess: boolean,
  ): MatDialogRef<NotifyModalComponent> {
    const dialogRef = this.dialog.open(NotifyModalComponent, {
      data: {
        message: message,
        description: description,
        isSuccess: isSuccess,
      },
    });

    return dialogRef;
  }

  //Modal form devolver solicitud
  openDevolverSolicitud(
    title: string,
  ): MatDialogRef<DevolverSolicitudComponent> {
    const dialogRef = this.dialog.open(DevolverSolicitudComponent, {
      data: { title },
    });
    return dialogRef;
  }

  openModalGestionarTraslado(
    title: string,
  ): MatDialogRef<GestionarTrasladoComponent> {
    const dialogRef = this.dialog.open(GestionarTrasladoComponent, {
      data: { title },
    });
    return dialogRef;
  }

  //modal acciones aceptar - rechazar
  openActionTextArea(
    message: string,
    description: string,
    label: string,
    onConfirmAction?: () => void,
    disableClose: boolean = false,
  ): MatDialogRef<ActionTextareaModalComponent> {
    const dialogRef = this.dialog.open(ActionTextareaModalComponent, {
      disableClose: true,
      data: { message, description, label, onConfirmAction },
    });
    return dialogRef;
  }

  openAction(
    message: string,
    description: string,
    onConfirmAction?: () => void,
    disableClose: boolean = false,
  ): MatDialogRef<ActionModalComponent> {
    const dialogRef = this.dialog.open(ActionModalComponent, {
      disableClose: true,
      data: { message, description, onConfirmAction, void: () => {} },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "confirm") {
        onConfirmAction();
      } else {
        this.sweetAlertService.showNotification(
          "success",
          "Cancelación exitosa",
        );
      }
    });

    return dialogRef;
  }
  openYesNoAction(
    message: string,
    description: string,
    onConfirmAction?: () => void,
    disableClose: boolean = false,
  ): MatDialogRef<ActionModalComponent> {
    const dialogRef = this.dialog.open(YesNoModalComponent, {
      disableClose: true,
      data: { message, description, onConfirmAction },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "confirm") {
        console.log("RESULT DEL MODAL", result);
        onConfirmAction();
      }
    });

    return dialogRef;
  }
}
