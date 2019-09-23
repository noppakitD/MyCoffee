import { Component } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { CoffeeService } from '../service/coffee.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data = [
    {
      totalCup: 'waiting',
      tempOfWater: 'waiting',
      crunching: 'waiting',
      alert: 'waiting'
    }
  ];
  
  results: Observable<any>;
  constructor(private api: CoffeeService) { 
   
  }
  async ngOnInit(){
    
    this.api.getLastValue();
    this.data = [{
      totalCup: this.api.sensorData[0],
      tempOfWater: this.api.sensorData[1],
      crunching: this.api.sensorData[2],
      alert: this.api.sensorData[3]
    }]
  }
  observableVar: Subscription;
  ionViewDidEnter() {
    interval(10000).subscribe(() => {
      this.api.getLastValue();
      console.log('test')
      this.data = [{
        totalCup: this.api.sensorData[0],
        tempOfWater: this.api.sensorData[1],
        crunching: this.api.sensorData[2],
        alert: this.api.sensorData[3]
      }]
      
      console.log(this.data)
      // this.results = this.api.getLastValue()
      // console.log(this.results)
    });
  }
}
