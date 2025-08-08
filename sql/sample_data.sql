-- Dati di esempio (categoria: cuffie) per 3 retailer italiani

insert into retailers (id, name, url, logo_url) values
  ('00000000-0000-0000-0000-000000000001','MediaWorld','https://www.mediaworld.it',''),
  ('00000000-0000-0000-0000-000000000002','Unieuro','https://www.unieuro.it',''),
  ('00000000-0000-0000-0000-000000000003','Euronics','https://www.euronics.it','')
on conflict do nothing;

insert into products (id, brand, model, category, image_url) values
  ('10000000-0000-0000-0000-000000000001','Sony','WH-CH520','cuffie',''),
  ('10000000-0000-0000-0000-000000000002','JBL','Tune 510BT','cuffie',''),
  ('10000000-0000-0000-0000-000000000003','Apple','AirPods (2a gen)','cuffie','')
on conflict do nothing;

insert into offers (product_id, retailer_id, price, currency, availability, url) values
  ('10000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000001',39.99,'€','Disponibile','https://www.mediaworld.it'),
  ('10000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000002',44.99,'€','Disponibile','https://www.unieuro.it'),
  ('10000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000003',42.90,'€','Disponibile','https://www.euronics.it'),

  ('10000000-0000-0000-0000-000000000002','00000000-0000-0000-0000-000000000001',29.99,'€','Disponibile','https://www.mediaworld.it'),
  ('10000000-0000-0000-0000-000000000002','00000000-0000-0000-0000-000000000002',27.99,'€','Disponibile','https://www.unieuro.it'),

  ('10000000-0000-0000-0000-000000000003','00000000-0000-0000-0000-000000000003',119.00,'€','Disponibile','https://www.euronics.it')
;

insert into terms (retailer_id, warranty_months, return_days, shipping_days, notes) values
  ('00000000-0000-0000-0000-000000000001',24,14,3,'Reso in negozio e online'),
  ('00000000-0000-0000-0000-000000000002',24,14,4,'Reso entro 14gg'),
  ('00000000-0000-0000-0000-000000000003',24,14,5,'Reso con etichetta prepagata');
