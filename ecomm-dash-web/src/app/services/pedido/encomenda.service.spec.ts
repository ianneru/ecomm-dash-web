import { TestBed } from '@angular/core/testing';

import { EncomendaService } from './Encomenda.service';

describe('EncomendaService', () => {
  let service: EncomendaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncomendaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
