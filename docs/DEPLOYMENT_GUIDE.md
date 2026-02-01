
# Panduan Penyebaran Aplikasi Proyek Lapangan PWA

Dokumen ini memberikan instruksi langkah demi langkah untuk menyebarkan Proyek Lapangan PWA menggunakan dua platform populer: Google Cloud Run dan Vercel.

## Prasyarat

Sebelum memulai, pastikan Anda telah menginstal dan mengkonfigurasi perangkat berikut:

- **Node.js dan npm:** Diperlukan untuk menjalankan server web lokal.
- **Git:** Untuk manajemen versi dan mendorong ke GitHub.
- **Akun GitHub:** Diperlukan untuk kedua metode penyebaran.
- **Akun Google Cloud Platform (GCP):** Dengan penagihan diaktifkan, diperlukan untuk Google Cloud Run.
- **Google Cloud SDK (`gcloud` CLI):** Terinstal dan diautentikasi (`gcloud auth login`).
- **Docker Desktop:** Diperlukan untuk membangun gambar kontainer untuk Cloud Run.
- **Akun Vercel:** Diperlukan untuk penyebaran Vercel.

---

## Opsi 1: Menyebarkan ke Google Cloud Run

Metode ini mengemas aplikasi Anda ke dalam kontainer Docker dan menjalankannya di lingkungan terkelola tanpa server Google. Ini ideal untuk skalabilitas dan integrasi dengan ekosistem GCP lainnya.

### Langkah 1: Dorong Kode Anda ke GitHub

Jika Anda belum melakukannya, inisialisasi repositori git, komit file Anda, dan dorong ke repositori GitHub baru.

```bash
git init
git add .
git commit -m "Initial commit for deployment"
# Ikuti instruksi di GitHub untuk membuat repositori baru dan mendorong kode Anda
git remote add origin https://github.com/USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

### Langkah 2: Bangun dan Dorong Gambar Docker

Kita akan menggunakan Docker untuk mengemas aplikasi kita dengan server web Express sederhana.

1.  **Aktifkan API yang Diperlukan di GCP:**
    Pastikan **Cloud Run API** dan **Artifact Registry API** diaktifkan di proyek GCP Anda.

2.  **Buat Repositori Artifact Registry:**
    Artifact Registry adalah tempat kita akan menyimpan gambar Docker kita.

    ```bash
    gcloud artifacts repositories create DOCKER_REPO_NAME \
        --repository-format=docker \
        --location=GCP_REGION \
        --description="Docker repository for Proyek PWA"
    ```
    Ganti `DOCKER_REPO_NAME` (misalnya, `proyek-app-repo`) dan `GCP_REGION` (misalnya, `asia-southeast1`).

3.  **Konfigurasi Docker:**
    Konfigurasikan Docker untuk mengotentikasi dengan Artifact Registry.

    ```bash
    gcloud auth configure-docker GCP_REGION-docker.pkg.dev
    ```

4.  **Bangun Gambar Docker:**
    Dari direktori root proyek Anda (di mana `Dockerfile` berada), jalankan perintah berikut.

    ```bash
    # Format: REGION-docker.pkg.dev/PROJECT_ID/REPO_NAME/IMAGE_NAME:TAG
    export IMAGE_URI=GCP_REGION-docker.pkg.dev/GCP_PROJECT_ID/DOCKER_REPO_NAME/proyek-pwa:latest
    
    docker build -t $IMAGE_URI .
    ```
    Ganti `GCP_REGION`, `GCP_PROJECT_ID`, dan `DOCKER_REPO_NAME` dengan nilai Anda.

5.  **Dorong Gambar Docker:**
    Dorong gambar yang baru dibangun ke Artifact Registry.

    ```bash
    docker push $IMAGE_URI
    ```

### Langkah 3: Sebarkan ke Cloud Run

Sekarang sebarkan gambar dari Artifact Registry ke Cloud Run.

```bash
gcloud run deploy proyek-pwa-service \
    --image=$IMAGE_URI \
    --platform=managed \
    --region=GCP_REGION \
    --allow-unauthenticated
```
- Ganti `proyek-pwa-service` dengan nama layanan yang Anda inginkan.
- `--allow-unauthenticated` membuat layanan Anda dapat diakses secara publik.

Setelah perintah selesai, `gcloud` akan memberikan URL di mana aplikasi Anda sekarang aktif.

---

## Opsi 2: Menyebarkan ke Vercel melalui GitHub

Metode ini sangat ramah pengembang dan menawarkan alur kerja CI/CD yang mulus. Setiap kali Anda mendorong ke cabang `main` Anda, Vercel akan secara otomatis menyebarkan pembaruan.

### Langkah 1: Dorong Kode Anda ke GitHub

Jika Anda belum melakukannya, ikuti Langkah 1 dari panduan Cloud Run untuk mendorong kode Anda ke repositori GitHub.

### Langkah 2: Buat Proyek Vercel Baru

1.  **Masuk ke Vercel:** Gunakan akun GitHub Anda untuk masuk ke [Vercel](https://vercel.com).
2.  **Impor Proyek:**
    - Dari dasbor Anda, klik **"Add New..."** -> **"Project"**.
    - Temukan dan pilih repositori GitHub Anda dari daftar dan klik **"Import"**.
3.  **Konfigurasikan Proyek:**
    Vercel pandai mendeteksi kerangka kerja, tetapi karena aplikasi kita tidak memiliki langkah *build* tradisional (semua dependensi dimuat melalui CDN), kita perlu mengkonfigurasinya secara manual.

    - **Framework Preset:** Pilih **`Other`**.
    - **Build and Output Settings:**
        - **Build Command:** Biarkan kosong atau matikan.
        - **Output Directory:** Biarkan kosong atau matikan.
        - **Install Command:** Biarkan `npm install` atau yang setara. Vercel akan menginstal dependensi yang tercantum di `package.json` (dalam kasus ini, `express`, meskipun tidak digunakan oleh Vercel, ini tidak akan membahayakan).
    
    Ini memberitahu Vercel untuk tidak mencoba membangun aplikasi tetapi hanya menyajikan file statis dari direktori root.

4.  **Sebarkan:**
    - Klik tombol **"Deploy"**.

Vercel akan mengambil kode Anda dari GitHub dan menyebarkannya. Setelah beberapa saat, Anda akan diberikan URL publik dan dasbor untuk mengelola penyebaran Anda.

### Keuntungan Vercel

- **Penyebaran Berkelanjutan:** Setiap `git push` ke cabang utama Anda secara otomatis memicu penyebaran baru.
- **URL Pratinjau:** Setiap *pull request* mendapatkan URL penyebaran uniknya sendiri untuk pengujian.
- **Dioptimalkan untuk Frontend:** Vercel dibuat khusus untuk aplikasi web modern dan mencakup CDN global, HTTPS, dan lainnya secara default.
