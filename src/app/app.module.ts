import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WeatherInfoComponent } from './components/weather-info/weather-info.component';
import { UnitSelectorComponent } from './components/unit-selector/unit-selector.component';
import { CitySelectorComponent } from './components/city-selector/city-selector.component';
import { SunSelectorComponent } from './components/sun-selector/sun-selector.component';
import { WeatherService } from './services/weather.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from '../app/interceptors/http.error-handler.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    WeatherInfoComponent,
    UnitSelectorComponent,
    CitySelectorComponent,
    SunSelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  providers: [WeatherService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
