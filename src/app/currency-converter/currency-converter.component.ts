import {Component, OnInit} from '@angular/core';
import {CurrencyService} from "../currency.service";

interface Currency {
  code: string;
  value: number;
}

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent implements OnInit {
  currencies: Currency[];
  fromCurrency = 'UAH';
  toCurrency = 'EUR';
  amountToConvert = 1;
  convertedAmount: number;

  constructor(private currencyService: CurrencyService) {
  }

  convert(): void {
    const fromCurrencyValue = this.currencies.find(curr => curr.code === this.fromCurrency)?.value;
    const toCurrencyValue = this.currencies.find(curr => curr.code === this.toCurrency)?.value;
    this.convertedAmount = fromCurrencyValue && toCurrencyValue ? (this.amountToConvert / fromCurrencyValue) * toCurrencyValue : undefined;
  }

  swapCurrencies(): void {
    [this.fromCurrency, this.toCurrency] = [this.toCurrency, this.fromCurrency];
    this.convert();
  }

  ngOnInit() {
    this.currencyService.getCurrencyExchangeRates().subscribe((data) => {
      this.currencies = Object.values(data.data) as Currency[];
      this.convert();
    }, (error) => {
      console.error('Error fetching currency data:', error);
    });
  }
}
