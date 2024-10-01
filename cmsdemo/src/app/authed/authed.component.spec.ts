import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthedComponent } from './authed.component';

describe('AuthedComponent', () => {
  let component: AuthedComponent;
  let fixture: ComponentFixture<AuthedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
