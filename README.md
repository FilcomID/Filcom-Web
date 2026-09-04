# Filcom.id — Website Statis

## Tentang folder ini

Folder `toptech/` ini berisi website statis **Filcom.id** yang dibangun di atas template Toptech, siap dipublikasikan ke GitHub Pages. Seluruh isi folder ini menjadi root repositori GitHub — `index.html` ditempatkan di level tertinggi.

## Cara publikasi ke GitHub Pages

### Langkah 1: Siapkan repositori GitHub
1. Buat repositori GitHub baru bernama `filcom.id` (atau sesuai pilihan).
2. Upload **SELURUH isi** folder `toptech/` ke branch `main` repositori tersebut.
3. Pastikan `index.html` berada di root repositori (bukan dalam subfolder).

### Langkah 2: Aktifkan GitHub Pages
1. Buka **Settings** → **Pages**.
2. Pilih **Deploy from a branch**.
3. Pilih branch `main` dan folder `/(root)`.
4. Simpan konfigurasi — GitHub akan menghasilkan URL sementara (misalnya `https://username.github.io/filcom.id`).

### Langkah 3: Koneksikan domain custom
1. Setelah domain `filcom.id` aktif, arahkan DNS ke GitHub Pages:
   - Buat record `A` menuju IP GitHub Pages (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`).
   - Atau gunakan `CNAME` menuju `username.github.io`.
2. Pastikan `canonical`, `sitemap.xml`, dan `og:url` sudah memakai `https://filcom.id/` — **sudah diset di semua halaman**.
3. Aktifkan **Enforce HTTPS** di pengaturan GitHub Pages.

### Langkah 4: Submit ke mesin pencari
- Submit `https://filcom.id/sitemap.xml` di [Google Search Console](https://search.google.com/search-console) setelah domain aktif.

---

## Yang harus dilengkapi pemilik sebelum/segera setelah launch

- [ ] **Logo Filcom.id** (format SVG + PNG) & favicon
  - Saat ini header/footer memakai **logo teks sementara** (tidak branded).
  - Favicon masih menggunakan file default template (`assets/images/fav-icon/icon.png`).
  - Letakkan logo SVG di `assets/images/logo.svg` dan PNG di `assets/images/logo.png`.
  - Update favicon di semua halaman: `<link rel="icon" href="assets/images/favicon.ico" type="image/x-icon">`.

- [ ] **Gambar Open Graph** (`assets/images/og-filcom.jpg`)
  - Ukuran: **1200 × 630 pixel** (rasio 1.91:1).
  - File ini dirujuk oleh tag `og:image` di semua halaman, tapi filenya belum ada.
  - Setelah upload, verifikasi dengan [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/sharing/).

- [ ] **NAP (Name, Address, Phone)** lengkap
  - Saat ini hanya "Jakarta" yang tersimpan.
  - Lengkapi: **nama resmi**, **alamat lengkap** (jalan, nomor, kota, provinsi), **kode pos**.
  - Gunakan data yang sama di `schema.org/LocalBusiness`, Google Business Profile, dan setiap halaman.

- [ ] **Akun media sosial** untuk breadcrumb `sameAs` di schema
  - Instagram (@filcom atau sesuai handle resmi).
  - LinkedIn (profil perusahaan atau URL halaman).
  - Cari `"sameAs"` dalam file HTML dan lengkapi URL-nya.

- [ ] **Google Analytics 4 + Google Tag Manager**
  - Cari tag `<!-- TODO GA4 -->` di bagian `<head>` setiap halaman.
  - Ganti dengan snippet `gtag.js` resmi dari GA4 (dapatkan di GA4 → Data streams).
  - Contoh:
    ```html
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXX');
    </script>
    ```
  - Form kontak sudah memanggil `window.gtag('event','generate_lead',...)` — akan aktif otomatis setelah gtag terpasang.

- [ ] **Verifikasi Google Search Console**
  - Login ke [Google Search Console](https://search.google.com/search-console).
  - Tambahkan property `https://filcom.id`.
  - Pilih metode verifikasi (DNS atau upload file HTML).
  - Submit sitemap: `https://filcom.id/sitemap.xml`.

- [ ] **Google Business Profile** (daftar & verifikasi)
  - Sumber leads lokal terbesar untuk jasa profesional.
  - Daftar di [google.com/business](https://www.google.com/business/).
  - Sesuaikan informasi dengan NAP yang sudah dilengkapi.
  - Verifikasi via SMS/telepon.

- [ ] **Foto profil tim** (opsional, menaikkan kepercayaan)
  - Halaman "Tentang Kami" saat ini tanpa foto profil.
  - Tambahkan foto profesional tim/pemilik untuk meningkatkan kredibilitas.

---

## Catatan teknis

### Kontak & Jam Operasional
| Elemen | Value |
|--------|-------|
| **WhatsApp** | `+62 877-8978-4423` |
| **Email** | `info@filcom.id` |
| **Jam operasional** | Senin–Jumat 09.00–17.00 WIB |

**Untuk mengubah**, gunakan **Find & Replace** di editor (Ctrl+H) untuk mencari di:
- Semua file `.html` di folder ini.
- `assets/js/filcom-form.js` (konstanta `WA` untuk WhatsApp).
- File lain yang merujuk kontak.

**Catatan**: `sitemap.xml` dan `robots.txt` tidak perlu diubah — tidak menyimpan kontak yang berubah.

### Bagaimana Form Kontak Bekerja
1. **Tanpa backend** — tidak ada server yang menerima data.
2. Alur: submit → validasi form → buka WhatsApp dengan ringkasan isian → tampilkan panel "Terima kasih".
3. Logika ada di file `assets/js/filcom-form.js` — aman untuk diaudit.
4. Data isian tidak disimpan di database — hanya diteruskan ke WhatsApp chat.

### Struktur halaman & URL
- **Beranda**: `index.html` (`/`).
- **Tentang Kami**: `tentang-kami/index.html` (`/tentang-kami/`).
- **Hub Layanan**: `layanan/index.html` (`/layanan/`).
  - **6 halaman layanan**: masing-masing di `layanan/<slug>/index.html`.
    - Contoh: `layanan/konsultasi-bisnis/`, `layanan/audit-keuangan/`, dst.
- **Hub Industri**: `industri/index.html` (`/industri/`).
  - **3 halaman industri**: masing-masing di `industri/<slug>/index.html`.
    - Contoh: `industri/retail/`, `industri/manufaktur/`, `industri/healthcare/`.
- **Hub Artikel**: `blog/index.html` (`/blog/`).
  - **1 artikel sample**: `blog/artikel-sample/index.html`.
  - Artikel tambahan akan ditambahkan ke folder ini.
- **Kontak**: `kontak/index.html` (`/kontak/`).
- **404**: `404.html` (dipanggil GitHub Pages otomatis untuk halaman yang tidak ditemukan).

---

## Ditunda (bukan penghalang launch)

- **Konversi gambar ke WebP** + audit Core Web Vitals
  - Template membawa jQuery dan beberapa library eksternal; optimisasi citra dan performa butuh pass tersendiri.
  - Prioritas: setelah launch stabil.

- **Artikel tambahan** (dari brief §6, "Keyword long-tail untuk artikel")
  - Daftar 12 judul siap dibuat.
  - Saat ini: 1 artikel sample yang sudah jadi.
  - Rencana: tambah 1 artikel per minggu setelah launch.

- **Halaman studi kasus / portofolio**
  - Menunggu materi & izin klien.
  - Template siap: folder `portfolio/` tinggal diisi konten.

---

## Checklist pre-launch cepat

Sebelum commit ke `main` dan aktivasi domain:

1. ✓ Periksa semua link (internal & eksternal) tidak ada yang broken.
2. ✓ Test form kontak: kirim satu pesan ujicoba ke WhatsApp.
3. ✓ Verifikasi URL canonical & sitemap pakai `https://filcom.id/`.
4. ✓ Screenshot halaman di mobile — pastikan responsive.
5. ✓ Buka di Private/Incognito window — verifikasi tidak ada konten cached.

---

**Status**: Website siap untuk dipublikasikan. Daftar di atas adalah yang paling urgent untuk performa SEO dan konversi leads lokal.
