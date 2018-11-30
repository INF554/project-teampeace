import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BubbleChartComponent } from './bubble-chart/bubble-chart.component';
import { BubbleChart2Component } from './bubble-chart2/bubble-chart2.component';
import { BubbleChart3Component } from './bubble-chart3/bubble-chart3.component';
import { BubbleChart4Component } from './bubble-chart4/bubble-chart4.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { PieChart2Component } from './pie-chart2/pie-chart2.component';
import { PieChart3Component } from './pie-chart3/pie-chart3.component';
import { PieChart4Component } from './pie-chart4/pie-chart4.component';
import { LineChartComponent } from './line-chart/line-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    BubbleChartComponent,
    BubbleChart2Component,
    BubbleChart3Component,
    BubbleChart4Component,
    PieChartComponent,
    PieChart2Component,
    PieChart3Component,
    PieChart4Component,
    LineChartComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
