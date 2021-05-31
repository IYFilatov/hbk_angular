import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

import { DictJournalService } from 'src/app/core/services/dict-journal.service';
import { dictJournal } from 'src/app/shared/models/dictionaries/dict-journal';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { SnackBarMessageComponent } from 'src/app/shared/components/snack-bar-message/snack-bar-message.component';

import { JournalColumnConf } from 'src/app/core/interfaces/journal-column-conf';
import conf from '../../../../core/configs';

@Component({
  selector: 'app-dict-journal',
  templateUrl: './dict-journal.component.html',
  styleUrls: ['./dict-journal.component.css'],
  host: {
    '(document:keydown)': 'keyEvent($event)'
  }
})
export class DictJournalComponent implements OnInit {

  dictJournal: dictJournal;
  tableHeaders: JournalColumnConf[];
  displayedColumns: String[];
  tableData: Object[];
  selectedRow: number;
  
  constructor(private router: Router, private route: ActivatedRoute, private dictJournalService: DictJournalService, public dialog: MatDialog, private _snackBar: MatSnackBar) {
    this.route.paramMap.subscribe(params => { this.loadData(); });
  }

  ngOnInit(): void {
    //this.loadData();
  }

  loadData(): void {
    const baseId = this.route.parent.snapshot.paramMap.get('basename');
    const dictName = this.route.snapshot.paramMap.get('dictName');
    this.selectedRow = -1;

    this.dictJournalService.getDictJournal(baseId, dictName).subscribe(
        dicJournal => {
          let columnKeys: Array<String> = [];
          this.dictJournal = dicJournal;
          this.tableData = this.dictJournal.data;
          if (Array.isArray(this.tableData) && this.tableData.length > 0){
            columnKeys = Object.keys(this.tableData[0]);
          }

          this.applySettings(dictName, columnKeys);
        },
        err => {
          this.router.navigate([`/dict/${baseId}`])
        }
      );
  }

  applySettings(dictName: string, columnKeys: Array<String>){
    const params = conf[dictName];
    this.tableHeaders = columnKeys.reduce((acc, v, i) => {
      if (params && params.fields && params.fields.hasOwnProperty(v)){
        const fparm = params.fields[v]
        if (!fparm.hasOwnProperty("show") || fparm.show != false){
          acc.push({id: v, caption: params.fields[v].caption, classes: params.fields[v].classes});
        }
      } else {
        acc.push({id: v, caption: v});
      }
      return acc;
    }, [])

    this.displayedColumns = this.tableHeaders.map(col => col.id);
  }

  keyEvent(event: KeyboardEvent){
    switch(event.key){
      case 'Enter':
        this.openElement(this.selectedRow);
        break;
      case "Down":
      case "ArrowDown":
        this.arrowDown();
        break;
      case "Up":
      case "ArrowUp":
        this.arrowUp();
        break;
      case 'Delete':
        this.delSelected();
        break;
    }
  }

  arrowDown(){
    if (this.tableData && this.selectedRow < 0 && this.tableData.length > 0) {
      this.selectedRow = 0;
    } else if(this.tableData && this.selectedRow < this.tableData.length-1){
      this.selectedRow ++;
    }
  }

  arrowUp(){
    if (this.tableData && this.selectedRow < 0 && this.tableData.length > 0) {
      this.selectedRow = 0;
    } else if(this.selectedRow > 0){
      this.selectedRow --;
    }    
  }

  rowClick(rowIdx: number) {
    if (this.selectedRow == rowIdx){
      this.openElement(rowIdx);
    } else {
      this.selectedRow = rowIdx;
    }
    
  } 

  openElement(rowIdx: number) {
    if (this.tableData && rowIdx >= 0 && this.tableData.length >= rowIdx) {
      const num = this.tableData[rowIdx]["number"];
      if (num && num > 0){
        this.router.navigate([num], {relativeTo: this.route});
      }
    }
  } 

  delSelected(){
    if (this.selectedRow >= 0) {
      this.delElement(this.selectedRow);      
    } else {
      this._snackBar.openFromComponent(SnackBarMessageComponent, { data: `Select element to proceed...`, duration: 1500, });
    }
  }  

  delElement(rowIdx: number, customMsg: string = ''){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {});
    const num = this.tableData[rowIdx]['number'];
    dialogRef.componentInstance.dialogTitle = 'Delete element'
    dialogRef.componentInstance.confirmMessage = customMsg ? customMsg : `Are you sure you want to delete element number "${num}"?`;
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const baseId = this.route.parent.snapshot.paramMap.get('basename');
        const dictName = this.route.snapshot.paramMap.get('dictName');

        this.dictJournalService.deleteElement(baseId, dictName, num).subscribe(
          (answ) => {
            this._snackBar.openFromComponent(SnackBarMessageComponent, { data: 'Element successfully deleted'});
            this.loadData();
          },
          (err) => {
            const errMessage: string = err?.error?.errorMessage;
            const isUsed: boolean = errMessage.endsWith('already in use!');
            if (isUsed) {
              this._snackBar.openFromComponent(SnackBarMessageComponent, { data: 'Element already in use and can`t be deleted'});
              this.markAsDeleted(rowIdx, `Element already in use, mark as deleted?`);
            }
          }
        );
      }
    });
  }

  markAsDeleted(rowIdx: number, customMsg: string = ''){
    const num = this.tableData[rowIdx]['number'];
    const delMarkSetted = this.tableData[rowIdx]['delmark'];
    if (!delMarkSetted) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {});
      dialogRef.componentInstance.dialogTitle = 'Set delete mark'
      dialogRef.componentInstance.confirmMessage = customMsg ? customMsg : `Are you sure you want to mark as deleted element number "${num}" ?`;
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          const baseId = this.route.parent.snapshot.paramMap.get('basename');
          const dictName = this.route.snapshot.paramMap.get('dictName');

          this.dictJournalService.markAsDeleted(baseId, dictName, num).subscribe(
            (answ) => {
              this.loadData();
            },
            (err) => {
              this._snackBar.openFromComponent(SnackBarMessageComponent, { data: `Something goes wrong. Element not marked, please try again.`});
              //console.log(`error on delete ${num}: ${JSON.stringify(err)}`);
            }
          );
        }
      });
    }
  }

  isRowSelected(rowIdx: number) {
    return this.selectedRow == rowIdx;
  }

}
