import { TestBed } from '@angular/core/testing';

import { SkillServiceTs } from './skill.service.ts';

describe('SkillServiceTs', () => {
  let service: SkillServiceTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillServiceTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
