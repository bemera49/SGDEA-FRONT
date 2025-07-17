import { Component, Input, OnInit } from "@angular/core";

interface ICardConfig {
  title: string;
  number: number;
  icon: string;
  color: string;
  link: string;
  paragraph: string;
}

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"],
})
export class CardComponent implements OnInit {

  @Input() cardConfig: ICardConfig = {
    title: 'Mi titulo',
    number: 99,
    icon: "Mi icono",
    color: "#FF3566",
    link: "/reports",
    paragraph: "Parrafo para mi tarjeta",
  };

  constructor() {}

  ngOnInit(): void {}
}
