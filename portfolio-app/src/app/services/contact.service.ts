//contact.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IContact } from '../pages/contact/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiURl = 'http://localhost:5000/api/contact';
  constructor(private http: HttpClient) {}

  //get contact data
  getContactData(): Observable<{ success: boolean; data: IContact }> {
    return this.http.get<{ success: boolean; data: IContact }>(this.apiURl);
  }
  // Update contact data
  updateContactData(contactData: IContact): Observable<{ success: boolean; data: IContact }> {
    return this.http.put<{ success: boolean; data: IContact }>(this.apiURl, contactData);
  }
}
