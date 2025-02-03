import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSideComponent } from './main-side.component';

describe('MainSideComponent', () => {
  let component: MainSideComponent;
  let fixture: ComponentFixture<MainSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainSideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
