import knex from 'knex';
import {Cart} from "./models";

const DB_ENDPOINT = process.env.DB_ENDPOINT!;
const DB_USER = process.env.DB_USER!;
const DB_PASSWORD = process.env.DB_PASSWORD!;
const DB_PORT = Number(process.env.DB_PORT!);
const DB_ID = process.env.DB_ID!;

const dbClient = knex({
    client: 'pg',
    connection: {
        host: DB_ENDPOINT,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_ID,
        port: DB_PORT
    },
});

interface CartDB {
    id: string;
    user_id: string;
    created_at: Date;
    updated_at: Date;
    status: 'OPEN' | 'ORDERED';
}

interface CartItemDB {
    cart_id: string;
    product_id: string;
    count: number;
}
export async function getCartWithItemsByUserId(userId: string): Promise<Cart> {
    const cart = await dbClient<CartDB>('carts').where('user_id', userId).first();
    if (!cart) {
        return null;
    }

    const items = await dbClient<CartItemDB>('cart_items').where('cart_id', cart.id);

    return {
        id: cart.id,
        items: items.map(({count, product_id}) => ({count, product: {id: product_id}}))
    }
}

export async function addNewCart(userId: string, cartId: string): Promise<void> {
    const cart: CartDB = {
        id: cartId,
        user_id: userId,
        created_at: new Date(),
        updated_at: new Date(),
        status: 'OPEN',
    };

    await dbClient('carts').insert(cart);
}

export async function removeCartByUserId(userId: string): Promise<void> {
    try {
        await dbClient.transaction(async (trx) => {
            // Retrieve the cart ID
            const cart = await trx('carts').where('user_id', userId).first();
            if (!cart) {
                return;
            }

            await trx('cart_items').where('cart_id', cart.id).del();
            await trx('carts').where('id', cart.id).del();
        });
    } catch (error) {
        console.error('Error:', error);
    }
}
