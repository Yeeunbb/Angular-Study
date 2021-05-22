import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Routes, Router, ActivatedRoute } from '@angular/router';
import Tank from '../models/tank.model';
import { TankService } from '../tank.service';
import { TankDetailsComponent } from '../tank-details/tank-details.component';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  tank?: Tank;
  id: string;
  public modal: boolean = false;
  @Output() refreshTank: EventEmitter<any> = new EventEmitter();

  currentTank: Tank = {
    tankName: '',
    speciesName: '',
    bounds: {
        DO: {
            isOutOfBounds: false,
            max: 0,
            min: 0,
        },
        EC: {
            isOutOfBounds: false,
            max: 0,
            min: 0,
        },
        PH: {
            isOutOfBounds: false,
            max: 0,
            min: 0,
        },
        RTD: {
            isOutOfBounds: false,
            max: 0,
            min: 0,
        }
    },
  }

  constructor(private tankService: TankService, private router: Router, route:ActivatedRoute){
    this.id = route.snapshot.params['id'];
    tankService.getTank(this.id).subscribe(data=>{
      this.tank = data;
    })
  };

  clickedModalClose(){
    this.modal = false;
  }

  clickedModal() {
    this.modal = true;
    this.currentTank = this.tank;
  }

  updateInfo(){
    const data = {
      bounds:{
        DO:{
          isOutOfBounds: this.checkTankNow(),
          min: this.currentTank.bounds.DO.min,
          max: this.currentTank.bounds.DO.max
        },
        EC:{
          isOutOfBounds: this.checkTankNow(),
          min: this.currentTank.bounds.EC.min,
          max: this.currentTank.bounds.EC.max
        },
        PH:{
          isOutOfBounds: this.checkTankNow(),
          min: this.currentTank.bounds.PH.min,
          max: this.currentTank.bounds.PH.max
        },
        RTD:{
          isOutOfBounds: this.checkTankNow(),
          min: this.currentTank.bounds.RTD.min,
          max: this.currentTank.bounds.RTD.max
        }
      },
      tankName: this.tank.tankName,
      speciesName: this.tank.speciesName
    };
      this.tankService.updateTank(this.id, data)
      .catch(err => console.log(err));
    console.log(data);
  }

  checkTankNow(): boolean {
    if(this.tank.bounds.DO.isOutOfBounds ||
      this.tank.bounds.EC.isOutOfBounds ||
      this.tank.bounds.PH.isOutOfBounds ||
      this.tank.bounds.RTD.isOutOfBounds) return false;
    else{
      return true;
    }
  }

  ngOnInit(): void {
  }
  
  ngOnChanges(): void {
    this.currentTank = {...this.tank};
  }

}
