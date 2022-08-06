import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscriber } from 'rxjs';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ValidatorNotNull } from 'src/app/_services/validator-custom.service';
import { MESSAGE_ERROR_CALL_API, TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-form-task',
  templateUrl: './modal-form-task.component.html',
  styleUrls: ['./modal-form-task.component.scss']
})
export class ModalFormTaskComponent implements OnInit {

  @Input() dataModal: any;
  isLoading = false;
  dataFromParent: any = null;
  formDemo!: FormGroup;
  arrFake = [{value: 1, label: 'Option 1'}];
  date!: NgbDateStruct;
  time: any;

  constructor(
    public activeModal: NgbActiveModal,
    private listenFirebaseService: ListenFirebaseService,
    private showMessage: ShowMessageService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    console.log(this.dataModal);
    this.dataFromParent = this.dataModal.dataFromParent;
    this.initForm();
  }

  initForm() {
    this.formDemo = this.fb.group({
      name: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.name
          : '',
        [Validators.required, Validators.maxLength(50)],
      ],
      code: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.code
          : '',
        [Validators.required, Validators.maxLength(50)],
      ],
      select: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.select
          : null,
        [Validators.required, ValidatorNotNull],
      ],
      desc: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.description
          : '',
      ],
    });
  }

  getList() {

  }

  submit(valueForm: any) {
    console.log(valueForm);
    console.log(this.date);
    console.log(this.time);
    // convert date to timestamp
    let newDate = new Date( this.date.year, this.date.month - 1, this.date.day, this.time.hour, this.time.minute);
    console.log(newDate.getTime()/1000); // timestamp

    // let dataInput = {};
    // this.isLoading = true;
    // this.listenFireBase(
    //   this.dataFromParent.keyFirebaseAction,
    //   this.dataFromParent.keyFirebaseModule
    // );
    // this.dataFromParent.apiSubmit(dataInput).subscribe(
    //   (res: any) => {
    //     if (res.status == 0) {
    //       this.isLoading = false;
    //       this.activeModal.close(false);
    //       this.showMessage.error(res.msg);
    //     }
    //   },
    //   (err: any) => {
    //     this.isLoading = false;
    //     this.showMessage.error(MESSAGE_ERROR_CALL_API);
    //   }
    // );
  }

  getDateSelect(event: any) {
    console.log(event);
    this.date = event.date;
    this.time = event.time;

  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

  listenFireBase(action: string, module: string) {
    const timeId = setTimeout(() => {
      this.isLoading = false;
    }, TIME_OUT_LISTEN_FIREBASE);
    const listenFb = new Observable((subscriber: Subscriber<any>) => {
      this.listenFirebaseService.checkFireBase(action, module, subscriber);
    });
    listenFb.subscribe((ref) => {
      if (ref.status === true) {
        clearTimeout(timeId);
        this.isLoading = false;
        this.activeModal.close(true);
      } else {
        this.isLoading = false;
      }
    });
  }


}
