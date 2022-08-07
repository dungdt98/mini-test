import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-single-date-picker',
  templateUrl: './single-date-picker.component.html',
  styleUrls: ['./single-date-picker.component.scss']
})
export class SingleDatePickerComponent {
  minDate = { day: 9, month: 4, year: 2022 };
  @Input() date!: NgbDateStruct;
  time = {hour: 0, minute: 0};
  @Output() dateSelect = new EventEmitter<any>();

  selectDate(event: any) {
    console.log(this.date);

    this.dateSelect.emit({
      date: this.date,
      time: this.time
    });
  }

}
