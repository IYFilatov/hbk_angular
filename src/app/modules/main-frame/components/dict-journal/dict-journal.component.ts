import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DictJournalService } from 'src/app/core/services/dict-journal.service';
import { dictJournal } from 'src/app/shared/models/dict-journal';

@Component({
  selector: 'app-dict-journal',
  templateUrl: './dict-journal.component.html',
  styleUrls: ['./dict-journal.component.css']
})
export class DictJournalComponent implements OnInit {

  dictJournal: dictJournal;
  tableHeaders: string[];
  tableData: Object[];
  
  constructor(private router: Router, private route: ActivatedRoute, private dictJournalService: DictJournalService) {
    this.route.paramMap.subscribe(params => { this.loadData(); });
  }

  ngOnInit(): void {
    //this.loadData();
  }

  loadData(): void {
    const baseId = this.route.parent.snapshot.paramMap.get('basename');
    const dictName = this.route.snapshot.paramMap.get('dictName');

    this.dictJournalService.getDictJournal(baseId, dictName).subscribe(
        dicJournal => {
          this.tableHeaders = [];
          this.dictJournal = dicJournal;
          this.tableData = this.dictJournal.data;          
          if (Array.isArray(this.tableData) && this.tableData.length > 0){
            this.tableHeaders = Object.keys(this.tableData[0]);
          }
        },
        err => {
          this.router.navigate([`/dict/${baseId}`])
        }
      );
  }

  openElement(row: any) {
    this.router.navigate([row.number], {relativeTo: this.route});
  } 

}
