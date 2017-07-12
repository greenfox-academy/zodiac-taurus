import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { HeaderComponent } from '../header/header.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DataService } from '../data.service'; //testData
import { CapitalizefirstPipe } from '../capitalizefirst.pipe';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  error: string;
  rooms = [];
  p: number = 1;
  route: string;

  constructor( private dataService: DataService, private httpService: HttpService, private router: Router ) {
    this.listRooms();
    this.dataService.user_id = JSON.parse(atob(this.tokenSplit())).id;
  }

  ngOnInit() { }

  listRooms() {
    this.httpService.listAllRoom().subscribe(
      (response) => this.listRoom(response),
      (error) => console.log(error)
    );
  }

  listRoom(response) {
    response.json().forEach(function(elem) {
      console.log(elem);
      if (elem.status !== 2) {
        this.rooms.push(elem);
      }
    }.bind(this));
    return this.rooms;
  }

  tokenSplit() {
    return localStorage.getItem('token').split('.')[1];
  }

  createRoomButton() {
    let name = JSON.parse(atob(this.tokenSplit())).user;
    let obj = {
      name: name
    }
    this.httpService.createRoom(obj).subscribe(
      (response) => console.log('createrooom: ',response.json()),
      (error) => console.log(error)
    );
    this.listRooms();
  }

  enterToRoom(data) {
    this.dataService.id = data.id;
    this.dataService.image_url = data.image_url;
    this.dataService.name = data.name;
    this.httpService.enterRoom(this.dataService.id).subscribe(
      (response) => this.checkRoomRoute(response),
      (error) => console.log(error)
    );
  }

  checkRoomRoute(data) {
    if (this.dataService.user_id === parseInt(data.json().drawer_user_id)) {
      console.log('enter');
      this.router.navigate(['draw']);
    } else {
      if ( data.json().status === 0 ) {
        let obj = {
          'status': 1,
          'guesser_user_id': "",
          'guesser_joined_at': ""
        };
        console.log(obj);
        this.httpService.guesserJoin(obj, this.dataService.id).subscribe(
          (response) => console.log('status: ', response),
          (error) => console.log(error)
        );
        this.router.navigate(['guessing']);
      } else if ( data.json().status === 1 ){
        this.router.navigate(['/']);
      }
    }
  }
}