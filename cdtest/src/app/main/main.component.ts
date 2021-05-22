import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../shared/auth.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public modal: boolean = false;

  clickedModalClose(){
    this.modal = false;
  }

  clickedModal() {
    this.modal = true;
  }
  constructor(private router: Router, public authService: AuthService){
  };
  ngOnInit(): void {
  }

  logout() {
    this.authService.SignOut();
  }

}
