import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QualityDetailsService } from '@app/services/quality-details/quality-details.service';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { InterceptorDataService } from './services/interceptor-data/interceptor-data.service';
import { ProcessService } from './services/process.service';

@Component({
  selector: 'app-quality-map-process',
  templateUrl: './quality-map-process.component.html',
  styleUrls: ['./quality-map-process.component.css']
})

export class QualityMapProcessComponent implements OnInit, OnDestroy {

  mostrarPantallaB: boolean = true;
  private router = inject(ActivatedRoute);
  private ps = inject(ProcessService);
  private qs = inject(QualityDetailsService);
  private destroy$ = new Subject<void>();
  private ids$ = inject(InterceptorDataService);

  ngOnInit(): void {
    this.router.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        return this.qs.getProcessDetailsById(id)
      }),
      takeUntil(this.destroy$)

    ).subscribe(res => {
      this.ps.setProcess(res);
      this.ids$.setInterceptor('process', res.data)
    })
  }

  togglePantallaB() {
    this.mostrarPantallaB = !this.mostrarPantallaB;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete()
  }
}
