import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DemoService } from 'src/app/_services/demo.service';
import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS_DEFAULT } from 'src/app/_shared/utils/constant';
import { ModalDemoComponent } from '../modal-demo/modal-demo.component';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  status = 1;
  arrStatus= [
    {code: 1, name: 'Đang sử dụng'},
    {code: 2, name: 'Dùng thử'},
    {code: 3, name: 'Hết hạn'},
    {code: 4, name: 'Bị khóa'},
  ];
  keyword = '1234556';
  pageIndex = PAGE_INDEX_DEFAULT; // Trang hiện tại
  pageSize = PAGE_SIZE_DEFAULT; // Số bản ghi trong 1 trang
  collectionSize = 0; // Tổng số lượng bản ghi
  sizeOption = PAGE_SIZE_OPTIONS_DEFAULT; // Thay đổi pageSize
  isLoading = false;
  dataTable = [1, 2, 3, 4]

  constructor(
    private modalService: NgbModal,
    private demoService: DemoService
  ) { }

  ngOnInit(): void {
  }

  create() {
    const modalRef = this.modalService.open(ModalDemoComponent,
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
      titleModal: 'Modal demo',
      btnCancel: 'Hủy',
      btnAccept: 'Lưu',
      isHiddenBtnClose: true, // hidden/show btn close modal
      dataFromParent: {
        service: this.demoService,
        apiSubmit: (dataInput: any) =>
          this.demoService.create(dataInput),
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
      this.pageIndex = 1;
      this.keyword = value.trim();
    }
  }

  filter() {
  }

  paginationChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}
