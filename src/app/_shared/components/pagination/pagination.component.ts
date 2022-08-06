import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS_DEFAULT } from 'src/app/_shared/utils/constant';
import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() pageIndex:number = PAGE_INDEX_DEFAULT;
  @Input() pageSize:number = PAGE_SIZE_DEFAULT;
  @Input() collectionSize:number = 0;
  @Input() sizeOption:any = PAGE_SIZE_OPTIONS_DEFAULT;
  @Output() paginationChange = new EventEmitter<any>();

  refreshPageSize(event:any) {
    this.pageSize = event;
    this.paginationChange.emit({
      pageIndex:this.pageIndex,
      pageSize:this.pageSize
    });
  }

  refreshPageIndex(event:any) {
    this.pageIndex = event;
    this.paginationChange.emit({
      pageIndex:this.pageIndex,
      pageSize:this.pageSize
    });
  }

}
