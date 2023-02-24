import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HousePricePredictionService } from '../shared/http/house-price-prediction.http.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HousePricePredictionRequestDto } from '../shared/model/house-price-prediction-request-dto.model';
import { HousePricePredictionResponseDto } from '../shared/model/house-price-prediction-response-dto.model';

@Component({
  selector: 'app-house-price-prediction',
  templateUrl: './house-price-prediction.component.html',
  styleUrls: ['./house-price-prediction.component.css']
})
export class HousePricePredictionComponent implements OnInit {

  housePricePredictionForm: FormGroup;
  zipcodeList: string[] = [];
  housePricePredictionResponseDto: HousePricePredictionResponseDto | undefined;
  isLoading: boolean = false;
  filteredOptions: Observable<string[]> | undefined;

  constructor(
    private _formBuilder: FormBuilder,
    private housePricePredictionService: HousePricePredictionService
  ) {
    this.housePricePredictionForm = this._formBuilder.group({
      date: ['', Validators.required],
      zipcode: ['', [Validators.required, Validators.pattern('[0-9]+')]]
    });
  }

  ngOnInit(): void {
    this.housePricePredictionService.getZipcodes().subscribe(data => {
      if (data) {
        this.zipcodeList = data.zipcode_list;
        this.filteredOptions = new Observable((subscriber) => {
          subscriber.next(this.getTopTenFromList(this.zipcodeList));
        });
      }
    });

    this.filteredOptions = this.housePricePredictionForm.controls.zipcode.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.housePricePredictionForm.controls.zipcode.valueChanges.subscribe(zipcode => {
      this.housePricePredictionResponseDto = undefined;
      if (String(zipcode).trim().length === 0) {
        this.housePricePredictionForm.controls.zipcode.setErrors({ required: true });
      }
      else if (!this.zipcodeList.includes(zipcode)) {
        this.housePricePredictionForm.controls.zipcode.setErrors({ zipcodeNotInList: true });
      }
    });

    this.housePricePredictionForm.controls.date.valueChanges.subscribe(() => {
      this.housePricePredictionResponseDto = undefined;
    });
  }

  submit(): void {
    this.housePricePredictionResponseDto = undefined;
    this.isLoading = true;
    setTimeout(() => {
      this.predictHousePrice();
    }, 1000);
  }

  predictHousePrice(): void {
    let date: Date = this.housePricePredictionForm.controls.date.value;
    let housePricePredictionRequestDto: HousePricePredictionRequestDto = new HousePricePredictionRequestDto(
      date.getFullYear(), date.getMonth() + 1, date.getDate(), this.housePricePredictionForm.controls.zipcode.value
    );

    console.log(housePricePredictionRequestDto);
    this.housePricePredictionService.predictHousePrice(housePricePredictionRequestDto).subscribe((data: HousePricePredictionResponseDto) => {
      if (data) {
        this.housePricePredictionResponseDto = data;
      }
      this.isLoading = false;
    });
  }

  private _filter(value: string): string[] {
    let filteredValue = this.zipcodeList.filter(zipcode => String(zipcode).includes(value))
    return this.getTopTenFromList(filteredValue);
  }

  private getTopTenFromList(value: string[]): string[] {
    return value.slice(0, 10);
  }

}
