import {Component, OnInit} from '@angular/core';
import {CurrencyService} from "../currency.service";
interface Currency {
  code: string;
  value: number;
}

interface CurrencyApiResponse {
  data: { [code: string]: Currency };
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  usdToUah: number;
  eurToUah: number;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.currencyService.getCurrencyExchangeRates().subscribe(
      (response: CurrencyApiResponse) => {
        const usdRate = response.data['USD']?.value;
        const eurRate = response.data['EUR']?.value;
        const uahRate = response.data['UAH']?.value;

        if (usdRate && uahRate) {
          this.usdToUah = uahRate / usdRate;
          this.eurToUah = uahRate / eurRate;
        }
      },
      (error) => {
        console.error(error)
      }
    );
  }
}
