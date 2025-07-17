import { Component, Input } from "@angular/core";

@Component({
  selector: "app-button-back-arrow",
  templateUrl: "./button-back-arrow.component.html",
  styleUrls: ["./button-back-arrow.component.css"],
})
export class ButtonBackArrowComponent {
  @Input() href!: string;

}
