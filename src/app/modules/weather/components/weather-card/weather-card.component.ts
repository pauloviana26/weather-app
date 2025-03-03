import { Component, Input, OnInit } from '@angular/core';
import { WeatherDatas } from '../../../../models/interfaces/WeatherDatas';
import { faDroplet, faTemperatureHigh, faTemperatureLow, faWind } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-weather-card',
  imports: [ CommonModule, FontAwesomeModule ],
  templateUrl: './weather-card.component.html',
  styleUrls: []
})
export class WeatherCardComponent {

  @Input() weatherDataInput!: WeatherDatas;

  minTemperatureIcon = faTemperatureLow;
  maxTemperatureIcon = faTemperatureHigh;
  humidityIcon = faDroplet;
  windIcon = faWind;

}
