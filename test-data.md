INSERT INTO carts (id, user_id, created_at, updated_at, status)
VALUES
('1f4d2ef4-3c92-4e5b-bf27-61ae9c9b7b81', '2a7d30c0-78ef-4d2e-bc6c-98e748b7345a', '2023-07-10', '2023-07-10', 'OPEN'),
('3b6a5d6b-8a3c-4c1d-a6c8-72615f446d79', '7256cc63-b616-4e5e-8c13-991e759fc438', '2023-07-09', '2023-07-09', 'ORDERED');

INSERT INTO cart_items (cart_id, product_id, count)
VALUES
('1f4d2ef4-3c92-4e5b-bf27-61ae9c9b7b81', 'b5d55797-1f7a-4c26-9d2a-58a29313c7f1', 2),
('1f4d2ef4-3c92-4e5b-bf27-61ae9c9b7b81', 'c5576d2e-9019-4e34-9fd3-1e4e4aebd818', 1),
('3b6a5d6b-8a3c-4c1d-a6c8-72615f446d79', 'c5dc15f1-e4cc-4101-babc-b4023ca1423a', 3);
