import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-close-buttons',
  templateUrl: './form-close-buttons.component.html',
  styleUrls: ['./form-close-buttons.component.css']
})
export class FormCloseButtonsComponent implements OnInit {

  @Output() okCloseClick = new EventEmitter<any>();
  @Output() cancelClick  = new EventEmitter<any>();

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  okClose() {
    this.okCloseClick.emit();
  }

  cancel() {
    this.cancelClick.emit();
  }

}
