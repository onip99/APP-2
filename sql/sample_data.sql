insert into products (name, description, image_url) values
('Laptop Pro', 'Un portatile potente per lavoro e gioco', 'https://via.placeholder.com/150'),
('Smartphone X', 'Telefono con fotocamera eccezionale', 'https://via.placeholder.com/150');

insert into offers (product_id, store_name, price, url)
select id, 'Tech Store', 1299.99, 'https://example.com/laptop-pro' from products where name = 'Laptop Pro';
insert into offers (product_id, store_name, price, url)
select id, 'Gadget World', 999.99, 'https://example.com/smartphone-x' from products where name = 'Smartphone X';
