import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dict-journal-panel',
  templateUrl: './dict-journal-panel.component.html',
  styleUrls: ['./dict-journal-panel.component.css']
})
export class DictJournalPanelComponent implements OnInit {

  @Output() delSelectedClick = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  delSelected(){
    this.delSelectedClick.emit();
  }
}
