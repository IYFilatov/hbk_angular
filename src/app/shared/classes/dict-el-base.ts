import { ActivatedRoute, Router } from "@angular/router";

import { FormCloseActions } from "src/app/core/interfaces/form-close-actions";
import { DictElementService } from "src/app/core/services/dict-element.service";
import { dictElement } from "../models/dictionaries/dict-element";

export abstract class dictElBase implements FormCloseActions {

  curElement: dictElement = {
    number: 0,    
  };
  
  loadedElement: dictElement;
  errorMessage = '';
  
  constructor(protected router: Router, protected route: ActivatedRoute, protected dictElementService: DictElementService) {
    this.route.paramMap.subscribe(() => { this.loadData(); });
  }

  loadData(): void {
    const baseId = this.route.parent.snapshot.paramMap.get('basename');
    const dictName = this.route.snapshot.url[0].path;
    const elId = this.route.snapshot.paramMap.get('id');
    const elIdNumber = parseInt(elId);
    
    if (elIdNumber){
      this.dictElementService.getDictElement(baseId, dictName, elIdNumber).subscribe(
        dictElement => {
          const convEl = this.onLoadElement(dictElement);
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

  onAddNewElement(): dictElement {
    return this.onSendElement(this.curElement);
  }

  onUpdateElement(): dictElement {
    return this.onSendElement(this.curElement);
  }

  onSendElement(sendElement: dictElement): dictElement {
    return sendElement;
  }

  onLoadElement(incomeElement: dictElement):dictElement {
    return incomeElement;
  }

  updateElement(obj: dictElement): void {
    const baseId = this.route.parent.snapshot.paramMap.get('basename');
    const dictName = this.route.snapshot.url[0].path;
    const elId = this.route.snapshot.paramMap.get('id');
    const elIdNumber = parseInt(elId);

    this.dictElementService.updateElement(baseId, dictName, elIdNumber, obj).subscribe(
      dictElement => {
        this.errorMessage = '';
        this.close();
      },
      err => {
        this.errorMessage = ['element didn`t updated! ' , JSON.stringify(err)].join('\n');
      }
    );
  }

  addElement(obj: dictElement): void {
    const baseId = this.route.parent.snapshot.paramMap.get('basename');
    const dictName = this.route.snapshot.url[0].path;

    this.dictElementService.addNewElement(baseId, dictName, obj).subscribe(
      dictElement => {
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
    const dictName = this.route.snapshot.url[0].path;

    this.router.navigate([`/dict/${baseId}/${dictName}`])
  }

}