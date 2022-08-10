import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscriber } from 'rxjs';
import { Base64Service } from 'src/app/_services/base64.service';
import { StudentService } from 'src/app/_services/student.service';
import { ValidatorNotNull } from 'src/app/_services/validator-custom.service';
import { REGEX_FULL_NAME } from 'src/app/_shared/utils/constant';

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
  avatarUser = 'https://robohash.org/7IZ.png?set=set3';
  errMess = '';

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private studentService: StudentService,
    private base64: Base64Service
  ) {}

  ngOnInit(): void {
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
        [Validators.required, Validators.pattern(REGEX_FULL_NAME)],
      ],
      gender: this.dataFromParent.nameForm == 'update'
      ? this.convertGender(this.dataFromParent?.gender) : false,
      class: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.classId
          : null,
        [Validators.required, ValidatorNotNull],
      ],
    });

    if(this.dataFromParent.nameForm == 'update' && this.dataFromParent.DayOfBirth && this.dataFromParent.DayOfBirth != '')  {
     this.date = this.formatDateToDateStruct(this.dataFromParent.DayOfBirth);
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
    let dateOfBirth = this.formatDateToString(this.date);
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

  convertGender(gender: string) {
    return gender == 'Male' ? true : false;
  }

  formatDateToString(date: NgbDateStruct) {
    let day = '';
    let month = '';
    let dateOfBirth = '';
    if (date) {
      if (date.month < 10) month = '0' + this.date.month;
      if (date.day < 10) day = '0' + date.day;
      dateOfBirth = day + '/' + month + '/' + date.year;
    }
    return dateOfBirth;
  }

  formatDateToDateStruct(date: string) {
    let indexDay = date.indexOf('/')
    let indexMonth = date.indexOf('/', (indexDay + 1));
    let day = date.slice(0, indexDay);
    let month = date.slice(indexDay+1, indexMonth);
    let year = date.slice(indexMonth+1);
    return {
      year: Number(year),
      month: Number(month),
      day: Number(day)
    }
  }

  getDateSelect(event: any) {
    this.date = event.date;
  }

  onChangeFileInputAvatar(event: any): void {
    let allowExtensionImage = ['png', 'jpg', 'jpeg'];
    if (event.target.files.length > 0) {
      const file = event?.target.files[0];
      if (!allowExtensionImage.includes(this.getExtension(file?.type))) {
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

  getExtension(image: any) {
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
