import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
        CommonModule,
        RouterModule,
        RouterTestingModule,
        FlexLayoutModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show sidebar when hamburger is click on while sidebar is hidden', () => {
    component.showSideBar = false;
    component.toggleSideBar();

    expect(component.showSideBar).toBe(true);
  });

  it('should hide sidebar when hamburger is click on while sidebar is open', () => {
    component.showSideBar = true;
    component.toggleSideBar();

    expect(component.showSideBar).toBe(false);
  });
});
