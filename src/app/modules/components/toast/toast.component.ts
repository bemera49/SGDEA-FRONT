import { Component, ElementRef, ViewChild } from "@angular/core";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { ToastService } from "src/app/services/toast.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-toast",
  templateUrl: "./toast.component.html",
  standalone: true,
  imports: [CommonModule],
  styleUrls: ["./toast.component.css"],
  animations: [
    trigger("openClose", [
      state(
        "closed",
        style({
          visibility: "hidden",
          right: "-400px",
        })
      ),
      state(
        "open",
        style({
          right: "40px",
        })
      ),
      transition("open <=> closed", [animate("0.5s ease-in-out")]),
    ]),
  ],
})
export class ToastComponent {
  @ViewChild("element", { static: false }) progressBar: ElementRef;
  progressInterval;

  constructor(public toastService: ToastService) {
    this.toastService.open.subscribe((data) => {
      if (data.show) {
        this.countDown();
      }
    });
  }

  countDown() {
    this.progressBar.nativeElement.style.width =
      this.toastService.data.progressWidth;

    this.progressInterval = setInterval(() => {
      const width = parseInt(this.progressBar.nativeElement.style.width, 10);

      if (width <= 0) {
        this.toastService.hide();
        clearInterval(this.progressInterval);
        return;
      }

      this.toastService.data.progressWidth = String(width - 2);
      this.progressBar.nativeElement.style.width =
        this.toastService.data.progressWidth + "%";
    }, 150);
  }

  stopCountDown() {
    clearInterval(this.progressInterval);
  }
}
