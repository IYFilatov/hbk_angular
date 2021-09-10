import { ActivatedRoute, Router } from "@angular/router";

import { FormCloseActions } from "src/app/core/interfaces/form-close-actions";
import { DocElementService } from "src/app/core/services/doc-element.service";
import { docElement } from "../models/documents/doc-element";

export abstract class docElBase implements FormCloseActions {

  curElement: docElement = {
    number: 0,
    delmark: false,
    posted: false,
    date: new Date()
  };
  
  loadedElement: docElement;
  errorMessage = '';
  
  constructor(protected router: Router, protected route: ActivatedRoute, protected docElementService: DocElementService) {
    this.route.paramMap.subscribe(() => { this.loadData(); });
  }

  loadData(): void {
    const baseId = this.route.parent.snapshot.paramMap.get('basename');
    const docName = this.route.snapshot.url[0].path;
    const elId = this.route.snapshot.paramMap.get('id');
    const elIdNumber = parseInt(elId);
    
    if (elIdNumber){
      this.docElementService.getDocElement(baseId, docName, elIdNumber).subscribe(
        docElement => {
          const convEl = this.onLoadElement(docElement);
          this.curElement = convEl;
          this.loadedElement = JSON.parse(JSON.stringify(convEl));
        },
        err => {
          this.close();
        }
      );
    }
  }

  isDataChanged(): boolean {
    return JSON.stringify(this.curElement) !== JSON.stringify(this.loadedElement);    
  }

  acceptChanges(): void {
    const elId = this.route.snapshot.paramMap.get('id');
    
    
    if (elId=='new'){
      const objNew = this.onAddNewElement();
      this.addElement(objNew);
    } else {
      const objUpd = this.onUpdateElement();
      this.updateElement(objUpd);
    }    
  }

  onAddNewElement(): docElement {
    return this.onSendElement(this.curElement);
  }

  onUpdateElement(): docElement {
    return this.onSendElement(this.curElement);
  }

  onSendElement(sendElement: docElement): docElement {
    return sendElement;
  }

  onLoadElement(incomeElement: docElement):docElement {
    return incomeElement;
  }

  updateElement(obj: docElement): void {
    const baseId = this.route.parent.snapshot.paramMap.get('basename');
    const docName = this.route.snapshot.url[0].path;
    const elId = this.route.snapshot.paramMap.get('id');
    const elIdNumber = parseInt(elId);

    this.docElementService.updateElement(baseId, docName, elIdNumber, obj).subscribe(
      docElement => {
        this.errorMessage = '';
        this.close();
      },
      err => {
        this.errorMessage = ['element didn`t updated! ' , JSON.stringify(err)].join('\n');
      }
    );
  }

  addElement(obj: docElement): void {
    const baseId = this.route.parent.snapshot.paramMap.get('basename');
    const docName = this.route.snapshot.url[0].path;

    this.docElementService.addNewElement(baseId, docName, obj).subscribe(
      docElement => {
        this.errorMessage = '';
        this.close();
      },
      err => {
        this.errorMessage = ['element didn`t saved! ' , JSON.stringify(err)].join('\n');
      }
    );
  }

  okClose(): void {
    if (this.isDataChanged()){
      this.acceptChanges();
    } else {
      this.close();
    }
  }

  cancel(): void {
    this.close();
  }

  close(): void {
    const baseId = this.route.parent.snapshot.paramMap.get('basename');
    const docName = this.route.snapshot.url[0].path;

    this.router.navigate([`/doc/${baseId}/${docName}`])
  }

}