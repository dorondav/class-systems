import { TestBed } from '@angular/core/testing';

import { LessonsService } from '../services/lessons.service';

describe('ClassesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LessonsService = TestBed.get(LessonsService);
    expect(service).toBeTruthy();
  });
});
