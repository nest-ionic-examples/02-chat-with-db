import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Room } from '../models/room';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private http: HttpClient) { }

  find(params?) {
    return this.http.get<Room[]>(environment.apiUrl + 'rooms/', {params});
  }

  findById(id: string) {
    return this.http.get<Room>(environment.apiUrl + 'rooms/' + id);
  }

  save(item: Room) {
    return this.http.post(environment.apiUrl + 'rooms/', item);
  }
}
