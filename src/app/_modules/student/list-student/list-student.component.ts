import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/_services/student.service';
import { ModalFormStudentComponent } from '../modal-form-student/modal-form-student.component';
import { ModalDeleteStudentComponent } from '../modal-delete-student/modal-delete-student.component';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.scss'],
})
export class ListStudentComponent implements OnInit {
  arrClasses: any = [];
  classId = '';
  pageIndex = 1;
  pageSize = 45;
  totalPage = 0;
  arrStudents: any = [];
  initialArrStudents: any = [];

  constructor(
    private modalService: NgbModal,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.getListClasses();
  }

  getListClasses() {
    this.studentService.getListClasses().subscribe((res: any) => {
      if (res.status == 1) {
        this.arrClasses = res.data;
        if (res.data.length > 0) this.classId = res.data[0].id;
        this.getList();
      }
    });
  }

  getList() {
    this.studentService
      .getList(this.pageIndex, this.classId)
      .subscribe((res: any) => {
        this.arrStudents = res.data;
        this.totalPage = res.totalPage;
        this.arrStudents.forEach((student: any) => {
          this.arrClasses.forEach((el: any) => {
            if (student.classId == el.id) student['className'] = el.fullname;
          });
        });

        this.initialArrStudents.push(...this.arrStudents);
        // if(res.status == 1) {
        // }
      });
  }

  create() {
    const modalRef = this.modalService.open(ModalFormStudentComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: 'static', // prevent click outside modal to close modal
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      size: 'lg', // 'sm' | 'md' | 'lg' | 'xl',
      // modalDialogClass: 'modal-xxl', // custom class, nếu muốn mở rộng size modal- thêm class modal-xxl | modal-xxxl | modal-full-screen
    });

    let data = {
      titleModal: 'Thêm mới học sinh',
      btnCancel: 'Hủy',
      btnAccept: 'Lưu',
      isHiddenBtnClose: true, // hidden/show btn close modal
      dataFromParent: {
        nameForm: 'create',
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result) => {
        if (result) {
          this.pageIndex = 1;
          this.initialArrStudents = [];
          this.getList();
        }
      },
      (reason) => {}
    );
  }

  update(student: any) {
    const modalRef = this.modalService.open(ModalFormStudentComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      // backdrop: 'static', // prevent click outside modal to close modal
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      size: 'lg', // 'sm' | 'md' | 'lg' | 'xl',
      // modalDialogClass: 'modal-xxl', // custom class, nếu muốn mở rộng size modal- thêm class modal-xxl | modal-xxxl | modal-full-screen
    });

    let data = {
      titleModal: 'Cập nhật học sinh',
      btnCancel: 'Hủy',
      btnAccept: 'Lưu',
      isHiddenBtnClose: true, // hidden/show btn close modal
      dataFromParent: {
        id: student.id,
        name: student.firstName + ' ' + student.lastName,
        gender: student.gender,
        classId: student.classId,
        DayOfBirth: student.DayOfBirth,
        nameForm: 'update',
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result) => {
        if (result) this.getList();
      },
      (reason) => {}
    );
  }

  delete(student: any) {
    const modalRef = this.modalService.open(ModalDeleteStudentComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      // backdrop: 'static', // prevent click outside modal to close modal
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      size: 'md', // 'sm' | 'md' | 'lg' | 'xl',
      // modalDialogClass: 'modal-xxl', // custom class, nếu muốn mở rộng size modal- thêm class modal-xxl | modal-xxxl | modal-full-screen
    });

    let data = {
      titleModal: 'Xóa học sinh',
      btnCancel: 'Hủy',
      btnAccept: 'Xác nhận',
      isHiddenBtnClose: true, // hidden/show btn close modal
      dataFromParent: {
        id: student.id,
        name: student.firstName + ' ' + student.lastName,
        class: student.className,
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.pageIndex = 1;
          this.initialArrStudents = [];
          this.getList();
        }
      },
      (reason) => {
        if (reason) alert('Lỗi rồi!');
      }
    );
  }

  filter() {
    this.initialArrStudents = [];
    this.pageIndex = 1;
    this.getList();
  }

  viewMore() {
    this.pageIndex++;
    this.getList();
  }
}
