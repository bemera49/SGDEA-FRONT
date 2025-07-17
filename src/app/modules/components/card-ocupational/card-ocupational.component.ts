import { Component, Input, OnInit } from "@angular/core";

interface ICardConfig {
  title: string;
  icon: string;
  color: string;
  link: string;
}

@Component({
  selector: "app-card-ocupational",
  templateUrl: "./card-ocupational.component.html",
  styleUrls: ["./card-ocupational.component.css"],
})
export class CardOcupationalComponent implements OnInit {

  @Input() cardConfig: ICardConfig = {
    title: 'Mi titulo',
    icon: "Mi icono",
    color: "#FF3566",
    link: "/"
  };

  constructor() {}

  ngOnInit(): void {}
}
