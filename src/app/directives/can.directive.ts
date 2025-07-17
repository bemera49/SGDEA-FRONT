import { AfterViewInit, Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { RestService } from '@app/services/rest.service';
import { of } from 'rxjs';
@Directive({
  selector: '[can]',
  standalone: true,
})


export class CanDirective implements AfterViewInit {

  @Input('can') allowedRoles?: string[];


  constructor(
    private restService: RestService,
    private containerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
  ) {

  }


  ngAfterViewInit(): void {
    const permissionsCollection = of(this.restService.getUserData().operaciones);
    permissionsCollection.subscribe(response => {
      const namesCollection = response.map(item => item.nombreRolOperacion)
      if (this.allowedRoles === null || this.allowedRoles === undefined) {
        this.containerRef.createEmbeddedView(this.templateRef)
      } else {
        const validation = this.allowedRoles.some(rolName => namesCollection.includes(rolName))
        validation ? this.containerRef.createEmbeddedView(this.templateRef) : this.containerRef.clear();
      }
    })
  }

}