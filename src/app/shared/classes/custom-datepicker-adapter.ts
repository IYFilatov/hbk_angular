import { NativeDateAdapter } from "@angular/material/core";
import * as moment from "moment";

export const CUSTOM_DATE_FORMATS = {
    parse: {
        dateInput: {month: 'short', year: 'numeric', day: 'numeric'}
    },
    display: {
        dateInput: 'DATE',
        monthYearLabel: {year: 'numeric', month: 'short'},
        dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
        monthYearA11yLabel: {year: 'numeric', month: 'long'},
    }
 };

 export const CUSTOM_DATETIME_FORMATS = {
  parse: {
      dateInput: {month: 'short', year: 'numeric', day: 'numeric'}
  },
  display: {
      dateInput: 'DATETIME',
      monthYearLabel: {year: 'numeric', month: 'short'},
      dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
      monthYearA11yLabel: {year: 'numeric', month: 'long'},
  }
};

export class CustomDatePickerAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    switch(displayFormat){
      case 'DATE':
        moment.locale('en-GB');
        return moment(date).format('DD.MM.YYYY'); 
      case 'DATETIME':
        moment.locale('en-GB');
        return moment(date).format('DD.MM.YYYY hh:mm:ss'); 
      default:
        return moment(date).format('LLL');
        //return date.toDateString();
      
    }
  }

}