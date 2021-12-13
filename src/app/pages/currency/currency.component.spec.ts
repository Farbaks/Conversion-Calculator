import { CommonModule } from '@angular/common';
import { fakeAsync, ComponentFixture, TestBed, tick, flush } from '@angular/core/testing';
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
import { CurrencyService } from 'src/app/services/currency.service';
import { of } from 'rxjs';

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
      ],
      providers: [CurrencyService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    let mockResponse = {
      success: true,
      symbols: {
        AED: { description: "United Arab Emirates Dirham", code: "AED" },
        AFN: { description: "Afghan Afghani", code: "AFN" },
        ALL: { description: "Albanian Lek", code: "ALL" },
        AMD: { description: "Armenian Dram", code: "AMD" },
        ANG: { description: "Netherlands Antillean Guilder", code: "ANG" },
        AOA: { description: "Angolan Kwanza", code: "AOA" },
        NGN: { description: "Nigerian Naira", code: "NGN" },
        USD: { description: "US Dollars", code: "USD" },
      }

    }
    spyOn(component.currencyService, 'getCurrencies').and.returnValue(of(mockResponse));
    component.getCurrencies();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hide result by default', () => {
    expect(component.fetchingConversionRate).toBe(true);
  });

  it('should convert \'from - to\' when all fields are filled (when amount is changed)', async () => {
    component.baseCurrency = component.currencies[0];
    component.targetCurrency = component.currencies[1];
    component.baseAmount = 2;
    component.targetAmount = null;
    component.changeAmount('from')
    expect(component.targetAmount).toEqual(jasmine.any(Number));
  });

  it('should not convert \'from - to\' when `from` value is missing (when amount is changed)', () => {
    component.baseCurrency = component.currencies[0];
    component.targetCurrency = component.currencies[1];
    component.baseAmount = null;
    component.targetAmount = 1;
    component.changeAmount('from')
    expect(component.targetAmount).toBeFalsy();
  });

  it('should not convert \'to - from\' when `to` value is missing (when amount is changed)', () => {
    component.baseCurrency = component.currencies[0];
    component.targetCurrency = component.currencies[1];
    component.baseAmount = 2;
    component.targetAmount = null;
    component.changeAmount('to')
    expect(component.baseAmount).toBeFalsy();
  });

  it("should call convert function (when currency is changed)", (() => {
    fixture.detectChanges();

    spyOn(component.currencyService, 'convert');

    component.baseCurrency = component.currencies[7];
    component.targetCurrency = component.currencies[5];
    component.baseAmount = 2;
    component.targetAmount = null;
    component.getConversionRate('from');

    expect(component.currencyService.convert).toHaveBeenCalled();
  }));

  it("should update the conversion rate (when currency is changed)", (fakeAsync(() => {
    fixture.detectChanges();

    component.baseCurrency = component.currencies[7];
    component.targetCurrency = component.currencies[5];
    component.baseAmount = 2;
    component.targetAmount = null;

    spyOn(component.currencyService, 'convert').and.returnValue(of(
      {
        info: { rate: 409.55 },
        success: true
      }
    ));
    component.getConversionRate('from');

    tick();
    expect(component.conversionRate).toBe(409.55);
  })));

  it("should call changeAmount (when currency is changed)", (fakeAsync(() => {
    fixture.detectChanges();

    component.baseCurrency = component.currencies[7];
    component.targetCurrency = component.currencies[5];
    component.baseAmount = 1;
    component.targetAmount = null;

    spyOn(component.currencyService, 'convert').and.returnValue(of(
      {
        info: { rate: 409.55 },
        success: true
      }
    ));
    let spy = spyOn(component, 'changeAmount');
    component.getConversionRate('from');

    tick();
    expect(spy).toHaveBeenCalled();
  })));

  it("should update historical data (when currency is changed)", (fakeAsync(() => {
    fixture.detectChanges();

    component.baseCurrency = component.currencies[7];
    component.targetCurrency = component.currencies[5];
    component.baseAmount = 1;
    component.targetAmount = null;

    spyOn(component.currencyService, 'convert').and.returnValue(of(
      {
        info: { rate: 409.55 },
        success: true
      }
    ));
    let spy = spyOn(component.currencyService, 'getTimeSeries');
    component.getConversionRate('from');

    tick();
    expect(spy).toHaveBeenCalled();
  })));

  it("should update chart (when currency is changed)", (fakeAsync(() => {
    fixture.detectChanges();

    component.baseCurrency = component.currencies[7];
    component.targetCurrency = component.currencies[5];
    component.baseAmount = 1;
    component.targetAmount = null;

    spyOn(component.currencyService, 'convert').and.returnValue(of(
      {
        info: { rate: 409.55 },
        success: true
      }
    ));

    spyOn(component.currencyService, 'getTimeSeries').and.returnValue(of(
      {
        rates: {
          '2021-11-13': { NGN: 412.16 },
          '2021-11-14': { NGN: 412.14 },
          '2021-11-15': { NGN: 411.42 }
        },
        success: true
      }
    ));
    let spy = spyOn(component, 'loadChart');
    component.getConversionRate('from');

    tick(101);
    expect(spy).toHaveBeenCalled();
  })));

});
