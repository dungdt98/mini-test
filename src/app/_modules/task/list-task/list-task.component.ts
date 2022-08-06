import { ModalDemoComponent } from './../../demo/modal-demo/modal-demo.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { ModalFormTaskComponent } from '../modal-form-task/modal-form-task.component';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.scss']
})
export class ListTaskComponent implements OnInit {

  status = 1;
  arrStatus= [
    {code: 1, name: 'Đang sử dụng'},
    {code: 2, name: 'Dùng thử'},
    {code: 3, name: 'Hết hạn'},
    {code: 4, name: 'Bị khóa'},
  ];
  keyword = '';

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  create() {
    const modalRef = this.modalService.open(ModalFormTaskComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        // backdrop: 'static', // prevent click outside modal to close modal
        centered: false, // vị trí hiển thị modal ở giữa màn hình
        size: 'lg', // 'sm' | 'md' | 'lg' | 'xl',
        // modalDialogClass: 'modal-xxl', // custom class, nếu muốn mở rộng size modal- thêm class modal-xxl | modal-xxxl | modal-full-screen
      });

    let data = {
      titleModal: 'Tạo task',
      btnCancel: 'Hủy',
      btnAccept: 'Lưu',
      isHiddenBtnClose: true, // hidden/show btn close modal
      dataFromParent: {
        // service: this.demoService,
        // apiSubmit: (dataInput: any) =>
        //   this.demoService.create(dataInput),
        keyFirebaseAction: 'create',
        keyFirebaseModule: 'role',
        nameForm: 'create'
      },
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      console.log(result);
    }, (reason) => {
    });
  }

  search(event: any, value: string) {
    if (event.key === 'Enter' || event.key === 'Tab') {
      this.keyword = value.trim();
    }
  }

  filter() {
  }

}
