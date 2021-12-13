import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UnitRoutingModule } from './unit-routing.module';

import { UnitComponent } from './unit.component';

describe('UnitComponent', () => {
  let component: UnitComponent;
  let fixture: ComponentFixture<UnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitComponent ],
      imports: [
        CommonModule,
        UnitRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should hide result by default', () => {
    expect(component.showResult).toBe(false);
  });

  it('should convert \'from - to\' when all fields are filled', () => {
    component.fromUnit = component.units[0].name;
    component.toUnit = component.units[1].name;
    component.fromValue = 2;
    component.toValue = null;
    component.changeUnit('from');
    expect(component.toValue).toEqual(jasmine.any(Number));
    expect(component.showResult).toBe(true);
  });

  it('should convert \'to - from\' when all fields are filled (when unit is changed)', () => {
    component.fromUnit = component.units[0].name;
    component.toUnit = component.units[1].name;
    component.toValue = 2;
    component.fromValue = null;
    component.changeUnit('to');
    expect(component.fromValue).toEqual(jasmine.any(Number));
    expect(component.showResult).toBe(true);
  });

  it('should not convert when `from` unit is missing (when unit is changed)', () => {
    component.fromUnit = "";
    component.toUnit = component.units[1].name;
    component.toValue = 2;
    component.fromValue = null;
    component.changeUnit('to');
    expect(component.showResult).toBe(false);
  });

  it('should not convert when `to` unit is missing (when unit is changed)', () => {
    component.toUnit = "";
    component.fromUnit = component.units[1].name;
    component.toValue = 2;
    component.fromValue = null;
    component.changeUnit('to');
    expect(component.showResult).toBe(false);
  });

  it('should not convert \'from - to\' when `from` value is missing (when value is changed)', () => {
    component.toUnit = component.units[0].name;
    component.fromUnit = component.units[1].name;
    component.toValue = 2;
    component.fromValue = null;
    component.changeAmount('from');
    expect(component.showResult).toBe(false);
  });

  it('should not convert \'to - from\' when `to` value is missing (when value is changed)', () => {
    component.toUnit = component.units[0].name;
    component.fromUnit = component.units[1].name;
    component.fromValue = 2;
    component.toValue = null;
    component.changeAmount('to');
    expect(component.showResult).toBe(false);
  });

});
