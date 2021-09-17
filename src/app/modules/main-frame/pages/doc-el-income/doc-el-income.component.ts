import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';

import { MatTable } from '@angular/material/table';

import { docElBase } from 'src/app/shared/classes/doc-el-base';
import { DocElementService } from 'src/app/core/services/doc-element.service';
import { docIncomeElement } from 'src/app/shared/models/documents/doc-income-element';
import { docIncomeTableElement } from 'src/app/shared/models/documents/doc-income--table-element';
import { dictIncomeElement } from 'src/app/shared/models/dictionaries/dict-income-element';

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
    tableData: []
  };
  
  loadedElement: docIncomeElement;
  displayedColumns: String[] = ['select', 'linenum', 'inctypeobj', 'accnum', 'description', 'amount'];
  selection = new SelectionModel<docIncomeTableElement>(true, []);

  @ViewChild(MatTable) docTable: MatTable<docIncomeTableElement>;

  constructor(protected router: Router, protected route: ActivatedRoute, protected docElementService: DocElementService) {
    super(router, route, docElementService);
  }

  ngOnInit(): void {
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.curElement?.tableData?.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.curElement?.tableData);
  }

  checkboxLabel(row?: docIncomeTableElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.linenum + 1}`;
  }

  addLine() {
    const newRow: docIncomeTableElement = {
      linenum: this.curElement?.tableData?.length+1,
      inctypenum: null,
      accnum: null,
      description: '',
      amount: 0,
      inctypeObj: null,
      bankaccObj: null
    };

    this.curElement?.tableData.push(newRow);
    this.docTable.renderRows();
  }

  removeLines() {
    this.curElement.tableData = this.curElement?.tableData.filter((v, i) => {
      return this.selection.selected.findIndex(el=>{ return el.linenum == v.linenum} ) == -1;
    });
    this.curElement.tableData.map((v, i) => {v.linenum = i+1});
    this.selection.clear();
    
    this.docTable.renderRows();
  }

  setIncomeElement(incomeEl: dictIncomeElement){
    //this.curElement.bankObj = incomeEl;
    //this.curElement.bankid = incomeEl?.number || 0;
  }

}
