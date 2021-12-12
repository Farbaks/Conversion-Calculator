import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrencyRoutingModule } from './currency-routing.module';
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { CurrencyComponent } from './currency.component';

describe('CurrencyComponent', () => {
  let component: CurrencyComponent;
  let fixture: ComponentFixture<CurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrencyComponent],
      imports: [
        CommonModule,
        CurrencyRoutingModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        FormsModule,
        FlexLayoutModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hide result by default', () => {
    expect(component.fetchingConversionRate).toBe(true);
  });

  // it('should convert \'from - to\' when all fields are filled', async () => {
  //   await component.getCurrencies();
  //   component.baseCurrency = component.currencies[0];
  //   component.targetCurrency = component.currencies[1];
  //   component.baseAmount = 2;
  //   component.targetAmount = null;
  //   await component.getConversionRate('from');
  //   expect(component.targetCurrency).toEqual(jasmine.any(Number));
  // });

  // it('should convert \'to - from\' when all fields are filled', async () => {
  //   await component.getCurrencies();
  //   component.baseCurrency = component.currencies[0];
  //   component.targetCurrency = component.currencies[1];
  //   component.targetAmount = 2;
  //   component.baseAmount = null;
  //   component.change('to');
  //   await component.getConversionRate('from');
  //   expect(component.targetCurrency).toEqual(jasmine.any(Number));
  // });

  // it('should not convert when from unit is missing', () => {
  //   component.fromUnit = "";
  //   component.toUnit = component.units[1].name;
  //   component.toValue = 2;
  //   component.fromValue = null;
  //   component.change('to');
  //   expect(component.showResult).toBe(false);
  // });

  // it('should not convert when to unit is missing', () => {
  //   component.toUnit = "";
  //   component.fromUnit = component.units[1].name;
  //   component.toValue = 2;
  //   component.fromValue = null;
  //   component.change('to');
  //   expect(component.showResult).toBe(false);
  // });

  // it('should not convert \'from - to\' when from value is missing', () => {
  //   component.toUnit = component.units[0].name;
  //   component.fromUnit = component.units[1].name;
  //   component.toValue = 2;
  //   component.fromValue = null;
  //   component.change('from');
  //   expect(component.showResult).toBe(false);
  // });

  // it('should not convert \'to - from\' when to value is missing', () => {
  //   component.toUnit = component.units[0].name;
  //   component.fromUnit = component.units[1].name;
  //   component.fromValue = 2;
  //   component.toValue = null;
  //   component.change('to');
  //   expect(component.showResult).toBe(false);
  // });

});
