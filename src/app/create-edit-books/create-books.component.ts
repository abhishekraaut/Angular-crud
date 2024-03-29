import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookDataService } from '../book-data.service';
import { ShowBooksComponent } from '../show-books/show-books.component';

@Component({
  selector: 'app-create-books',
  templateUrl: './create-books.component.html',
  styleUrls: ['./create-books.component.scss']
})
export class CreateBooksComponent implements OnInit {
  @ViewChild(ShowBooksComponent) _showBooksComponent: ShowBooksComponent;
  reactiveForm: FormGroup;

  constructor(private fb: FormBuilder, private _service: BookDataService, private _changeDetect: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.makeForm();
  }

  makeForm() {
    this.reactiveForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: ['', Validators.required],
      publicationYear: ['', [Validators.required]],
      isbn: ['', [Validators.required, Validators.pattern('[0-9\-]*')]]
    })
  }

  sendData() {
    const obj = this.reactiveForm.value;
    this._service.PostData(obj).subscribe(res => {
      // this.response = res.book;

      this._showBooksComponent.getBook();   //here i called child component method to show filled data in table.
      this.reactiveForm.reset();  //here i want form resent after post the data on server.
      this._changeDetect.detectChanges();  //here i want to detect change manually.
    })
  }

}




