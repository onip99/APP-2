import Link from 'next/link';

export default function ProductCard({ p }: { p: any }) {
  return (
    <div className="card">
      <img alt={p.model} src={p.image_url || '/placeholder.png'} />
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 600 }}>{p.brand} {p.model}</div>
            <div className="badge">{p.category}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            {p.min_price != null ? (
              <>
                <div style={{ fontWeight: 700, fontSize: 18 }}>{p.min_price.toFixed(2)} {p.currency || '€'}</div>
                <div style={{ fontSize: 12, color: '#777' }}>da {p.min_retailer}</div>
              </>
            ) : <div style={{ fontSize: 12, color: '#777' }}>—</div>}
          </div>
        </div>
        <div style={{ marginTop: 8 }}>
          <Link className="button" href={`/products/${p.id}`}>Confronta</Link>
        </div>
      </div>
    </div>
  )
}
