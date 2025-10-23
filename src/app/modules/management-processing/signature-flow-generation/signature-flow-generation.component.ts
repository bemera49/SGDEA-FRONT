// HU-FRM-001 Generación de flujo de firma
// ts
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { HttpResponse } from "@angular/common/http";
import { tableHeaders } from "./utils/table-headers";
import { data } from "./utils/table-headers";
import { catchError, forkJoin } from "rxjs";
import { SigninService } from "../signin.service";
import { ModalService } from "@app/services/modal/modal.service";
import { MatTabChangeEvent } from "@angular/material/tabs";
import { ActivatedRoute, Router } from "@angular/router";
import { FlowVisualizationModalComponent } from "./flow-visualization-modal/flow-visualization-modal.component";
import { FlowForeignUserViewModalComponent } from "./flow-foreign-user-view-modal/flow-foreign-user-view-modal.component";
import { FlowForeignUserModalComponent } from "./flow-foreign-user-modal/flow-foreign-user-modal.component";
import { RestService } from "@app/services/rest.service";
import { ToastService } from "@app/services/toast/toast.service";
@Component({
  selector: "app-signature-flow-generation",
  templateUrl: "./signature-flow-generation.component.html",
  styleUrls: ["./signature-flow-generation.component.css"],
})
export class SignatureFlowGenerationComponent implements OnInit {
  breadcrumbOn = [
    { name: "Gestión y trámite", route: "/managementProcessing" },
  ];
  breadcrumbRouteActive = "Generación de flujo de firma";

  public data = null;
  public headers = tableHeaders;
  public userData = this.rest$.getUserData();
  public minimunDate = this.formatDateForInput(new Date());
  public currentID = this.activatedRoute.snapshot.params["id"];
  formUsuarioExterno = new FormGroup({
    identificacionUsuarioExterno: new FormControl("", [
      Validators.pattern("^[0-9]+$"),
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  submitUsuarioExterno() {
    if (this.form.get("tipoFirma").value && this.formUsuarioExterno.valid) {
      this.rest$
        .get(
          `api/flujo/usuarios/externos/busqueda?identificacion=${this.formUsuarioExterno.get("identificacionUsuarioExterno").value}`,
        )
        .pipe(
          catchError((err) => {
            console.error(err);
            throw new Error();
          }),
        )
        .subscribe((response: any) => {
          if (response === null) {
            this.modal.openAction(
              "Usuario no encontrado",
              "Usuario no encontrado. ¿Desea registrarlo?",
              () => {
                this.modal.open(FlowForeignUserModalComponent, {
                  userCI: this.formUsuarioExterno.get(
                    "identificacionUsuarioExterno",
                  )?.value,
                });
              },
            );
          } else {
            this.toast.open({
              title: "Usuario encontrado",
              description: "Usuario externo encontrado exitosamente",
              success: true,
              duration: 3000,
            });

            this.modal.open(FlowForeignUserViewModalComponent, {
              userData: response,
              method: () => {
                this.sendForeignUser(response);
                this.toast.open({
                  title: "Envio exitoso",
                  success: true,
                  duration: 2000,
                });
              },
            });
          }
        });
    } else {
      this.toast.open({
        title: "Número de identificación inválido",
        success: false,
        duration: 2000,
      });
    }
  }

  sendForeignUser(response: any) {
    const { tipoFirma, rol } = this.form.getRawValue();
    this.registros = this.signinService.getValue();
    const index = this.signinService.getValueTabIndex();
    console.log(index);
    const body = {
      nombreUsuario: response[0].nombre,
      tipoUsuario: "Externo",
      actividad: (rol as any).nombre,
      dependencia: "No posee",
      ordenFirma: 0,
      tipoFirma: (tipoFirma as any).nombre,
      idTipoFirma: (tipoFirma as any).id,
      user_externos_id: response[0].id,
      participante_id: (rol as any).id,
    };

    console.log(body);

    this.registros[index].push([body]);
    this.signinService.setValue(this.registros);
  }

  formFecha = this.fb.group({
    asunto: [
      {
        value: null,
        disabled: true,
      },
      Validators.required,
    ],
    proyector: [
      {
        value: null,
        disabled: true,
      },
      Validators.required,
    ],
    fechaLimite: [this.formatDateForInput(new Date()), Validators.required],
  });

  formatDateForInput(date: Date): string {
    const pad = (n: number) => (n < 10 ? "0" + n : n);
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1); // getMonth() es 0-indexed, por lo que sumamos 1
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    // Formato requerido por el input datetime-local: YYYY-MM-DDTHH:MM
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  form = this.fb.group({
    tipoUsuario: [
      {
        value: {},
      },
      Validators.required,
    ],
    tipoFirma: [
      {
        value: "",
        disabled: true,
      },
      Validators.required,
    ],
    rol: [
      {
        value: null,
        disabled: true,
      },
      Validators.required,
    ],
    usuario: ["", Validators.required],
    ordenFirma: [1, Validators.required],
  });

  public goBack() {
    this.modal.openAction(
      "Confirmación",
      "¿Está seguro que desea cancelar el flujo de firma en curso?",
      () => {
        this.router.navigate([
          `/pqrs/pqrs-view/${this.activatedRoute.snapshot.params["id"]}`,
        ]);
      },
    );
  }

  public object = {
    n: "",
    nombreDeUsuario: "",
    tipoDeUsuario: "",
    actividad: "",
    dependencia: "",
    estado: "",
    nOrdenDeFirma: "",
    tipoDeOrden: "",
    tipoDeFirma: "",
    fechaDeFirma: "",
  };

  public revisordataConfig = {
    headers: tableHeaders,
  };

  listTypeUs = [
    {
      nombre: "Interno",
      id: 1,
    },
    {
      nombre: "Externo",
      id: 2,
    },
  ];

  public registros = this.signinService.getValue();

  lisTypeFirma;
  listRoles;
  listUsers;
  allUsers;
  listOrdFirma;

  public isUsuarioExterno = false;

  dataConfig: any = "";

  constructor(
    private fb: FormBuilder,
    public signinService: SigninService,
    public modal: ModalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public rest$: RestService,
    public toast: ToastService,
  ) {}

  selectedTabIndex = new FormControl(0);

  onTabChanged(event: MatTabChangeEvent): void {
    // Actualiza el índice seleccionado si es necesario
    this.selectedTabIndex.setValue(event.index);
    this.signinService.setValueTabIndex(event.index);
  }

  addValidation = false;

  get selectedIndex(): number {
    return this.selectedTabIndex.value;
  }

  set selectedIndex(index: number) {
    this.selectedTabIndex.setValue(index);
  }

  isStepReady() {
    return this.signinService.getValue()[2].length > 0;
  }

  flattenNestedArrays(arrayOfArrays: any[][][]): any[] {
    return arrayOfArrays.reduce((acc, subarray) => {
      return acc.concat(...subarray);
    }, []);
  }

  parseDate(date$: string) {
    const fechaConEspacio = date$.replace("T", " ");
    const fechaFinal = fechaConEspacio + ":00";

    return fechaFinal;
  }

  public areAllSubarraysEmpty(arrays: any[][]): boolean {
    return arrays.some((subarray) => subarray.length > 0);
  }
  crearFlujo() {
    let data = this.signinService.getValue();

    console.log(data);

    const userData = this.rest$.getUserData();

    if (!this.areAllSubarraysEmpty(data)) {
      this.modal.openNotify(
        "",
        "No hay usuarios registrados para proceder con el flujo de firma",
        false,
      );
    } else {
      const flatteredData = this.flattenNestedArrays(data);
      console.log("Data aplanada", flatteredData);

      const body = flatteredData.map((item) => {
        const result = {
          cg_tipo_firma_id: item.idTipoFirma,
          sgc_participante_id: item.participante_id,
          cg_estado_flujo_id: 1,
          posicion: item.ordenFirma,
          coordenada: '{"x": 0, "y": 0}',
          fecha_maxima_firma: this.parseDate(
            this.formFecha.get("fechaLimite")?.value,
          ),
        };

        if (item.tipoUsuario === "Interno") {
          result["user_id"] = item.user_id;
        } else if (item.tipoUsuario === "Externo") {
          result["user_externos_id"] = item.user_externos_id;
        }
        return result;
      });

      console.log("Data final", body);

      return this.rest$
        .post(
          `api/flujo/radicado/guardar/${this.currentID}/${userData.idDataCliente}/${userData.dependencia.idGdTrdDependencia}`,
          body,
        )
        .pipe(
          catchError((err) => {
            this.modal.openNotify(
              "Error",
              "Ha ocurrido un error durante la creacion del flujo de firma. Por favor intentelo de nuevo",
              false,
            );
            console.error(err);
            throw new Error(err);
          }),
        );
    }
  }

  getAllData() {
    return forkJoin([
      this.signinService.getEstados(),
      this.signinService.getParticipantes(),
      this.signinService.getTiposFirma(),
    ]).pipe(
      catchError((err) => {
        console.error(err);
        this.modal
          .openNotify("", "Error en el fetch inicial", false)
          .afterClosed()
          .subscribe((res) => this.router.navigate(["/signin"]));
        throw new Error();
      }),
    );
  }

  setCurrentIndex() {}

  submit(index) {
    if (this.form.valid) {
      const { tipoFirma, rol, tipoUsuario, usuario } = this.form.getRawValue();

      this.registros = this.signinService.getValue();

      this.registros[index].push([
        {
          nombreUsuario:
            (usuario as any).user_detalle.nombreUserDetalles +
            " " +
            (usuario as any).user_detalle.apellidoUserDetalles,
          tipoUsuario: (tipoUsuario as any).nombre,
          actividad: (rol as any).nombre,
          dependencia: (usuario as any).dependencia.nombreGdTrdDependencia,
          ordenFirma: this.registros[this.selectedTabIndex.value].length + 1,
          idTipoFirma: (tipoFirma as any).id,
          tipoFirma: (tipoFirma as any).nombre,
          user_id: (usuario as any).id,
          participante_id: (rol as any).id,
        },
      ]);

      this.signinService.setValue(this.registros);

      this.resetForm();

      if (this.isStepReady()) {
        this.form.get("usuario").clearValidators();
      }
    } else {
      this.modal.openNotify(
        "",
        "Diligencia todos los campos obligatorios",
        false,
      );
    }
  }

  visualize() {
    this.modal.open(FlowVisualizationModalComponent, {
      revisores: this.signinService.plainSubArray(0),
      aprobadores: this.signinService.plainSubArray(1),
      aprobadoresFirmantes: this.signinService.plainSubArray(2),
    });
  }

  resetForm() {
    this.form.get("usuario").reset();
  }

  submitForm() {
    if (this.isStepReady()) {
      this.modal.openAction("¿Está seguro de la accion a realizar?", "", () => {
        this.crearFlujo().subscribe((response) => {
          this.modal
            .openNotify("Exito", "Flujo de firma creado exitosamente", true)
            .afterClosed()
            .subscribe((closed) => this.router.navigate(["/signin"]));
        });
      });
      return;
    }
    this.modal.openNotify(
      "",
      "Agregue todos los usuarios necesarios para el flujo de firma",
      false,
    );

    // if(this.isStepReady()  ) {
    //   this.signinService.setValue(this.registros)
    //   this.signinService.setData({
    //     fechaLimite: this.formFecha.get('fechaLimite').value,
    //     asunto: this.formFecha.get('asunto')?.value,
    //     proyector: this.userData.nombre

    //   })
    //   this.router.navigate(['/signin/create/' + this.activatedRoute.snapshot.params['id'] + '/document'])

    // } else {
    //   this.modal.openNotify('', 'Agregue todos los usuarios necesarios para el flujo de firma', false)
    // }
  }
  ngOnInit(): void {
    // Escuchamos los cambios de los registros en el servicio para actualizar

    this.data = [
      this.signinService.plainSubArray(0),
      this.signinService.plainSubArray(1),
      this.signinService.plainSubArray(2),
    ];

    this.signinService.registrosUsuarios$.subscribe((newUsers) => {
      this.registros = newUsers;
    });

    this.form
      .get("tipoUsuario")
      .valueChanges.subscribe((response: { nombre: any; id: number }) => {
        let control = this.form.get("usuario");

        if (response.id !== 1) {
          control?.setValue("");
          control.disable();
          this.addValidation = true;
          return;
        }

        control.enable();
        this.addValidation = false;
      });

    // Esto para recordar los valores del primer formulario. Asi cuando avanzas al segundo y regresas al primero, tendrás los datos cargados
    const value = this.signinService.getValue();
    if (value && value.length > 0) {
      this.registros = value;
    }

    // Se hacen todas las peticiones iniciales para alimentar los select de las maquetas
    this.getAllData().subscribe(
      ([respuestaEstado, respuestaParticipantes, respuestaTiposFirmas]) => {
        this.lisTypeFirma = respuestaTiposFirmas;
        this.form.get("tipoFirma").setValue(this.lisTypeFirma[0]);
        this.listRoles = respuestaParticipantes;

        this.form
          .get("rol")
          .setValue(this.listRoles[this.selectedTabIndex.value]);

        // Logica para mantener que siempre el tipo de firma sea electronica mientras no sea un usuario interno aprobador y firmante
        this.form.get("rol")?.valueChanges.subscribe((newId) => {
          if (newId.id !== 3) {
            this.form.get("tipoFirma").disable();
            this.form.get("tipoFirma").setValue(this.lisTypeFirma[0]);
          } else {
            this.form.get("tipoFirma").enable();
          }
        });

        // Logica para que el usuario externo siempre tenga tipo de firma electronica

        //this.form.get('tipoUsuario')?.setValue(this.listTypeUs[0])
        this.form
          .get("tipoUsuario")
          ?.valueChanges.subscribe((newValue: any) => {
            if (newValue.id !== 1) {
              this.form.get("tipoFirma").setValue(this.lisTypeFirma[0]);
              this.form.get("tipoFirma").disable();
            }
          });

        // .

        this.formFecha
          .get("proyector")
          .setValue(this.rest$.getUserData().nombre);

        this.signinService
          .getUsuarios(`${this.selectedTabIndex.value + 1}`)
          .subscribe((response: any) => {
            // const nombresExistentes = this.signinService.userNamesOfCurrentGroup()
            this.allUsers = response;
            this.listUsers = response;
          });
      },
    );

    // Aqui filtramos los usuarios de la lista de usuarios para que no se repitan sin haber cambiado la tab

    this.signinService.registrosUsuarios$.subscribe((newValue) => {
      const nombresExistentes = this.signinService.userNamesOfCurrentGroup();
      this.listUsers = this.allUsers?.filter(
        (user: any) =>
          !nombresExistentes?.includes(user?.user_detalle.full_name),
      );
    });

    // Aqui actualizamos el campo de rol cada vez que cambia el index de la tab y filtramos los datos cada vez que cambia la tab

    this.selectedTabIndex.valueChanges.subscribe((value: any) => {
      this.form.get("usuario").setValue("");
      this.signinService.getUsuarios(value + 1).subscribe((response: any) => {
        this.listUsers = response;

        let collection = this.signinService.getValue()[value];
      });
      this.form.get("rol").setValue(this.listRoles[value]);
    });

    this.form.get("tipoUsuario").valueChanges.subscribe((newValue: any) => {
      if (newValue.id == 2) {
        this.isUsuarioExterno = true;
      } else {
        this.isUsuarioExterno = false;
        this.form.get("usuario").enable();
      }
    });
  }

  public isError(
    FormGroup: FormGroup,
    controlName: string,
    errorName: string,
  ): boolean {
    const control = FormGroup.get(controlName) as FormControl;

    return control?.errors?.[errorName];
  }
}
