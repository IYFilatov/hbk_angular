import { ActivatedRoute, Router } from "@angular/router";

import { MatSnackBar } from "@angular/material/snack-bar";

import { FormCloseActions } from "src/app/core/interfaces/form-close-actions";
import { DocElementService } from "src/app/core/services/doc-element.service";
import { SnackBarMessageComponent } from "../components/snack-bar-message/snack-bar-message.component";
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
  
  constructor(protected router: Router, protected route: ActivatedRoute, protected docElementService: DocElementService, protected _snackBar: MatSnackBar) {
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
          this.onAfterLoadElement();
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

  acceptChanges(closeOnChange: boolean = true): void {
    const elId = this.route.snapshot.paramMap.get('id');    
    
    if (elId=='new'){
      const objNew = this.onAddNewElement();
      this.addElement(objNew, closeOnChange);
    } else {
      const objUpd = this.onUpdateElement();
      this.updateElement(objUpd, closeOnChange);
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

  onAfterLoadElement(){
    
  }

  updateElement(obj: docElement, closeOnChange: boolean = true): void {
    const baseId = this.route.parent.snapshot.paramMap.get('basename');
    const docName = this.route.snapshot.url[0].path;
    const elId = this.route.snapshot.paramMap.get('id');
    const elIdNumber = parseInt(elId);

    this.docElementService.updateElement(baseId, docName, elIdNumber, obj).subscribe(
      docElement => {
        this.errorMessage = '';
        if (closeOnChange){ 
          this.close(); 
        }
      },
      err => {
        this.errorMessage = ['element didn`t updated! ' , JSON.stringify(err)].join('\n');
      }
    );
  }

  addElement(obj: docElement, closeOnChange: boolean = true): void {
    const baseId = this.route.parent.snapshot.paramMap.get('basename');
    const docName = this.route.snapshot.url[0].path;

    this.docElementService.addNewElement(baseId, docName, obj).subscribe(
      docElement => {
        this.errorMessage = '';
        if (closeOnChange){ 
          this.close(); 
        }
      },
      err => {
        this.errorMessage = ['element didn`t saved! ' , JSON.stringify(err)].join('\n');
      }
    );
  }

  converToDate(v: any): Date {
    let ret: Date = null;
    if (v) {
      ret = new Date(v);
    }
    return ret;
  }

  okClose(): void {
    if (this.isDataChanged()){
      this.acceptChanges();
    } else {
      this.close();
    }
  }

  save(): void {
    if (this.isDataChanged()){
      this.acceptChanges(false);
    }
  }

  post(): void {
    this.changePostState('post');
  }

  unpost(): void {
    this.changePostState('unpost');
  }

  changePostState(state: string, closeOnChange: boolean = false){
    const baseId = this.route.parent.snapshot.paramMap.get('basename');
    const docName = this.route.snapshot.url[0].path;
    const elId = this.route.snapshot.paramMap.get('id');
    const elIdNumber = parseInt(elId);
    const stateText = state == 'post' ? 'posting' : 'unposting' ;
    
    if (state == 'post' || state == 'unpost'){
      this.docElementService.changePostState(baseId, docName, elIdNumber, state).subscribe(
        docElement => {
          this.errorMessage = '';
          this.successfulChangePostState(state, closeOnChange);
        },
        err => {
          this.errorMessage = [`element ${stateText} failed! ` , JSON.stringify(err)].join('\n');
        }
      );
    } else {
      this.errorMessage = ['wrong request!', ''].join('\n');
    }    
  }

  successfulChangePostState(state: string, closeOnChange: boolean){
    switch (state){
      case 'post': 
        this._snackBar.openFromComponent(SnackBarMessageComponent, { data: 'Element successfully posted'});
        this.curElement.posted = true;
        break;
      case 'unpost':
        this._snackBar.openFromComponent(SnackBarMessageComponent, { data: 'Element successfully unposted'});
        this.curElement.posted = false;
        break;
    }

    if (closeOnChange){ 
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