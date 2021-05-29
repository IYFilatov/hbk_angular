import { parseI18nMeta } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DictJournalService } from 'src/app/core/services/dict-journal.service';
import { dictJournal } from 'src/app/shared/models/dict-journal';

import { JournalColumnConf } from 'src/app/core/interfaces/journal-column-conf';
import conf from '../../../../core/configs';

@Component({
  selector: 'app-dict-journal',
  templateUrl: './dict-journal.component.html',
  styleUrls: ['./dict-journal.component.css']
})
export class DictJournalComponent implements OnInit {

  dictJournal: dictJournal;
  tableHeaders: JournalColumnConf[];
  displayedColumns: String[];
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

  openElement(row: any) {
    this.router.navigate([row.number], {relativeTo: this.route});
  } 

}
