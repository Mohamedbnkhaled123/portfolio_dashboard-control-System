import { TestBed } from '@angular/core/testing';

import { ProjectsServiceTs } from './projects.service.ts';

describe('ProjectsServiceTs', () => {
  let service: ProjectsServiceTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectsServiceTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
