import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { WeatherDatas } from '../../../../models/interfaces/WeatherDatas';
import { Subject, takeUntil } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FormsModule } from '@angular/forms';
import { WeatherCardComponent } from '../../components/weather-card/weather-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-home',
  imports: [ FormsModule, FontAwesomeModule, WeatherCardComponent, CommonModule ],
  templateUrl: './weather-home.component.html',
  styleUrl: './weather-home.component.scss'
})
export class WeatherHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();

  initialCityName = 'Lisboa';
  weatherDatas!: WeatherDatas;
  searchIcon = faMagnifyingGlass;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeather(this.initialCityName);
  }

  getWeather(cityName: string) : void {
    this.weatherService.getWeatherData(cityName)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          response && (this.weatherDatas = response);
          console.log(this.weatherDatas);
        },
        error: (error) => console.log(error),
      });
  }

  onSubmit(): void {
    this.getWeather(this.initialCityName);
    console.log('CHAMOU FUNÇÃO');
    this.initialCityName = '';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
