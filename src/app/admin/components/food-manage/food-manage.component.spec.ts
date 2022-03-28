import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodManageComponent } from './food-manage.component';

describe('FoodManageComponent', () => {
  let component: FoodManageComponent;
  let fixture: ComponentFixture<FoodManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
