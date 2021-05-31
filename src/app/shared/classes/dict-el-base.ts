import { ActivatedRoute, Router } from "@angular/router";

import { FormCloseActions } from "src/app/core/interfaces/form-close-actions";
import { DictElementService } from "src/app/core/services/dict-element.service";
import { dictElement } from "../models/dict-element";

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
          this.curElement = dictElement;
          this.loadedElement = JSON.parse(JSON.stringify(dictElement));
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
      this.addElement();
    } else {
      this.updateElement();
    }
    
  }

  updateElement(): void {
    const baseId = this.route.parent.snapshot.paramMap.get('basename');
    const dictName = this.route.snapshot.url[0].path;
    const elId = this.route.snapshot.paramMap.get('id');
    const elIdNumber = parseInt(elId);

    this.dictElementService.updateElement(baseId, dictName, elIdNumber, this.curElement).subscribe(
      dictElement => {
        this.errorMessage = '';
        this.close();
      },
      err => {
        this.errorMessage = ['element didn`t updated! ' , JSON.stringify(err)].join('\n');
      }
    );
  }

  addElement(): void {
    const baseId = this.route.parent.snapshot.paramMap.get('basename');
    const dictName = this.route.snapshot.url[0].path;

    this.dictElementService.addNewElement(baseId, dictName, this.curElement).subscribe(
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