import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
// import { ChartComponent } from './chart/chart.component';
// import { PiechartComponent } from './piechart/piechart.component';
// import { BubblechartCirPackComponent } from './bubblechart-cir-pack/bubblechart-cir-pack.component';
// import { LinechartComponent } from './linechart/linechart.component';
import { ChoroWorldMapInMilExpComponent } from './choro-world-map-in-mil-exp/choro-world-map-in-mil-exp.component';
import { PropoWorldMapInMilExpComponent } from './propo-world-map-in-mil-exp/propo-world-map-in-mil-exp.component';
import { ChoroLACountyMapInPopuComponent } from './choro-lacounty-map-in-popu/choro-lacounty-map-in-popu.component';
import { MidsworldmapComponent } from './midsworldmap/midsworldmap.component';
import { WarworldmapComponent } from './warworldmap/warworldmap.component';

@NgModule({
  declarations: [
    AppComponent,
    // ChartComponent,
    // PiechartComponent,
    // BubblechartCirPackComponent,
    // LinechartComponent,
    ChoroWorldMapInMilExpComponent,
    PropoWorldMapInMilExpComponent,
    ChoroLACountyMapInPopuComponent,
    MidsworldmapComponent,
    WarworldmapComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
