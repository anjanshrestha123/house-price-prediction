import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Zipcode } from '../model/zipcode-dto.model';
import { HousePricePredictionRequestDto } from '../model/house-price-prediction-request-dto.model';
import { HousePricePredictionResponseDto } from '../model/house-price-prediction-response-dto.model';

@Injectable({
  providedIn: 'root'
})
export class HousePricePredictionService {

  getZipcodeListUrl = 'get-zipcode-list';
  predictHousePriceUrl = 'predict-house-price';
  constructor(
    private http: HttpClient
  ) { }

  getZipcodes(): Observable<Zipcode> {
    return this.http.get<Zipcode>(environment.housePricePredictionBackendUrl + this.getZipcodeListUrl);
  }

  predictHousePrice(housePricePredictionRequestDto: HousePricePredictionRequestDto): Observable<HousePricePredictionResponseDto> {
    return this.http.post<HousePricePredictionResponseDto>(environment.housePricePredictionBackendUrl + this.predictHousePriceUrl, housePricePredictionRequestDto);
  }

}
