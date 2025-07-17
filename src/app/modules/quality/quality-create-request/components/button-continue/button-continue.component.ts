import { Component, Input } from "@angular/core";

@Component({
  selector: "app-button-continue",
  templateUrl: "./button-continue.component.html",
  styleUrls: ["./button-continue.component.css"],
})
export class ButtonContinueComponent {
  @Input() text!: string;
  @Input() onDisabled!: boolean;

  refresh() {
    window.location.reload();
  }
}
