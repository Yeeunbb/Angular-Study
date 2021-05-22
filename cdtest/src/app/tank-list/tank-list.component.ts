import { Component, OnInit } from '@angular/core';
import { TankService } from '../tank.service';
import { map } from 'rxjs/operators';
import Tank from '../models/tank.model';

@Component({
  selector: 'app-tank-list',
  templateUrl: './tank-list.component.html',
  styleUrls: ['./tank-list.component.css']
})
export class TankListComponent implements OnInit {
  tanks?: Tank[];


  constructor(private tankService: TankService) { }

  ngOnInit(): void {
    this.getTanksList();
  }

  getTanksList() {
    this.tankService.getTankList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.tanks = data;
    });
  }
}
