import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/common/book';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: Book = new Book();
  price: number = 0;
  quantity: number = 0;
  cartItems: CartItem[] = [];
  constructor(private _activatedRoute: ActivatedRoute,
    private _bookService: BookService,
    private _cartService: CartService) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(
      () => {
        this.getBookInfo();  //subscribe because activated only when you get param
      }
    )
    this.cartItems = this._cartService.cartItems;
  }
  getBookInfo() {
    const id: number = +this._activatedRoute.snapshot.paramMap.get("id");
    this._bookService.get(id).subscribe(
      data => {
        this.book = data;
      }
    )
  }
  addToCart() {
    const cartItem = new CartItem(this.book);
    this._cartService.addToCart(cartItem);
    this._cartService.itemPrice.subscribe(
      data => this.price = data
    );
    this._cartService.itemQuantity.subscribe(
      data => this.quantity = data
    );

  }
  removeFromCart() {
    const cartItem = new CartItem(this.book);
    this._cartService.removeFromCart(cartItem);
    this._cartService.itemPrice.subscribe(
      data => this.price = data
    );
    this._cartService.itemQuantity.subscribe(
      data => this.quantity = data
    );

  }



}
