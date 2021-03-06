import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { HomeComponent } from './home/home.component';

@Injectable()
export class HttpService {

  url:string = 'https://draw-and-guess-game-backend.herokuapp.com/'

  constructor(private http: Http) { }

  loginPostToServer(data) {
    return this.http.post(this.url + 'login', data);
  }

  registerPostToServer(data) {
    return this.http.post(this.url + 'register', data);
  } 

  listAllRoom() {
    const headers = new Headers({auth: localStorage.getItem('token')});
    return this.http.get(this.url + 'room', {headers: headers});
  }

  createRoom(data) {
    const headers = new Headers({auth: localStorage.getItem('token')})
    return this.http.post(this.url + 'room', data, {headers: headers});
  }

  getUser() {
    const headers = new Headers({auth: localStorage.getItem('token')})
    return this.http.get(this.url + 'user', {headers: headers});
  }

//should be renamed to getOneRoom
  enterRoom(data) {
    const headers = new Headers({auth: localStorage.getItem('token')})
    return this.http.get(this.url + 'room/' + data, {headers: headers}); //need data?!
  }

  sendImagetoServer(data, roomId) {
    const headers = new Headers({auth: localStorage.getItem('token')})
    // const body = JSON.stringify(data);
    return this.http.post(this.url + 'room/' + roomId + '/image', data, {headers: headers});
  }

  //should be renamed to changeDetailsInRoom
  guesserJoin(data, roomId) {
  const headers = new Headers({auth: localStorage.getItem('token')})
  return this.http.put(this.url + 'room/' + roomId, data, {headers: headers});
  }

  sendGuessPost(data, roomId) {
    const headers = new Headers({auth: localStorage.getItem('token')})
    return this.http.post(this.url + 'room/' + roomId + '/guess', data, {headers: headers});
  }

  pingTime(roomId) {
    const headers = new Headers({auth: localStorage.getItem('token')})
    return this.http.get(this.url + 'room/' + roomId + '/ping', {headers: headers});
  }

}