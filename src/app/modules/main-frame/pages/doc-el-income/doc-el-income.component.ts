import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { docElBase } from 'src/app/shared/classes/doc-el-base';
import { DocElementService } from 'src/app/core/services/doc-element.service';
import { docIncomeElement } from 'src/app/shared/models/documents/doc-income-element';

@Component({
  selector: 'app-doc-el-income',
  templateUrl: './doc-el-income.component.html',
  styleUrls: ['./doc-el-income.component.css']
})
export class DocElIncomeComponent extends docElBase implements OnInit {

  curElement: docIncomeElement = {
    delmark: false,
    posted: false,
    number: 0,
    date: new Date(),
    description: '',
    tableData: [{}]
  };
  
  loadedElement: docIncomeElement;
  tableData: Object[];
  displayedColumns: String[] = ['linenum', 'inctypenum', 'accnum', 'description', 'amount'];

  constructor(protected router: Router, protected route: ActivatedRoute, protected docElementService: DocElementService) {
    super(router, route, docElementService);
  }

  ngOnInit(): void {
  }

}
