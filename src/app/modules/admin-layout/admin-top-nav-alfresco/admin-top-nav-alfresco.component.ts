import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from "rxjs/internal/Subscription";
import { RestService } from "../../../services/rest.service";
import { LocalStorageService } from "../../../services/local-storage.service";
import { Router } from "@angular/router";
import { GlobalAppService } from "../../../services/global-app.service";
import { TranslateService } from "@ngx-translate/core";
import { ActivateTranslateService } from "../../../services/activate-translate.service";
import { AuthService } from "../../../services/auth.service";
import PerfectScrollbar from "perfect-scrollbar";
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-admin-top-nav-alfresco',
  templateUrl: './admin-top-nav-alfresco.component.html',
  styleUrls: ['./admin-top-nav-alfresco.component.css']
})
export class AdminTopNavAlfrescoComponent implements OnInit {

  authorization: string; // Token de autorización
  responseMenuUser: any; // Respuesta del servicio
  localStorageMenu: any; // Menu guardado en el local storage
  disablesocket: boolean;

  @Input() subMenuStatus: boolean = true;
  @Input() subMenuTitle: string;
  @Input() subMenuActive: string;

  /** Respuesta del servicio de consulta de usuario en localStorage */
  userData: any = {
    username: "",
    data: [],
  };
  idRol: any;
  userName: string = "Usuario"; // Usuario Logueado
  userID: number; // Usuario Logueado
  rutaMiCuenta: string = "/users/users-update/";
  rutaMiCuentaCliente: string = "/customers/customers-update/";
  isMenuVisible: boolean = false;
  public menuItems: any[];
  isOpenDropdown: { [key: string]: boolean } = {};
  openSubMenuIndex: number | null = null;

  ps: any;

  responseJsonSubMenus: any;
  subMenuCols = [];

  /** Retorno de servicio que contiene las operaciones disponibles para el usuario */
  responseServiceSubMenu: any;
  dataOperacionesJson: any;

  /** Variables de internacionalización */
  activeLang: string;
  languageReceive: any;

  /**
   * Variables de socket.io
   */
  resSocketOn: any;
  resSocketOnMulti: any;

  servicePrueba: any;

  subscriptionTranslateService$: Subscription;

  constructor(
    public restService: RestService,
    public lhs: LocalStorageService,
    private router: Router,
    public globalAppService: GlobalAppService,
    private translate: TranslateService,
    private activateTranslateService: ActivateTranslateService,
    private authService: AuthService,
  ) {
    /**
     * Idioma inical
     */
    this.detectLanguageInitial();
    this.disablesocket = true;
  }

  closeDropdowns() {
    Object.keys(this.isOpenDropdown).forEach(key => {
      this.isOpenDropdown[key] = false;
    });
  }

  toggleMenuVisibility() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  toggleSubMenu(index: number): void {
    if (this.openSubMenuIndex === index) {
      this.openSubMenuIndex = null;
    } else {
      this.openSubMenuIndex = index;
    }
  }

  selectSubItem(index: number): void {
    this.toggleMenuVisibility();
    this.openSubMenuIndex = index;
  }

  toggleDropdown(menuName: string): void {
    if (this.isOpenDropdown[menuName]) {
      this.closeDropdowns();
    } else {
      this.closeDropdowns();
      this.isOpenDropdown[menuName] = true;
    }
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  ngOnInit() {
    // Hace el llamado del token
    this.getTokenLS();
    this.getUserLS();

    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemSidebar = <HTMLElement>document.querySelector(".sidebar .sidebar-wrapper");
      this.ps = new PerfectScrollbar(elemSidebar);
    }
    // Detectando si se ejecuta cambio de idioma
    this.detectLanguageChange();
  }

  setUserLocalStorage(data) {
    return new Promise<any>((resolve) => {
      if (data) {
        let dataUser = {
          data: data,
        };

        localStorage.setItem(environment.hashSgdea, this.authService.encryptAES(dataUser, false));

        this.getUserLSReload();
        // Asigna el menu al local storage
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  setMenuLocalStorage(data) {
    console.log(data)
    return new Promise<any>((resolve) => {
      if (data) {
        // Enviar el menu a la variable que se asigna del local storage
        this.localStorageMenu = data;
        // Asigna el menu al local storage
        localStorage.setItem(environment.hashMenu, this.authService.encryptAES(data, false));
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  updatePS(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      this.ps.update();
    }
  }
  isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf("MAC") >= 0 || navigator.platform.toUpperCase().indexOf("IPAD") >= 0) {
      bool = true;
    }
    return bool;
  }

  // Método para obtener el token que se encuentra encriptado en el local storage
  getTokenLS() {
    // Se consulta si el token se envió como input //
    this.lhs.getToken().then((res: string) => {
      this.authorization = res;
      // Asigna el menu guardado en el local storage
      this.localStorageMenu = this.authService.decryptAES(localStorage.getItem(environment.hashMenu));
      this.loadMenuUser();
    });
  }

  // Carga el menu principal de los módulos a los que se tiene aceso segun el usuario
  loadMenuUser() {
    this.menuItems = this.localStorageMenu.menu;
    console.log(this.menuItems)
    // this.subMenuActive = this.menuItems[0].ruta;
    // this.validateAuthOperacionesUser(this.subMenuActive);
    this.jsonSubMenu(this.localStorageMenu.operaciones, this.menuItems);
  }

  // Carga las operaciones a las que se tiene acceso como usuario
  validateAuthOperacionesUser(subMenuActive) {
    // Asigna las operaciones de los usarios que estan guardadas en el local storage
    this.jsonSubMenu(this.localStorageMenu.operaciones, subMenuActive);
  }

  /** Método para cerrar sesión */
  logout() {
    // Cierra sesión
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getUserLSReload() {
    this.lhs.getUser().then((res: any) => {
      this.userData = res;
      this.userID = this.userData.data[0];

      this.idRol = this.userData.idRol;

      /**
       * Eliminando cualquier subscribe para la escucha de roles expecificos
       */
      this.servicePrueba.unsubscribe();

      /**
       * Activando la escucha del socket para actualizar el menú del usuario por cambios en los perfiles
       */
      if (!this.disablesocket)
        this.socketOnRoom(this.idRol);
      /**
       * Fin Activando la escucha del socket para actualizar el menú del usuario por cambios en los perfiles
       */

      /** Definir ruta de mi cuenta del usuario logueado segun tipo de usuario */
      if (this.userData.idUserTipo == environment.tipoUsuario.Cliente) {
        this.rutaMiCuenta = this.rutaMiCuentaCliente + this.userData.idDataCliente;
      } else {
        this.setRutaMiCuenta(this.userID);
      }
      /** Fin Definir ruta de mi cuenta del usuario logueado segun tipo de usuario */
      /** Definir nombre a mostrat del usuario */
      if (this.userData.username == "") {
        this.userName = "Usuario";
      } else if (this.userData.username.length > 19) {
        this.userName = this.userData.username.substr(0, 19) + "...";
      } else {
        this.userName = this.userData.username;
      }
      /** Fin Definir nombre a mostrat del usuario */
    });
  }

  /** Método para obtener los datos del usuario que se encuentra encriptado en el local storage */
  getUserLS() {
    this.lhs.getUser().then((res: any) => {
      this.userData = res;
      this.userID = this.userData.data[0];
      this.idRol = this.userData.idRol;

      /**
       * Conectando el componente con el server de sockets y así que al usuario se le un nuevo socket.id
       */
      if (!this.disablesocket)
        // this.socketioService.socketConnect({ idUser: this.userData.idDataCliente });
        /**
         * Fin Conectando el componente con el server de sockets y así que al usuario se le un nuevo socket.id
         */

        /**
         * Activando la escucha del socket para actualizar el menú del usuario individual
         */

        /**
         * Fin Activando la escucha del socket para actualizar el menú del usuario individual
         */

        /**
         * Activando la escucha del socket para actualizar el menú del usuario por cambios en los perfiles
         */
        if (!this.disablesocket)
          this.socketOnRoom(this.idRol);
      /**
       * Fin Activando la escucha del socket para actualizar el menú del usuario por cambios en los perfiles
       */

      /** Definir ruta de mi cuenta del usuario logueado segun tipo de usuario */
      if (this.userData.idUserTipo == environment.tipoUsuario.Cliente) {
        this.rutaMiCuenta = this.rutaMiCuentaCliente + this.userData.idDataCliente;
      } else {
        this.setRutaMiCuenta(this.userID);
      }
      /** Fin Definir ruta de mi cuenta del usuario logueado segun tipo de usuario */
      /** Definir nombre a mostrat del usuario */

      if (this.userData.username == "") {
        this.userName = "Usuario";
      } else if (this.userData.username.length > 19) {
        this.userName = this.userData.username.substr(0, 19) + "...";
      } else {
        this.userName = this.userData.username;
      }
      /** Fin Definir nombre a mostrat del usuario */
    });
  }

  socketOnRoom(idRol) {
    /**
     * Activando la escucha del socket para actualizar el menú del usuario por cambios en los perfiles
     */

    /**
     * Fin Activando la escucha del socket para actualizar el menú del usuario por cambios en los perfiles
     */
  }

  /** Setear ruta de actualizacion de cuenta del usuario logueado */
  setRutaMiCuenta(userID) {
    this.rutaMiCuenta = this.rutaMiCuenta + this.userID;
  }

  // Método para obtener el submenu que se encuentra en el json
  jsonSubMenu(dataService, menuItem) {
    this.subMenuCols = [];

    this.globalAppService.subMenuGet().then((res) => {
      this.responseJsonSubMenus = res;
      menuItem.forEach((menuArr) => {
        let subMenus = [];
        let raizMenu = {};
        if (typeof this.responseJsonSubMenus[menuArr.ruta] != "undefined") {
          // Start Submenus
          this.responseJsonSubMenus[menuArr.ruta].forEach((element) => {
            dataService.forEach((elementService) => {
              if (element.operacion == elementService || menuArr.ruta + '%' + element.operacion == elementService) {
                subMenus.push(element);
              }
            });
            raizMenu[menuArr.ruta] = subMenus;
          });

          // Asigna el menu completo para que se muestre de manera por cada modulo
          //this.subMenuCols.push(subMenus);
          this.subMenuCols[menuArr.idModulo] = subMenus;
          // End Submenus
        } else {
          if (environment.production === false) {
            console.log("Registro de menú indefinido para la ruta: ");
            console.log(menuArr.ruta);
          }
        }
      });
    });
  }

  /** Métodos para el uso de la internacionalización */
  detectLanguageInitial() {
    if (localStorage.getItem("language")) {
      this.activeLang = localStorage.getItem("language");
    } else {
      this.activeLang = "es";
    }
    this.translate.setDefaultLang(this.activeLang);
  }

  detectLanguageChange() {
    this.subscriptionTranslateService$ = this.activateTranslateService.activateLanguageChange.subscribe((language) => {
      this.languageReceive = language;
      this.translate.setDefaultLang(this.languageReceive);
      // Toma los valores del local storage y consulta las operaciones
      this.localStorageMenu = this.authService.decryptAES(localStorage.getItem(environment.hashMenu));
      this.menuItems = this.localStorageMenu.menu;
      this.jsonSubMenu(this.localStorageMenu.operaciones, this.menuItems); // Recarga de submenu json
    });
  }

  changeLanguage(data) {
    this.activateTranslateService.activateTranslate(data);
    // Toma el hash del usuario para crear el room en el servidor
    let dataUser = this.authService.decryptAES(localStorage.getItem(environment.hashSgdea));
    let userId = dataUser.data.data;
    /**
     * Emit a cada usuario reportando el lenguaje
     */
  }
  /** Fin Métodos para el uso de la internacionalización */

  ngOnDestroy() {
    if (!!this.subscriptionTranslateService$) this.subscriptionTranslateService$.unsubscribe();
  }
}
