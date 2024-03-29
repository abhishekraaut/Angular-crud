import { Component, OnInit } from '@angular/core';
import { BookDataService } from '../book-data.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {
  oneResponse: any;
  updatedForm: FormGroup;

  constructor(private _service: BookDataService) {
    this._service.shareData.subscribe(data => {
      this.oneResponse = data;
    })
  }

  ngOnInit(): void {
    this.updatedForm = new FormGroup({
      title: new FormControl(`${this.oneResponse.title}`),
      author: new FormControl(this.oneResponse.author),
      description: new FormControl(this.oneResponse.description),
      publicationYear: new FormControl(`${this.oneResponse.publicationYear}`),
      isbn: new FormControl(this.oneResponse.isbn),
    })
  }

  editForm(id: number) {
    const updatedData = this.updatedForm.value;
    console.log("Abhishek, It is work", this.updatedForm.value);
    this._service.updateData(id, updatedData).subscribe(res => {
      console.log('updated data', res);

      location.reload();
    })
  }

}