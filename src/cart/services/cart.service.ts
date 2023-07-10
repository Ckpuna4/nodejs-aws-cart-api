import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { Cart } from '../models';
import {addNewCart, getCartWithItemsByUserId, removeCartByUserId} from "../db-client";

@Injectable()
export class CartService {
  private userCarts: Record<string, Cart> = {};

  async findByUserId(userId: string): Promise<Cart | null> {
    return getCartWithItemsByUserId(userId);
    // return this.userCarts[userId];
  }

  async createByUserId(userId: string) {
    const id = v4();
    const userCart = {
      id,
      items: [],
    };

    // this.userCarts[ userId ] = userCart;
    await addNewCart(userId, id);

    return userCart;
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(userId: string, {items}: Cart): Promise<Cart> {
    const {id, ...rest} = await this.findOrCreateByUserId(userId);

    const updatedCart = {
      id,
      ...rest,
      items: [...items],
    }

    this.userCarts[userId] = {...updatedCart};

    return {...updatedCart};
  }

  async removeByUserId(userId): Promise<void> {
    return removeCartByUserId(userId);
    // this.userCarts[ userId ] = null;
  }

}
