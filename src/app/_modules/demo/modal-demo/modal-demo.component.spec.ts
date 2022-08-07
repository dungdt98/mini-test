import { CoreModule } from 'src/app/_core/core.module';
import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';

import { ModalDemoComponent } from './modal-demo.component';
import { NgModule } from '@angular/core';

fdescribe('ModalDemoComponent', () => {
  let component: ModalDemoComponent;
  let fixture: ComponentFixture<ModalDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreModule, FormBuilder, HttpClientTestingModule, NgModule],
      declarations: [ ModalDemoComponent ],
      providers: [NgbActiveModal, ListenFirebaseService, ShowMessageService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
