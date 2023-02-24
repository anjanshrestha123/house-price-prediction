export class HousePricePredictionRequestDto {
    year: number;
    month: number;
    day: number;
    zipcode: number;

    constructor(year:number, month:number, day:number, zipcode: number){
        this.year = year;
        this.month = month;
        this.day = day;
        this.zipcode = zipcode;
    }
}