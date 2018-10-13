import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private readonly URL = environment.apiUrl + 'messages';

  constructor(private http: HttpClient) { }

  find(params?) {
    return this.http.get<Message[]>(this.URL, {params});
  }
}
