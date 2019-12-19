import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopClassComponent } from './shop-class.component';

describe('ShopClassComponent', () => {
  let component: ShopClassComponent;
  let fixture: ComponentFixture<ShopClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
