import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AotService } from '../../../../core/services/aot.service';
import { aotElement } from '../../../../shared/models/aot-element';

@Component({
  selector: 'app-aot',
  templateUrl: './aot.component.html',
  styleUrls: ['./aot.component.css']
})
export class AotComponent implements OnInit {

  dictList: aotElement[];  

  constructor(private router: Router, private route: ActivatedRoute, private aotService: AotService) { }

  ngOnInit(): void {

    const baseId = this.route.snapshot.paramMap.get('basename');

    this.aotService.getDictList(baseId).subscribe(
      dictList => {
        this.dictList = dictList        
      },
        err => {
          //this.dictList = JSON.parse(err.error).message;
          //this.router.navigate(['/pagenotfound'])
        }
      );

  }

  openDictJournal(dictName: string): void {
    const baseId = this.route.snapshot.paramMap.get('basename');
    this.router.navigate([`/dict/${baseId}/${dictName}`])
  }
  
}
