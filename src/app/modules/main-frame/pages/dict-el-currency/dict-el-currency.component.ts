import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormCloseActions } from 'src/app/core/interfaces/form-close-actions';

import { DictCurrElementService } from 'src/app/core/services/dict-curr-element.service';
import { dictCurrElement } from 'src/app/shared/models/dict-curr-element';

@Component({
  selector: 'app-dict-el-currency',
  templateUrl: './dict-el-currency.component.html',
  styleUrls: ['./dict-el-currency.component.css'],
  host: {
    '(document:keydown)': 'keyEvent($event)'
  }
})
export class DictElCurrencyComponent implements OnInit, FormCloseActions {

  // formCurrElement: FormGroup = new FormGroup({
  //   number: new FormControl('', Validators.maxLength(11)),
  //   name: new FormControl('', Validators.maxLength(255)),
  //   code: new FormControl('', Validators.maxLength(3)),
  //   symbol: new FormControl('', Validators.maxLength(5))    
  // });

  currElement: dictCurrElement = {
    number: 0,
    name: '',
    code: '',
    symbol: ''
  };
  
  loadedCurrElement: dictCurrElement;
  errorMessage = '';
  
  constructor(private router: Router, private route: ActivatedRoute, private dictCurrElementService: DictCurrElementService) {
    this.route.paramMap.subscribe(() => { this.loadData(); });
  }
  
  ngOnInit(): void {
    //this.loadData();
  }

  keyEvent(event: KeyboardEvent){
    switch(event.key){
      case "Esc":
      case "Escape":
        this.close();
      break;
    }
  }

  loadData(): void {
    const baseId = this.route.parent.snapshot.paramMap.get('basename');
    const dictName = this.route.snapshot.url[0].path;
    const elId = this.route.snapshot.paramMap.get('id');
    const elIdNumber = parseInt(elId);
    
    if (elIdNumber){
      this.dictCurrElementService.getCurrElement(baseId, dictName, elIdNumber).subscribe(
        dictElement => {
          this.currElement = dictElement;
          this.loadedCurrElement = JSON.parse(JSON.stringify(dictElement));
        },
        err => {
          this.close();
        }
      );
    }
    
  }

  isDataChanged(): boolean {
    return JSON.stringify(this.currElement) !== JSON.stringify(this.loadedCurrElement);    
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

    this.dictCurrElementService.updateElement(baseId, dictName, elIdNumber, this.currElement).subscribe(
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

    this.dictCurrElementService.addNewElement(baseId, dictName, this.currElement).subscribe(
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
