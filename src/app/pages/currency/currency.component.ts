import { Component, OnInit, ViewChild } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {
  fetchingData: boolean = true;
  fetchingConversionRate: boolean = true;
  currencies: Array<any> = [];
  baseAmount: number | null = null;
  baseCurrency: any = "";
  targetAmount: number | null = null;
  targetCurrency: any = "";
  conversionRate: number = 1;
  @ViewChild('chart') chart!: any;
  constructor(
    public currencyService: CurrencyService
  ) { }


  ngOnInit(): void {
    this.getCurrencies();
  }

  checkFormat(event: any) {
    return (/^\d+$/.test(event.key));
  }

  getCurrencies() {
    this.fetchingData = true;
    this.currencyService.getCurrencies().subscribe(
      (res: any) => {
        if (res.success) {
          this.currencies = Object.values(res.symbols);

          // Sort array
          this.currencies.sort(function (a: any, b: any) {
            var nameA = a.description.toUpperCase();
            var nameB = b.description.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            // names must be equal
            return 0;
          })

          this.fetchingData = false;
        }
        else {
          this.currencies = [];
          this.fetchingData = false;
        }
      }, 
      (error:any) => {
        this.currencies = [];
          this.fetchingData = false;
      }
    )
  }

  changeAmount(type: "from" | "to") {
    if (![this.baseCurrency, this.targetCurrency].includes("")) {
      if (type == "from") {
        if (this.baseAmount) {
          this.targetAmount = this.baseAmount * this.conversionRate;
        }
        else {
          this.targetAmount = null;
        }
      }
      else {
        if (this.targetAmount) {
          this.baseAmount = this.targetAmount / this.conversionRate
        }
        else {
          this.baseAmount = null
        }
      }
    }

  }

  async getConversionRate(type: "from" | "to") {
    this.fetchingConversionRate = true;
    if (![this.baseCurrency, this.targetCurrency].includes("")) {
      try {
        // Get Latest conversion rate
        let res: any = await this.currencyService.convert(1, this.baseCurrency.code, this.targetCurrency.code).toPromise();
        if (res.success) {
          this.conversionRate = res.info.rate;

          if (type == "from") {
            this.baseAmount = this.baseAmount ? this.baseAmount : 1;
          }
          else {
            this.targetAmount = this.targetAmount ? this.targetAmount : this.conversionRate;
          }
          this.changeAmount(type);
        }
        

        // Get trend chart
        let current: Date = new Date();
        let toDate: string = current.toISOString().split('T')[0];

        // Get trend for 1 month
        current.setMonth(current.getMonth() - 1);
        let fromDate: string = current.toISOString().split('T')[0];
        this.currencyService.getTimeSeries(this.baseCurrency.code, this.targetCurrency.code, fromDate, toDate).subscribe(
          (res: any) => {
            if (res.success) {
              let labels: Array<string> = Object.keys(res.rates);
              let rawData = Object.values(res.rates);
              let data: Array<number> = [];
              rawData.forEach((item: any) => data.push(item[this.targetCurrency.code]));
              this.fetchingConversionRate = false;
              setTimeout(() => {
                this.loadChart(labels, data);
              }, 100);
            }
          }
        )
      }
      catch (e) {
        this.conversionRate = 0;
      }
    }
  }

  // Load Chart to show currency trend
  loadChart(labels: Array<string>, data: Array<number>) {
    new Chart(this.chart.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: 'rgba(72, 69, 237, .3)',
          borderColor: '#4845ed',
          borderWidth: 2,
          pointRadius: 1,
          pointHoverRadius: 2,
          fill: 'origin',
          tension: 0.3
        }]
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false,
              borderColor: '#E5E9F1'
            },
            ticks: {
              color: '#9AA3B6',
              autoSkip: true,
              maxTicksLimit: 3,
              font: {
                size: 10
              },
            }
          },
          y: {
            grid: {
              drawBorder: false,
              color: '#E5E9F1',
            },
            ticks: {
              color: '#9AA3B6',
              count: 4,
              font: {
                size: 10
              },
              callback: function (value: any) {
                return Math.round((value + Number.EPSILON) * 100) / 100;
              }
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
        },
      }
    });
  }
}
