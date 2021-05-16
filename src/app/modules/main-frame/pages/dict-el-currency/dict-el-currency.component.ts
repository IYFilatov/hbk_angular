import { Component, OnInit, ValueSansProvider } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormCloseActions } from 'src/app/core/interfaces/form-close-actions';

import { DictCurrElementService } from 'src/app/core/services/dict-curr-element.service';
import { dictCurrElement } from 'src/app/shared/models/dict-curr-element';

@Component({
  selector: 'app-dict-el-currency',
  templateUrl: './dict-el-currency.component.html',
  styleUrls: ['./dict-el-currency.component.css']
})
export class DictElCurrencyComponent implements OnInit, FormCloseActions {

  dictCurrElement: dictCurrElement = {
    number: 0,
    name: '',
    code: '',
    symbol: ''
  };
  
  constructor(private router: Router, private route: ActivatedRoute, private dictCurrElementService: DictCurrElementService) {
    this.route.paramMap.subscribe(() => { this.ngOnInit(); });
  }
  
  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    const baseId = this.route.parent.snapshot.paramMap.get('basename');
    const dictName = this.route.snapshot.url[0].path;
    const elId = parseInt(this.route.snapshot.paramMap.get('id'));

    this.dictCurrElementService.getCurrElement(baseId, dictName, elId).subscribe(
        dictElement => {
          this.dictCurrElement = dictElement;          
        },
        err => {
          this.close();
        }
      );
  }

  okClose(){
    this.acceptChanges();
    this.close();
  }

  cancel(){
    this.close();
  }

  acceptChanges(){
    alert('ok clicked');
  }

  close(){
    const baseId = this.route.parent.snapshot.paramMap.get('basename');
    const dictName = this.route.snapshot.url[0].path;

    this.router.navigate([`/dict/${baseId}/${dictName}`])
  }

}
