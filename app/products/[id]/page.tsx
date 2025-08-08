import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const productId = params.id;

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId)
    .single();

  const { data: offers } = await supabase
    .from('offers')
    .select('id, price, currency, availability, url, updated_at, retailers(name), product_id, retailer_id')
    .eq('product_id', productId)
    .order('price', { ascending: true });

  const { data: terms } = await supabase
    .from('terms')
    .select('*');

  const termsByRetailer = new Map(terms?.map(t => [t.retailer_id, t]));

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div>
        <Link href="/">← Torna</Link>
      </div>

      <h1>{product?.brand} {product?.model}</h1>

      <section className="card">
        <div style={{ flex: 1 }}>
          <h3>Prezzi</h3>
          <ul>
            {(offers || []).map((o: any) => {
              const t = termsByRetailer.get(o.retailer_id);
              return (
                <li key={o.id} style={{ marginBottom: 8, display: 'flex', justifyContent:'space-between', gap: 12 }}>
                  <div style={{minWidth: 140}}>
                    <div style={{ fontWeight: 600 }}>{o.retailers?.name}</div>
                    <div style={{ fontSize: 12, color: '#777' }}>{o.availability || 'Disponibilità n/d'}</div>
                  </div>
                  <div style={{ fontWeight: 700 }}>{o.price.toFixed(2)} {o.currency || '€'}</div>
                  <form action={async () => {
                    'use server';
                    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/click`, {
                      method: 'POST',
                      body: JSON.stringify({ offer_id: o.id }),
                    });
                  }}>
                    <a className="button" href={o.url} target="_blank">Vai al negozio</a>
                  </form>
                </li>
              )
            })}
          </ul>
        </div>

        <div style={{ width: 1, background: '#eee' }} />

        <div style={{ flex: 1 }}>
          <h3>Condizioni (per negozio)</h3>
          <ul>
            {(offers || []).map((o: any) => {
              const t: any = termsByRetailer.get(o.retailer_id);
              return (
                <li key={o.id} style={{ marginBottom: 8 }}>
                  <div style={{ fontWeight: 600 }}>{o.retailers?.name}</div>
                  <div className="badge">Reso: {t?.return_days ?? '—'} gg</div>{' '}
                  <span className="badge">Garanzia: {t?.warranty_months ?? '—'} mesi</span>{' '}
                  <span className="badge">Sped.: {t?.shipping_days ?? '—'} gg</span>
                  {t?.notes ? <div style={{ fontSize: 12, color: '#555', marginTop: 4 }}>{t.notes}</div> : null}
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}
