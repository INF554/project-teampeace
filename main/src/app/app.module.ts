import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { OwlModule } from 'angular-owl-carousel';

import { AppComponent } from './app.component';
// import { ChartComponent } from './chart/chart.component';
// import { PiechartComponent } from './piechart/piechart.component';
// import { BubblechartCirPackComponent } from './bubblechart-cir-pack/bubblechart-cir-pack.component';
// import { LinechartComponent } from './linechart/linechart.component';
// import { ChoroWorldMapInMilExpComponent } from './choro-world-map-in-mil-exp/choro-world-map-in-mil-exp.component';
// import { PropoWorldMapInMilExpComponent } from './propo-world-map-in-mil-exp/propo-world-map-in-mil-exp.component';
// import { ChoroLACountyMapInPopuComponent } from './choro-lacounty-map-in-popu/choro-lacounty-map-in-popu.component';
import { MidsworldmapComponent } from './midsworldmap/midsworldmap.component';
import { WarworldmapComponent } from './warworldmap/warworldmap.component';
import { MidsWarsTradeInfWorldComponent } from './mids-wars-trade-inf-world/mids-wars-trade-inf-world.component';
import { PiechartComponent } from './piechart/piechart.component';
import { ScatterComponent } from './scatter/scatter.component';
import { BubbleWarTradeComponent } from './bubble-war-trade/bubble-war-trade.component';
import { BubbleformajorpowComponent } from './bubbleformajorpow/bubbleformajorpow.component';
// import { ChomapmilgdpComponent } from './chomapmilgdp/chomapmilgdp.component';
import { PromapmilgdpComponent } from './promapmilgdp/promapmilgdp.component';
import { LinemilgdpComponent } from './linemilgdp/linemilgdp.component';
import { BarmilgdpComponent } from './barmilgdp/barmilgdp.component';
// import { ScatterSeComponent } from './scatter-se/scatter-se.component';
import { PiemilshareComponent } from './piemilshare/piemilshare.component';
// import { ReinbarComponent } from './reinbar/reinbar.component';


@NgModule({
  declarations: [
    AppComponent,
    // ChartComponent,
    // PiechartComponent,
    // BubblechartCirPackComponent,
    // LinechartComponent,
    // ChoroWorldMapInMilExpComponent,
    // PropoWorldMapInMilExpComponent,
    // ChoroLACountyMapInPopuComponent,
    MidsworldmapComponent,
    WarworldmapComponent,
    MidsWarsTradeInfWorldComponent,
    PiechartComponent,
    ScatterComponent,
    BubbleWarTradeComponent,
    BubbleformajorpowComponent,
    // ChomapmilgdpComponent,
    PromapmilgdpComponent,
    LinemilgdpComponent,
    BarmilgdpComponent,
    // ScatterSeComponent,
    PiemilshareComponent
    // ReinbarComponent
    
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
