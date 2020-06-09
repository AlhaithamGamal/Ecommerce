import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';
import { CurrencyPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();
  itemPrice: Subject<number> = new Subject<number>();
  itemQuantity: Subject<number> = new Subject<number>();


  constructor() { }
  addToCart(theCartItem: CartItem) {
    let itemQuantityValue: number = 0;
    let itemPriceValue: number = 0;
    //check whether book/item already in the cart
    let alreadyExistInCart: boolean = false;
    let existingCartItem: CartItem = undefined;
    if (this.cartItems.length > 0) {
      //find the book/item in the cart based on the id
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id == theCartItem.id);
      alreadyExistInCart = (existingCartItem != undefined);
    }
    if (alreadyExistInCart) {
      //increment the quantity and calculate price of one item
      existingCartItem.quantity++;
      itemQuantityValue = existingCartItem.quantity;
      itemPriceValue = existingCartItem.unitPrice * itemQuantityValue;
      this.itemQuantity.next(itemQuantityValue);
      this.itemPrice.next(itemPriceValue);

    }
    else {
      //add the cartitem array
      this.cartItems.push(theCartItem);
      itemQuantityValue = theCartItem.quantity;
      itemPriceValue = theCartItem.unitPrice * itemQuantityValue;
      this.itemQuantity.next(itemQuantityValue);
      this.itemPrice.next(itemPriceValue);
    }
    //calling calculate for total 
    this.calculateTotalPrice();
  }
  //----remove from cart
  removeFromCart(theCartItem: CartItem) {
    let itemQuantityValue: number = 0;
    let itemPriceValue: number = 0;
    //check whether book/item already in the cart
    let alreadyExistInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    //find the book/item in the cart based on the id
    existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id == theCartItem.id);

    //decrement the quantity and calculate price of one item
    if (existingCartItem.quantity > 0) {
      existingCartItem.quantity--;
    }
    if (existingCartItem.quantity == 0) {
      this.remove(existingCartItem); //when reach zero remove completely from cart
    }

    itemQuantityValue = existingCartItem.quantity;
    itemPriceValue = existingCartItem.unitPrice * itemQuantityValue;
    this.itemQuantity.next(itemQuantityValue);
    this.itemPrice.next(itemPriceValue);



    this.calculateTotalPrice();
  }
  decrementQuantity(cartItem: CartItem) {
    //same method like  removefromcart but from youtube and when item already exist in cart diff
    //from book details 
    cartItem.quantity--;
    if (cartItem.quantity == 0) {
      this.remove(cartItem);
    }
    else {
      this.calculateTotalPrice();
    }
  }

  //remove item from the cart completely

  remove(cartItem: CartItem) {
    const itemIndex = this.cartItems.findIndex((tempCartItem) => tempCartItem.id == cartItem.id);
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1); //remove from index first item 
      this.calculateTotalPrice() //update the price in cart
    }
  }
  calculateTotalPrice() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    //calculate the total price and total quantity
    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;

    }
    console.log("Total price:" + totalPriceValue + "Total quantity:" + totalQuantityValue);
    //publish the events
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

  }

  clearCart() {
    this.cartItems = [];
  }
}
