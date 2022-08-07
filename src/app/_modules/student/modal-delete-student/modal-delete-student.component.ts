import { StudentService } from 'src/app/_services/student.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-delete-student',
  templateUrl: './modal-delete-student.component.html',
  styleUrls: ['./modal-delete-student.component.scss']
})
export class ModalDeleteStudentComponent implements OnInit {

  @Input() dataModal: any;

  constructor(
    public activeModal: NgbActiveModal,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
  }

  submit() {
    this.studentService.delete(this.dataModal.dataFromParent.id).subscribe(
      (res: any) => {
        if (res.status == 0) {
          alert('Lỗi rồi!');
        } else {
          this.activeModal.close(true);
        }
      },
      (err: any) => {
        alert('Lỗi rồi!');
      }
    );
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

}
