import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/common/book';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute } from '@angular/router';
import { NgbPaginationConfig } from "@ng-bootstrap/ng-bootstrap";
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-book-list',
  //templateUrl: './book-list.component.html',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[];
  price: number=0;
  quantity: number=0;
  currentCategoryId: number = 1;
  previousCategory: number = 1;
  searchMode: boolean = false;
  //new properties for server side pagination
  currentPage: number = 1;
  pageSize: number = 5;
  totalRecords: number = 0;


  //=======================
  //------- client side pagination-------
  // pageOfItems: Array<Book>;
  // pageSize: number = 6;
  constructor(private _bookService: BookService,
    private _activatedRoute: ActivatedRoute,
    private _cartService: CartService,
    private _spinnerService: NgxSpinnerService,
    _config: NgbPaginationConfig,
  ) {
    _config.maxSize = 3;
    _config.boundaryLinks = true;
    //for page numbers appearance and the boundary links like arrow of next prev

  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(() => {
      this.listBooks(); //get books when route activated only
    })
  }
  //-----client side---- pagination
  // pageClick(pageOfItems: Array<Book>) {
  //   this.pageOfItems = pageOfItems;
  //   //update the current page of items

  // }
  updatePageSize(pageSize: number) {
    //client side pagination add page size and current page 
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.listBooks();
  }
  listBooks() {
    //spinner 
    this._spinnerService.show();
    this.searchMode = this._activatedRoute.snapshot.paramMap.has("keyword");
    if (this.searchMode) {
      this.handleSearchtBooks();
      //if url contains the searched keyword call search method to display searched book
    }
    else {
      this.handleListBooks();
      //if url contains id call list books method to display the books
    }

  }
  handleSearchtBooks() {
    const keyword: string = this._activatedRoute.snapshot.paramMap.get("keyword");
    this._bookService.searchBooks(keyword,
      this.currentPage - 1,
      this.pageSize,
    ).subscribe(
      this.processPagination()
    );
  }

  handleListBooks() {

    const hasCategoryId: boolean = this._activatedRoute.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.currentCategoryId = +this._activatedRoute.snapshot.paramMap.get('id');
    }
    else {
      this.currentCategoryId = 1;
    }
    //setting up the current page to 1
    //if user navigate to another category
    if (this.previousCategory != this.currentCategoryId) {
      this.currentPage = 1
    }
    this.previousCategory = this.currentCategoryId;


    this._bookService.getBooks(this.currentCategoryId, this.currentPage - 1,
      this.pageSize).subscribe(
        this.processPagination()
      );
  }
  processPagination() {
    //hide spinner loader
    this._spinnerService.hide();
    return data => {
      setTimeout(() => {
        this.books = data._embedded.books;
        //page number starts from one index in angular
        this.currentPage = data.page.number + 1;
        this.totalRecords = data.page.totalElements;
        this.pageSize = data.page.size;
      }, 1000);
    }
  }
  addToCart(book: Book) {

    const cartItem = new CartItem(book);
    this._cartService.addToCart(cartItem);
    this._cartService.itemPrice.subscribe(
      data => this.price = data
    );
    this._cartService.itemQuantity.subscribe(
      data => this.quantity = data
    );

  }
  removeFromCart(book: Book) {

    const cartItem = new CartItem(book);
    this._cartService.removeFromCart(cartItem);
    this._cartService.itemPrice.subscribe(
      data => this.price = data
    );
    this._cartService.itemQuantity.subscribe(
      data => this.quantity = data
    );

  }
}
