import { Component, Input, OnInit } from "@angular/core";

interface ICardConfig {
  title: string;
  icon: string;
  color: string;
  link: string;
}

@Component({
  selector: "app-card-quality",
  templateUrl: "./card-quality.component.html",
  styleUrls: ["./card-quality.component.css"],
})
export class CardQualityComponent implements OnInit {

  @Input() cardConfig: ICardConfig = {
    title: 'Mi titulo',
    icon: "Mi icono",
    color: "#FF3566",
    link: "/"
  };

  constructor() {}

  ngOnInit(): void {}
}
