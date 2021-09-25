import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AotService } from '../../../../core/services/aot.service';
import { aotElement } from '../../../../shared/models/aot-element';
import conf from '../../../../core/configs';

@Component({
  selector: 'app-aot',
  templateUrl: './aot.component.html',
  styleUrls: ['./aot.component.css']
})
export class AotComponent implements OnInit {

  dictList: aotElement[];
  docList: aotElement[];

  constructor(private router: Router, private route: ActivatedRoute, private aotService: AotService) { }

  ngOnInit(): void {

    const baseId = this.route.snapshot.paramMap.get('basename');

    this.getDictList(baseId);
    this.getDocList(baseId);
  }

  getDictList(baseId: string){
    this.aotService.getDictList(baseId).subscribe(
      dictList => {
        this.dictList = dictList;
        this.setDictCaptions();
      },
      err => {
        //this.dictList = JSON.parse(err.error).message;
        //this.router.navigate(['/pagenotfound'])
      }
    );
  }

  getDocList(baseId: string){
    this.aotService.getDocList(baseId).subscribe(
      docList => { 
        this.docList = docList; 
        this.setDocCaptions();
      }
    );
  }

  setDictCaptions(){
    this.dictList.forEach(v => {
      v.caption = conf.dictionaries[v.name].caption;
    });
  }

  setDocCaptions(){
    this.docList.forEach(v => {
      v.caption = conf.documents[v.name].caption;
    });
  }

  openDictJournal(dictName: string): void {
    const baseId = this.route.snapshot.paramMap.get('basename');
    this.router.navigate([`/dict/${baseId}/${dictName}`])
  }

  openDocJournal(docName: string): void {
    const baseId = this.route.snapshot.paramMap.get('basename');
    this.router.navigate([`/doc/${baseId}/${docName}`])
  }
  
}
