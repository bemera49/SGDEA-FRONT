import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Interceptor } from '../../interface/interceptor-data';

@Component({
  selector: 'app-header-process',
  templateUrl: './header-process.component.html',
  styleUrls: ['./header-process.component.css']
})

export class HeaderProcessComponent implements OnChanges {

  @Input() dataIntercept: Interceptor;
  account_tree: string = 'account_tree';
  fullscreen: string = 'fullscreen'

  ngOnChanges(changes: SimpleChanges): void {
    console.log('dataIntercept', this.dataIntercept)
  }
} 
