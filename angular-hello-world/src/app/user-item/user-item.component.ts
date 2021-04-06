import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  @Input() name: string; //이름 프로퍼티 추가

  constructor() {
    this.name = 'Yeeun';
   }

  ngOnInit(): void {
  }

}
