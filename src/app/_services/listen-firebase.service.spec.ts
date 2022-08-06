import { TestBed } from '@angular/core/testing';

import { ListenFirebaseService } from './listen-firebase.service';

describe('ListenFirebaseService', () => {
  let service: ListenFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListenFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
