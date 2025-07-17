/**

 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/**
 * Importación de componentes Generales
 */
import { DocumentaryLoansMainComponent } from './documentary-loans-main/documentary-loans-main.component';
// Apply for loan
import { DocLoansApplyForLoanIndexComponent } from './doc-loans-apply-for-loan-index/doc-loans-apply-for-loan-index.component';
// Manage loan
import { DocLoansManageLoanIndexComponent } from './doc-loans-manage-loan-index/doc-loans-manage-loan-index.component';
import { DocLoansHistoryLoanComponent } from './doc-loans-history-loan/doc-loans-history-loan.component';
import { DocLoansLoanOfFilesIndexComponent } from './doc-loans-of-files-index/doc-loans-loan-of-files-index.component';
import { DocLoansManageLoanOfFilesIndexComponent } from './doc-loans-manage-loan-of-files-index/doc-loans-manage-loan-of-files-index.component';

const routes: Routes = [

      // Apply for loan
      { path: 'apply-for-loan-index', component: DocLoansApplyForLoanIndexComponent },
      // Manage loan
      { path: 'manage-loan-index', component: DocLoansManageLoanIndexComponent },
      { path: 'history-loan/:id/:type', component: DocLoansHistoryLoanComponent },
      { path: 'loan-of-files', component: DocLoansLoanOfFilesIndexComponent },
      { path: 'manage-loan-of-files', component: DocLoansManageLoanOfFilesIndexComponent }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentaryLoansRoutingModule { }
