import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-doc-any-journal-panel',
  templateUrl: './doc-any-journal-panel.component.html',
  styleUrls: ['./doc-any-journal-panel.component.css']
})
export class DocAnyJournalPanelComponent implements OnInit {

  @Output() delSelectedClick = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  delSelected(){
    this.delSelectedClick.emit();
  }

}
