import { Observable, Subscriber } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { StudentService } from 'src/app/_services/student.service';
import { ValidatorNotNull } from 'src/app/_services/validator-custom.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Base64Service } from 'src/app/_services/base64.service';

@Component({
  selector: 'app-modal-form-student',
  templateUrl: './modal-form-student.component.html',
  styleUrls: ['./modal-form-student.component.scss'],
})
export class ModalFormStudentComponent implements OnInit {
  @Input() dataModal: any;
  isLoading = false;
  dataFromParent: any = null;
  formStudent!: FormGroup;
  arrClasses: any = [];
  date!: NgbDateStruct;
  time: any;
  avatarUser = 'https://robohash.org/7IZ.png?set=set3';
  urlImage!: SafeResourceUrl;
  dataBase64Image = null;
  errMess = '';

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private studentService: StudentService,
    private sanitizer: DomSanitizer,
    private base64: Base64Service
  ) {}

  ngOnInit(): void {
    console.log(this.dataModal);
    this.dataFromParent = this.dataModal.dataFromParent;
    this.initForm();
    this.getListClasses();
  }

  initForm() {
    this.formStudent = this.fb.group({
      name: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.name
          : '',
        [Validators.required],
      ],
      gender: this.dataFromParent.nameForm == 'update'
      ? this.dataFromParent?.gender
      : 1,
      class: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.classId
          : null,
        [Validators.required, ValidatorNotNull],
      ],
    });

    if(this.dataFromParent.nameForm == 'update' && this.dataFromParent.DayOfBirth && this.dataFromParent.DayOfBirth != '')  {
      let indexDay = this.dataFromParent.DayOfBirth.indexOf('/')
      let indexMonth = this.dataFromParent.DayOfBirth.indexOf('/', (indexDay + 1));
      let indexYear = this.dataFromParent.DayOfBirth.lastIndexOf('/')
      let day = this.dataFromParent.DayOfBirth.slice(0, indexDay);
      let month = this.dataFromParent.DayOfBirth.slice(indexDay+1, indexMonth);
      let year = this.dataFromParent.DayOfBirth.slice(indexMonth+1);
      this.date = {
        year: Number(year),
        month: Number(month),
        day: Number(day)
      }
    }
  }

  getListClasses() {
    this.studentService.getListClasses().subscribe((res: any) => {
      if (res.status == 1) {
        this.arrClasses = res.data;
      }
    });
  }

  submit(valueForm: any) {
    let month = '';
    let dateOfBirth = '';
    if (this.date) {
      if (this.date.month < 10) month = '0' + this.date.month;
      dateOfBirth = this.date.day + '/' + month + '/' + this.date.year;
    }

    let dataInput = {
      Fullname: valueForm.name,
      ClassId: valueForm.class,
      Gender: valueForm.gender ? 1 : 2,
      DayOfBirth: dateOfBirth || null,
      Avatar: this.avatarUser || '',
    };
    console.log(dataInput);
    if( this.dataFromParent.nameForm == 'create') {
      this.studentService.create(dataInput).subscribe(
        (res: any) => {
          if (res.status == 0) {
            this.errMess = res.message;
          } else {
            this.activeModal.close(true);
          }
        },
        (err: any) => {
          this.errMess = err.error?.message;
        }
      );
    } else {
      this.studentService.update(this.dataFromParent.id, dataInput).subscribe(
        (res: any) => {
          if (res.status == 0) {
            this.errMess = res.message;
          } else {
            this.activeModal.close(true);
          }
        },
        (err: any) => {
          this.errMess = err.error?.message;
        }
      );
    }


  }

  getDateSelect(event: any) {
    console.log(event);
    this.date = event.date;
  }

  myimage!: Observable<any>;
  onChangeFileInputAvatar(event: any): void {
    console.log(event);

    let allowExtentionImage = ['png', 'jpg', 'jpeg'];
    if (event.target.files.length > 0) {
      const file = event?.target.files[0];
      if (!allowExtentionImage.includes(this.getExstendsion(file?.type))) {
        alert("Ảnh không đúng định dạng");
        return;
      }
      let dataReadFile = new Observable((subscriber: Subscriber<any>) => {
        this.base64.readFile(file, subscriber);
      });
      dataReadFile.subscribe((data) => {
        this.avatarUser = data as string;
      });
    }
  }

  getExstendsion(image: any) {
    let endingFile = '';
    if (image.endsWith('jpg') || image.endsWith('jpeg')) {
      endingFile =  'jpg';
    }
    if (image.endsWith('png')) {
      endingFile =  'png';
    }
    return endingFile;
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }
}
