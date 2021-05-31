import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { dictElBase } from 'src/app/shared/classes/dict-el-base';
import { DictElementService } from 'src/app/core/services/dict-element.service';
import { dictCostElement } from 'src/app/shared/models/dict-cost-element';


@Component({
  selector: 'app-dict-el-cost',
  templateUrl: './dict-el-cost.component.html',
  styleUrls: ['./dict-el-cost.component.css']
})
export class DictElCostComponent extends dictElBase implements OnInit {

  curElement: dictCostElement = {
    number: 0,
    name: '',
    description: ''
  };
  
  loadedElement: dictCostElement;

  constructor(protected router: Router, protected route: ActivatedRoute, protected dictElementService: DictElementService) {
    super(router, route, dictElementService);    
  }

  ngOnInit(): void {
  }

}
