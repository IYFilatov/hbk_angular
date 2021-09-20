import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';

import { docElBase } from 'src/app/shared/classes/doc-el-base';
import { DocElementService } from 'src/app/core/services/doc-element.service';
import { docExpensesElement } from 'src/app/shared/models/documents/doc-expenses-element';
import { docExpensesTableElement } from 'src/app/shared/models/documents/doc-expenses-table-element';
import { dictBankAccountElement } from 'src/app/shared/models/dictionaries/dict-BankAccount-element';
import { dictCostElement } from 'src/app/shared/models/dictionaries/dict-cost-element';

@Component({
  selector: 'app-doc-el-expenses',
  templateUrl: './doc-el-expenses.component.html',
  styleUrls: ['./doc-el-expenses.component.css']
})
export class DocElExpensesComponent extends docElBase implements OnInit {

  curElement: docExpensesElement = {
    delmark: false,
    posted: false,
    number: 0,
    date: new Date(),
    description: '',
    tableData: []
  };
  
  loadedElement: docExpensesElement;
  displayedColumns: String[] = ['select', 'linenum', 'costtypeobj', 'accnumObj', 'description', 'amount'];
  selection = new SelectionModel<docExpensesTableElement>(true, []);

  @ViewChild(MatTable) docTable: MatTable<docExpensesTableElement>;

  constructor(protected router: Router, protected route: ActivatedRoute, protected docElementService: DocElementService, protected _snackBar: MatSnackBar) {
    super(router, route, docElementService, _snackBar);
  }

  ngOnInit(): void {
  }

  onLoadElement(costsElement: docExpensesElement): docExpensesElement {
    costsElement.date = this.converToDate(costsElement.date);    

    return costsElement;
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

  checkboxLabel(row?: docExpensesTableElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.linenum + 1}`;
  }

  addLine() {
    const newRow: docExpensesTableElement = {
      linenum: this.curElement?.tableData?.length+1,
      costtypenum: null,
      accnum: null,
      description: '',
      amount: 0,
      costtypeObj: null,
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

  setCostElement(costEl: dictCostElement, parentElement: docExpensesTableElement){
    parentElement.costtypenum = costEl?.number || 0;
    parentElement.costtypeObj = costEl;
  }

  setBankAccElement(bankaccEl: dictBankAccountElement, parentElement: docExpensesTableElement){
    parentElement.accnum = bankaccEl?.number || 0;
    parentElement.bankaccObj = bankaccEl;    
  }

}
