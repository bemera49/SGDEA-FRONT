import { Injectable } from "@angular/core";
import { ToastService } from "../toast/toast.service";

@Injectable({
  providedIn: "root",
})
export class ValidateInternetService {
  private online: boolean = false;

  constructor(private toast: ToastService) {}

  connect(): void {
    this.online = window.navigator.onLine;
  }

  checkConnection() {
    window.addEventListener("online", () => {
      this.online = true;
    });
    window.addEventListener("offline", () => {
      this.online = false;
    });
  }

  validateConnection(): boolean {
    if (!this.online) {
      this.toast.open({
        title: "022",
        description: "Conexión inestable",
      });
    }

    return this.online;
  }
}
