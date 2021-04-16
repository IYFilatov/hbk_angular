import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DictCurrElementService } from 'src/app/core/services/dict-curr-element.service';
import { dictCurrElement } from 'src/app/shared/models/dict-curr-element';

@Component({
  selector: 'app-dict-el-currency',
  templateUrl: './dict-el-currency.component.html',
  styleUrls: ['./dict-el-currency.component.css']
})
export class DictElCurrencyComponent implements OnInit {

  dictCurrElement: dictCurrElement;
  
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
          this.router.navigate([`/dict/${baseId}/${dictName}`])
        }
      );
  }

}
