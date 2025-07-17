import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentStepOneService {

  private currentStep$ = new BehaviorSubject<number>(1);

  setCurrentStep(value: number): void {
    this.currentStep$.next(value);
  }

  getCurrentStep(): number {
    return this.currentStep$.value;
  }
}
