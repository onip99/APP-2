import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Confronta Prezzi — MVP',
  description: 'Confronta prezzi e condizioni e vai al negozio',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial' }}>
        <header style={{ padding: '12px 16px', borderBottom: '1px solid #eee' }}>
          <strong>Confronta Prezzi</strong> <span style={{ color: '#777' }}>MVP</span>
        </header>
        <main style={{ maxWidth: 980, margin: '0 auto', padding: 16 }}>{children}</main>
        <footer style={{ padding: 24, color: '#777', fontSize: 12, textAlign: 'center' }}>
          © {new Date().getFullYear()} — MVP gratuito
        </footer>
      </body>
    </html>
  );
}
