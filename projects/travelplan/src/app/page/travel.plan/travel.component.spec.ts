import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { LocationInputModule } from '../../core/location.input';
import { ViewMapModule } from '../../core/view.map';
import { TravelComponent } from './travel.component';

describe('TravelComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TravelComponent
      ],
      imports: [
        CommonModule,
        MatButtonModule,
        ViewMapModule,
        LocationInputModule,
        HttpClientModule,
        RouterTestingModule,
        MatSnackBarModule
      ]
    }).compileComponents();
  });

  it('should create the page', () => {
    const fixture = TestBed.createComponent(TravelComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
