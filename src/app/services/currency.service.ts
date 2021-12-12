import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  url: string = "https://api.exchangerate.host";
  constructor(public http: HttpClient) { }

  getCurrencies() {
    return this.http.get(`${this.url}/symbols`);
  }

  convert(value: number, baseCurrency: string, targetCurrency: string) {
    return this.http.get(`${this.url}/convert?from=${baseCurrency}&to=${targetCurrency}&amount=${value}&places=2`);
  }

  getTimeSeries(baseCurrency: string, targetCurrency: string, fromDate: string, toDate: string) {
    return this.http.get(`${this.url}/timeseries?start_date=${fromDate}&end_date=${toDate}&base=${baseCurrency}&symbols=${targetCurrency}&places=2`);
  }
}
