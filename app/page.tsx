import { supabase } from '@/lib/supabaseClient';
import ProductCard from '@/components/ProductCard';

export default async function Home() {
  const { data: products, error } = await supabase
    .rpc('products_with_min_price'); // using a Postgres function for convenience

  if (error) {
    console.error(error);
  }

  return (
    <div>
      <h1 style={{ margin: '16px 0' }}>Prodotti</h1>
      <div className="grid">
        {products?.map((p: any) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}
