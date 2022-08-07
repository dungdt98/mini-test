import { CoreModule } from 'src/app/_core/core.module';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ShowMessageService } from './show-message.service';
import { NgModule } from '@angular/core';

describe('ShowMessageService', () => {
  let service: ShowMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, NzNotificationService, NgModule, CoreModule ],
      providers: [ShowMessageService, NzNotificationService]
    });
    service = TestBed.inject(ShowMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
