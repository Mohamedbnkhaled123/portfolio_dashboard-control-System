//adminContact.ts
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { IContact } from '../../pages/contact/contact.model';
import { EmailValidators } from '../../validators/emailValidator';

@Component({
  selector: 'app-dashboard-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './adminContact.html',
  styleUrl: './adminContact.css',
})
export class AdminContact implements OnInit {
  contactData!: IContact;
  myForm!: FormGroup;

  constructor(private contactService: ContactService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      emailContact:    new FormControl('', [Validators.required, EmailValidators.validEmail()]),
      locationContact: new FormControl(''),
      contactDisc:     new FormControl(''),
    });

    this.contactService.getContactData().subscribe({
      next: (response) => {
        if (response.success) {
          this.contactData = response.data;
          this.myForm.patchValue(this.contactData);
          this.cdr.detectChanges();
        }
      },
      error: (err) => console.error('Error loading contact data:', err)
    });
  }

  onSubmit(): void {
    if (this.myForm.invalid) return;
    const updatedData: IContact = { ...this.contactData, ...this.myForm.value };
    this.contactService.updateContactData(updatedData).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Contact data updated successfully!');
          this.contactData = response.data;
          this.cdr.detectChanges();
        }
      },
      error: (err) => console.error('Error updating contact data:', err)
    });
  }
}
