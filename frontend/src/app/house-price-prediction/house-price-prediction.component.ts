import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-house-price-prediction',
  templateUrl: './house-price-prediction.component.html',
  styleUrls: ['./house-price-prediction.component.css']
})
export class HousePricePredictionComponent implements OnInit {

  housePricePredictionForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder
    ) { 
      this.housePricePredictionForm = this._formBuilder.group({
        year: ['', Validators.required],
        month: ['', Validators.required],
        day: ['', [Validators.required, Validators.email]],
        zipcode: ['', Validators.pattern('[0-9]+')]
      });
    }

  ngOnInit(): void {

  }

}
