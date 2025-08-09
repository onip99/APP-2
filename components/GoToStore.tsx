'use client';
export default function GoToStore({ offerId, url }: { offerId: string; url: string }) {
  async function handleClick() {
    try {
      await fetch('/api/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ offer_id: offerId }),
      });
    } catch (e) {
      console.error(e);
    } finally {
      window.open(url, '_blank');
    }
  }
  return <button onClick={handleClick}>Vai al negozio</button>;
}
