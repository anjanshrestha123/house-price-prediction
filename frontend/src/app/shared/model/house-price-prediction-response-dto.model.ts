export class HousePricePredictionResponseDto {
    predicted_house_price_max: number;
    predicted_house_price_min: number;

    constructor(predicted_house_price_max:number, predicted_house_price_min:number){
        this.predicted_house_price_max = predicted_house_price_max;
        this.predicted_house_price_min = predicted_house_price_min;
    }
}