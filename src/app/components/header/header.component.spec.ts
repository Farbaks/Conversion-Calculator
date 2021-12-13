import { CommonModule } from '@angular/common';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Router, RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let location: Location;
  let router: Router;

  const routes: Routes = [
    {
      path: 'currency-converter',
      loadChildren: () => import('../../pages/currency/currency.module').then(m => m.CurrencyModule)
    },
    {
      path: 'unit-converter',
      loadChildren: () => import('../../pages/unit/unit.module').then(m => m.UnitModule)
    },
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'currency-converter'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        CommonModule,
        RouterModule,
        RouterTestingModule.withRoutes(routes),
        FlexLayoutModule
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    router.initialNavigation();

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
