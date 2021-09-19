import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-doc-close-buttons',
  templateUrl: './doc-close-buttons.component.html',
  styleUrls: ['./doc-close-buttons.component.css'],
  host: {
    '(document:keydown)': 'keyEvent($event)'
  }
})
export class DocCloseButtonsComponent implements OnInit {

  @Output() okCloseClick = new EventEmitter<any>();
  @Output() saveBtnClick = new EventEmitter<any>();
  @Output() cancelClick  = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  keyEvent(event: KeyboardEvent){
    switch(event.key){
      case "Esc":
      case "Escape":
        this.cancel();
      break;
    }
  }

  okClose() {
    this.okCloseClick.emit();
  }

  saveBtn() {
    this.saveBtnClick.emit();
  }

  cancel() {
    this.cancelClick.emit();
  }

}
