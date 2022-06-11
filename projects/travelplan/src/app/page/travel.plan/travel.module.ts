import { TravelRoutes } from './travel.routes';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TravelComponent } from './travel.component';
import { MatButtonModule } from '@angular/material/button';
import { ViewMapModule } from '../../core/view.map';
import { LocationInputModule } from '../../core/location.input';

@NgModule({
  declarations: [
    TravelComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    ViewMapModule,
    LocationInputModule,
    RouterModule.forChild(TravelRoutes)
  ]
})
export class TravelModule { }
