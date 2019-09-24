import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class CoffeeService {
  sensorData=<any>[];
  baseUrl = 'http://lab.mfec-iot.club:8181'
  user = 'admin@mfec.co.th';
  pass = 'P@ssw0rdMFEC2019';
  deviceId = 'fe96a7d0-d5f9-11e9-97da-f3a25bbbd3f7'
  constructor(private http: HttpClient,public toastController: ToastController) { }
  // fn name: GetTenantToken
  // description : Used for receiving tenant token  
  // author : noppakit dononbout
  // last update: 25/07/2562 "Access-Control-Allow-Origin": "*", 
  GetTenantToken() {
    let headers = new HttpHeaders().set("Access-Control-Allow-Origin", "* " )
    return this.http.post(this.baseUrl + '/api/auth/login', {
      username: this.user,
      password: this.pass
    },{ headers: headers })
  }//end fn GetTenantToken
 // http://lab.mfec-iot.club:8181/api/plugins/telemetry/DEVICE/fe96a7d0-d5f9-11e9-97da-f3a25bbbd3f7/values/timeseries?keys=Counter_Cup,Sensor_D_1
  async getLastValue() {
    return this.GetTenantToken().subscribe((get_tenant_token) => {
      let textCrunch;
      let headers = new HttpHeaders().set("x-Authorization", "Bearer " + get_tenant_token["token"])
      //   this.storage.set('headers', headers)
      // http://lab.mfec-iot.club:8181/api/plugins/telemetry/DEVICE/fe96a7d0-d5f9-11e9-97da-f3a25bbbd3f7/keys/timeseries
      this.http.get('http://lab.mfec-iot.club:8181/api/plugins/telemetry/DEVICE/fe96a7d0-d5f9-11e9-97da-f3a25bbbd3f7/values/timeseries?keys=Sensor_C_1,Counter_Cup,Sensor_X_1,Sensor_X_2', { headers: headers }).subscribe((respon)=>{
      console.log("success"); 
      console.log(respon);
      this.sensorData[4] = respon;
      this.sensorData[0] = respon['Counter_Cup'][0]['value'];
      this.sensorData[1] = respon['Sensor_C_1'][0]['value'];
      if(respon['Sensor_X_1'][0]['value']==1){
        textCrunch = 'Ready to cruch'
      }else{
        textCrunch = 'Now it working'
      }
      this.sensorData[2] = textCrunch;
      this.sensorData[3] = respon['Sensor_X_2'][0]['value'];
      console.log(respon['Counter_Cup'][0]['value']);
      console.log(respon['Sensor_C_1'][0]['value']);
      console.log(respon['Sensor_X_1'][0]['value']);
      console.log(respon['Sensor_X_2'][0]['value']);
      },
      async err => {
        // this.ErrorRegister(err);
        console.log("fail getdata");
        console.log(err);
        this.sensorData[4] = err;
      });
    },
    async err => {
      
      console.log("fail login")
      console.log(JSON.stringify(err));
      console.log(err);
      this.sensorData[4] = err;
    });
  }
   // fn name: ErrorRegister
  // description : alert Error from fn Re
  // author : noppakit dononbout
  // last update: 25/07/2562
  async ErrorRegister(message: string) {
    if (message == "ERROR!: createCustomer") {
      const toast = await this.toastController.create({
        message: 'Email already exists!.',
        duration: 2000
      });
      toast.present();
    } else {
      const toast = await this.toastController.create({
        message: message,
        duration: 2000
      });
      toast.present();
    }
  }//end fn ErrorRegister
  testApi(){
    //'https://jsonplaceholder.typicode.com/todos/1'
    this.http.get("https://jsonplaceholder.typicode.com/todos/1").subscribe((result)=>{
      console.log(JSON.stringify(result))
      this.sensorData[4] = JSON.stringify(result)
        
    })
  }
}
