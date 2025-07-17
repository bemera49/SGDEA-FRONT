import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { SubprocessDetail } from '@app/services/quality-details/Interfaces/detailsConfig';
import { InterceptorDataService } from '../../services/interceptor-data/interceptor-data.service';
import { SubProcessService } from '../../services/sub-process/sub-process.service';
import { Tree, TreeDocument } from './services/tree-process/interface/tree-process';
import { TreeProcessService } from './services/tree-process/tree-process.service';

@Component({
  selector: 'app-tree-process',
  templateUrl: './tree-process.component.html',
  styleUrls: ['./tree-process.component.css']
})
export class TreeProcessComponent implements OnChanges {

  private tps$ = inject(TreeProcessService);
  private ids$ = inject(InterceptorDataService);
  
  @Input() subProcess: SubprocessDetail[] = [];
  @Output() showDescription = new EventEmitter<void>()

  ngOnChanges(changes: SimpleChanges): void {
    this.tps$.setAdapter(this.subProcess);

  }


  onToggleExpendSubProcess(ItemTree: Tree): void {

    let index = this.tps$.getTree().indexOf(ItemTree);

    if (index === -1) {
      this.tps$.setTree([]);
    }

    if (index !== -1) {
      const tree = this.tps$.getTree();
      const newItemsTree = tree.map((items, indexTree) => ({
        ...items,
        expanded: index === indexTree ? !items.expanded : false
      }))


      this.tps$.setTree(newItemsTree);
      const SUB_PROCESS = this.returnSubProcessId(ItemTree.subProcess.id);
      this.ids$.setInterceptor('sub-process', SUB_PROCESS);
      this.showDescription.emit();
    }

  }


  returnSubProcessId(id: number): SubprocessDetail {
    return this.subProcess.find(sub => sub.id === id);
  }


  onToggleExpendDocuments(itemTree: Tree, documentTree: TreeDocument): void {

    let index = itemTree.subProcess.documents.indexOf(documentTree);

    if (index !== -1) {

      const newDocument = itemTree.subProcess.documents.map((items, indexDocs) => ({
        ...items,
        expanded: index === indexDocs ? !items.expanded : false
      }))


      const indexTree = this.getTreeData().indexOf(itemTree);
      const tree = this.getTreeData();
      tree[indexTree].subProcess.documents = newDocument;
      this.tps$.setTree(tree);
      const file = newDocument[index].documents.files[0];


      /* this.sendDocumentary.emit(newDocument[index].documents.documental);
      const vision = newDocument[index].documents.files.find(file => file.extesion === 'vsdx');
      this.sendVision.emit(vision);
      this.sendFirstDocumentFile.emit(file); */

    }

  }



  getTreeData(): Tree[] {
    return this.tps$.getTree();
  }

}
