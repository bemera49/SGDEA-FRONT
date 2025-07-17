import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProcessData } from '@app/services/quality-details/Interfaces/detailsConfig';
import { Subscription } from 'rxjs';
import { InterceptorDataService } from '../../services/interceptor-data/interceptor-data.service';
import { ProcessService } from '../../services/process.service';
import { TreeProcessService } from '../tree-process/services/tree-process/tree-process.service';
import { CurrentStepOneService } from './services/current-step-one/current-step-one.service';

@Component({
  selector: 'app-screen-one',
  templateUrl: './screen-one.component.html',
  styleUrls: ['./screen-one.component.css']
})

export class ScreenOneComponent implements OnInit, OnDestroy {

  private ps$ = inject(ProcessService);
  private tps$ = inject(TreeProcessService);
  private cso$ = inject(CurrentStepOneService);
  private ids$ = inject(InterceptorDataService);

  process: ProcessData;
  process$: Subscription = undefined;
  showDescription: boolean = false;


  Info: string = 'info'
  circle: string = 'check'
  calendar: string = 'calendar_today'
  article: string = 'article'
  account_tree: string = 'account_tree'


  ngOnInit(): void {
    this.process$ = this.ps$.getProcess().subscribe(process => {
      this.process = process.data;
    })

  }

  toggleButtonDescription(): void {
    this.showDescription = !this.showDescription
    if (this.showDescription) {
      this.ids$.setInterceptor('sub-process', this.process.subprocess[0]);
      this.tps$.initItems();
    } else {
      this.ids$.setInterceptor('process', this.process);
    }
  }


  onshowDescription(): void {
    this.showDescription = false;
  }

  getCurrentStep(): number {
    return this.cso$.getCurrentStep();
  }

  ngOnDestroy(): void {
    this.process$?.unsubscribe();
  }

}
