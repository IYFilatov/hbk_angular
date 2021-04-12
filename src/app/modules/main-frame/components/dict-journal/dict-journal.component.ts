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
    this.route.paramMap.subscribe(params => { this.ngOnInit(); });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    const baseId = this.route.parent.snapshot.paramMap.get('basename');
    const dictName = this.route.snapshot.paramMap.get('dictName');

    this.dictJournalService.getDictJournal(baseId, dictName).subscribe(
        dicJournal => {
          this.dictJournal = dicJournal;
          this.tableData = this.dictJournal.data;
          this.tableHeaders = Object.keys(this?.tableData[0]);
        },
        err => {
          //this.dictList = JSON.parse(err.error).message;
          this.router.navigate([`/dict/${baseId}`])
        }
      );
  }

}
