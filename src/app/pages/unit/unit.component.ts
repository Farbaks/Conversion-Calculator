import { Component, OnInit } from '@angular/core';
import { UnitType } from 'src/app/models/unit';
import * as Units from 'src/assets/json/units.json';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent implements OnInit {
  units: Array<UnitType> = (Units as any).default;
  fromValue: number | null = null;
  fromUnit: string = "";
  fromDisplayName: string = "";
  toValue: number | null = null;
  toUnit: string = "";
  toDisplayName: string = "";
  showResult: boolean = false;
  constructor() { }


  ngOnInit(): void {
  }

  checkFormat(event: any) {
    return (/^\d+$/.test(event.key));
  }

  changeAmount(type: "from" | "to") {
    this.showResult = false;
    if(![this.fromUnit, this.toUnit].includes("")) {
      if (type == "from") {
        if (this.fromValue) {
          this.toValue = this.convert(this.fromValue, this.fromUnit, this.toUnit);
          this.toDisplayName = this.toValue > 1 ? this.units.find((item:UnitType) => item.name == this.toUnit)!.plural : this.toUnit;
          this.fromDisplayName = this.fromValue > 1 ? this.units.find((item:UnitType) => item.name == this.fromUnit)!.plural : this.fromUnit;
          this.showResult = true;
        }
        else {
          this.toValue = null
        }
      }
      else {
        if (this.toValue) {
          this.fromValue = this.convert(this.toValue, this.toUnit, this.fromUnit);
          this.toDisplayName = this.toValue > 1 ? this.units.find((item:UnitType) => item.name == this.toUnit)!.plural : this.toUnit;
          this.fromDisplayName = this.fromValue > 1 ? this.units.find((item:UnitType) => item.name == this.fromUnit)!.plural : this.fromUnit;
          this.showResult = true;
        }
        else {
          this.fromValue = null
        }
      }
    }
  }

  changeUnit(type: "from" | "to") {
    if(![this.fromUnit, this.toUnit].includes("")) {
      if (type == "from") {
        if (this.fromValue) {
          this.changeAmount('from');
        }
        else if(this.toValue) {
          this.changeAmount('to');
        }
        else {
          this.toValue = null
        }
      }
      else {
        if (this.toValue) {
          this.changeAmount('to');
        }
        else if(this.fromValue) {
          this.changeAmount('from');
        }
        else {
          this.fromValue = null
        }
      }
    }
  }

  convert(value: number, fromUnit: string, toUnit: string): number {
    let from: UnitType = this.units.find((item: { name: string, nickname: string, weight: number }) => {
      return item.name == fromUnit
    })!;
    let to: UnitType = this.units.find((item: { name: string, nickname: string, weight: number }) => {
      return item.name == toUnit
    })!;
    return value * to.weight / from.weight;
  }
}
