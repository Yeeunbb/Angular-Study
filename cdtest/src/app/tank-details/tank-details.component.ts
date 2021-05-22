import { Component, OnInit, Input } from '@angular/core';
import { TankService } from '../tank.service';
import Tank from '../models/tank.model'

@Component({
  selector: 'app-tank-details',
  templateUrl: './tank-details.component.html',
  styleUrls: ['./tank-details.component.css']
})
export class TankDetailsComponent implements OnInit {

  @Input() tank: Tank;
  isFine = false;

  constructor(private tankService: TankService) { 
  }

  ngOnInit(): void {
  }

  updateActive(isActive: boolean) {
    this.tankService
      .updateTank(this.tank.id, { active: isActive })
      .catch(err => console.log(err));
  }

  deleteTank() {
    
  }

  checkTank(): boolean {
    if(this.tank.sensor.DO < this.tank.bounds.DO.min ||
      this.tank.sensor.DO > this.tank.bounds.DO.max){
        this.tank.bounds.DO.isOutOfBounds = true;
      } 
    if(this.tank.sensor.EC < this.tank.bounds.EC.min ||
      this.tank.sensor.EC > this.tank.bounds.EC.max){
        this.tank.bounds.EC.isOutOfBounds = true;
      } 
    if(this.tank.sensor.PH < this.tank.bounds.PH.min ||
      this.tank.sensor.PH > this.tank.bounds.PH.max){
        this.tank.bounds.PH.isOutOfBounds = true;
      }
    if(this.tank.sensor.RTD < this.tank.bounds.RTD.min ||
      this.tank.sensor.RTD > this.tank.bounds.RTD.max){
        this.tank.bounds.RTD.isOutOfBounds = true;
      }

    if(this.tank.bounds.DO.isOutOfBounds ||
      this.tank.bounds.EC.isOutOfBounds ||
      this.tank.bounds.PH.isOutOfBounds ||
      this.tank.bounds.RTD.isOutOfBounds) return false;
    else{
      return true;
    }
  }
}
