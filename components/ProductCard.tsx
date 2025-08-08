import React from 'react';

export default function ProductCard({ name, price }: { name: string; price: number }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{price} €</p>
    </div>
  );
}