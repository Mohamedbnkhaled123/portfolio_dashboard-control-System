//contact.ts
import { Component ,OnInit , ChangeDetectorRef } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { IContact } from './contact.model';
@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit{
 contactData!:IContact;
 constructor(private contactService:ContactService ,
  private cdr:ChangeDetectorRef){}

  ngOnInit():void{
    this.contactService.getContactData().subscribe({
      next: (response) => {
        if (response.success) {
          this.contactData = response.data;
          this.cdr.detectChanges();
        }
      },
      error: (err) => console.error('Error loading contact data:', err)
    })
  }
 
}
