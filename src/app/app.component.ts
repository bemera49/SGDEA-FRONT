/**

 */

import { Component, OnInit, inject } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { Subscription } from "rxjs/internal/Subscription";
import { filter } from "rxjs/operators";
import { routes } from "src/assets/routes";
import { RestService } from "./services/rest.service";
@Component({
  selector: "app-my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  _router: Subscription;
  // Autentificacion
  authorization: string;
  dataUser: any;
  dataLogin = null;
  routes = routes;
  restService = inject(RestService)

  hashLocalStorage: any;



  constructor(private router: Router) { }

  ngOnInit() {
    this._router = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const body = document.getElementsByTagName("body")[0];
        const modalBackdrop = document.getElementsByClassName("modal-backdrop")[0];
        if (body.classList.contains("modal-open")) {
          body.classList.remove("modal-open");
          modalBackdrop.remove();
        }
      });
  }
}
