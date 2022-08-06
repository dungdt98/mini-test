import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmTaskComponent } from './modal-confirm-task.component';

describe('ModalConfirmTaskComponent', () => {
  let component: ModalConfirmTaskComponent;
  let fixture: ComponentFixture<ModalConfirmTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalConfirmTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfirmTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
