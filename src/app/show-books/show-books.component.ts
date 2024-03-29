import { Component, OnInit } from '@angular/core';
import { BookDataService } from '../book-data.service';
import { MatDialog } from '@angular/material/dialog';
import { EditBookComponent } from '../edit-book/edit-book.component';

@Component({
  selector: 'app-show-books',
  templateUrl: './show-books.component.html',
  styleUrls: ['./show-books.component.scss']
})
export class ShowBooksComponent implements OnInit {
  response: any = [];

  constructor(private _service: BookDataService, public _dialog: MatDialog) { }

  ngOnInit(): void {
    this.getBook();
  }

  //call api to fetch datas
  getBook() {
    this._service.getData().subscribe(res => {
      console.log(res.books);
      this.response = res.books;
    })
  }

  formUpdate(obj: any) {

    //call api to fetch one data by Id
    this._service.getDataById(obj).subscribe(oneData => {
      console.log("DataById", oneData.book);

      //share/send data to EditComponent for edit data
      this._service.sendData(oneData.book);

      const dialogComponent = this._dialog.open(EditBookComponent, {
        width: '800px',
        height: '500px',
        data: obj
      });
      dialogComponent.afterClosed().subscribe();
    })

  }

  deleteData(id: number) {
    this._service.deleteData(id).subscribe({
      next: (res) => {
        alert("Book deleted");
        this.getBook();
      },
      error: console.log,
    })
  }
}
