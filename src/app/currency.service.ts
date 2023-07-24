import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface Currency {
  code: string;
  value: number;
}

interface CurrencyApiResponse {
  data: { [code: string]: Currency };
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = 'https://api.currencyapi.com/v3/latest';
  private apiKey = 'cur_live_NFcBFfH07XP9OuhLrofwWRTTCES08JHq9eXtwQAm';

  constructor(private http: HttpClient) { }
  getCurrencyExchangeRates(): Observable<CurrencyApiResponse> {
    const params = new HttpParams().set('apikey', this.apiKey);

    return this.http.get<CurrencyApiResponse>(this.apiUrl, { params }).pipe(
      catchError((error) => {
        console.error('An error occurred:', error);
        return throwError('Failed to fetch currency data. Please try again later.');
      })
    );
  }
}
