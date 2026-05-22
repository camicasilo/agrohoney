import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // CQRS Architecture:
    // Instead of querying the Medusa API, we query MeiliSearch (Layer 4) for blazing fast reads.
    const fetchProductsFromMeili = async () => {
      try {
        const response = await fetch('http://search.agrohoney.com/indexes/products/search', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ q: '', limit: 10 })
        });
        const data = await response.json();
        setProducts(data.hits || []);
      } catch (error) {
        console.error('Error fetching from MeiliSearch:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsFromMeili();
  }, []);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <h1>AgroHoney Storefront (Next.js)</h1>
      <p>Architecture: CQRS 5 Layers. Fetching from MeiliSearch.</p>

      {loading ? (
        <p>Cargando productos ultrarápido...</p>
      ) : (
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
          {products.map(product => (
            <div key={product.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
