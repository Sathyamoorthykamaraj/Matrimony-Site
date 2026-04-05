import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewprofilePage } from './viewprofile.page';

describe('ViewprofilePage', () => {
  let component: ViewprofilePage;
  let fixture: ComponentFixture<ViewprofilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
