import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { SnackBarMessageComponent } from 'src/app/shared/components/snack-bar-message/snack-bar-message.component';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { DocAnyJournalService } from 'src/app/core/services/doc-any-journal.service';
import { docJournal } from 'src/app/shared/models/documents/doc-journal';

import { JournalColumnConf } from 'src/app/core/interfaces/journal-column-conf';
import conf from '../../../../core/configs';

@Component({
  selector: 'app-doc-any-journal',
  templateUrl: './doc-any-journal.component.html',
  styleUrls: ['./doc-any-journal.component.css']
})
export class DocAnyJournalComponent implements OnInit {

  docJournal: docJournal;
  tableHeaders: JournalColumnConf[];
  displayedColumns: String[];
  tableData: Object[];
  selectedRow: number;

  constructor(private router: Router, private route: ActivatedRoute, private docJournalService: DocAnyJournalService, public dialog: MatDialog, private _snackBar: MatSnackBar) {
    this.route.paramMap.subscribe(params => { this.loadData(); });
  }

  ngOnInit(): void {
  }

  loadData(): void {
    const baseId = this.route.parent.snapshot.paramMap.get('basename');
    const docName = this.route.snapshot.paramMap.get('docName');
    this.selectedRow = -1;

    this.docJournalService.getDocJournal(baseId, docName).subscribe(
        docJournal => {
          let columnKeys: Array<String> = [];
          this.docJournal = docJournal;
          this.tableData = this.docJournal.data;
          if (Array.isArray(this.tableData) && this.tableData.length > 0){
            columnKeys = Object.keys(this.tableData[0]);
          }

          this.applySettings(docName, columnKeys);
        },
        err => {
          this.router.navigate([`/doc/${baseId}`])
        }
      );
  }

  applySettings(docName: string, columnKeys: Array<String>){
    const params = conf.documents[docName];
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
        const docName = this.route.snapshot.paramMap.get('docName');

        this.docJournalService.deleteElement(baseId, docName, num).subscribe(
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
          const docName = this.route.snapshot.paramMap.get('docName');

          this.docJournalService.markAsDeleted(baseId, docName, num).subscribe(
            (answ) => {
              this.loadData();
            },
            (err) => {
              this._snackBar.openFromComponent(SnackBarMessageComponent, { data: `Something goes wrong. Element not marked, please try again.`});              
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
