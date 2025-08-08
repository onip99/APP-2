# Confronta Prezzi — MVP (gratis)

MVP gratuito per confrontare prezzi e condizioni (reso, garanzia, spedizione) e mandare l'utente al sito del negozio.

## 🔧 Stack (tutto free)
- **Next.js** (Vercel, piano gratuito)
- **Supabase** (Postgres, Auth, piano gratuito)
- **@supabase/supabase-js** (client)

## ▶️ Avvio locale
1. `cp .env.example .env.local` e incolla le tue chiavi di Supabase.
2. `npm install`
3. `npm run dev` e apri http://localhost:3000

## 🚀 Deploy gratis
1. Crea un progetto su **Supabase** → copia **Project URL** e **anon key**.
2. In Supabase → **SQL Editor** → incolla `sql/schema.sql` e **Esegui**.
3. (Opzionale) inserisci dati:
   - via SQL con `sql/sample_data.sql` **oppure**
   - importa i CSV in Supabase (Table editor → Import).
4. Metti il codice su **GitHub** (repo privata va bene).
5. In **Vercel** → Import da GitHub → aggiungi le Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Deploy → apri l'URL pubblico → sei online.

## 👀 Funzioni incluse
- Home: lista prodotti con prezzo minimo per ciascuno
- Dettaglio prodotto: tutte le offerte, tab Condizioni (reso/garanzia/spedizione) by retailer
- Click tracking: salva i click sui link “Vai al negozio”

## 🗂️ Struttura DB
- `retailers(id, name, url, logo_url)`
- `products(id, brand, model, category, image_url)`
- `offers(id, product_id, retailer_id, price, currency, availability, url, updated_at)`
- `terms(id, retailer_id, warranty_months, return_days, shipping_days, notes)`
- `clicks(id, offer_id, ts)`

## ✍️ Dati iniziali
Trovi CSV template in `data/`. Inizia con pochi prodotti (10–20) e 3–5 catene.

## 🔐 Note
- Usiamo solo la **anon key** di Supabase lato client.
- Le tabelle sono **readable** pubblicamente tramite policy RLS qui incluse (solo SELECT su public, INSERT sui click).
- Non c'è area admin (per tenerlo semplice & free). Inserisci dati via Supabase.
