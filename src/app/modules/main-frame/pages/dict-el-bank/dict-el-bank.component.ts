import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormCloseActions } from 'src/app/core/interfaces/form-close-actions';
import { DictElementService } from 'src/app/core/services/dict-element.service';
import { dictBankElement } from 'src/app/shared/models/dict-bank-element';

@Component({
  selector: 'app-dict-el-bank',
  templateUrl: './dict-el-bank.component.html',
  styleUrls: ['./dict-el-bank.component.css']
})
export class DictElBankComponent implements OnInit, FormCloseActions {

  bankElement: dictBankElement = {
    number: 0,
    name: '',
    code: '',    
    internalcode: '',
    phone: ''
  };
  
  loadedBankElement: dictBankElement;
  errorMessage = '';
  
  constructor(private router: Router, private route: ActivatedRoute, private dictElementService: DictElementService) {
    this.route.paramMap.subscribe(() => { this.loadData(); });
  }
  
  ngOnInit(): void {
    //this.loadData();
  }

  loadData(): void {
    const baseId = this.route.parent.snapshot.paramMap.get('basename');
    const dictName = this.route.snapshot.url[0].path;
    const elId = this.route.snapshot.paramMap.get('id');
    const elIdNumber = parseInt(elId);
    
    if (elIdNumber){
      this.dictElementService.getDictElement(baseId, dictName, elIdNumber).subscribe(
        dictElement => {
          this.bankElement = dictElement;
          this.loadedBankElement = JSON.parse(JSON.stringify(dictElement));
        },
        err => {
          this.close();
        }
      );
    }
    
  }

  isDataChanged(): boolean {
    return JSON.stringify(this.bankElement) !== JSON.stringify(this.loadedBankElement);    
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

    this.dictElementService.updateElement(baseId, dictName, elIdNumber, this.bankElement).subscribe(
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

    this.dictElementService.addNewElement(baseId, dictName, this.bankElement).subscribe(
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
