# spmb

spmb(seleksi penerimaan mahasiswa baru) adalah aplikasi web yang berguna untuk menerima data dari mahasiswa baru yang ingin medafarkan ke tingat perguruan tinggi. Dibuat dengan MERN stack.

## Demo
https://spmb-redux.herokuapp.com/

## Local Environment Setup 
Disini saya menggunakan contoh [npm](https://www.npmjs.com/) untuk proses instalasi.

### Install dependencies.
```
npm i && npm i frontend/
```
atau
```
# backend
npm i
# frontend
cd frontend
npm i
```
### Setting MongoDB Atlas(cloud version)
`Daftar akun`: https://www.mongodb.com/atlas/database
\
\
`Connect ke applikasi`: 
mongodb+srv://<username>:<password>@cluster0.gtfhp.mongodb.net/<database_name>?retryWrites=true&w=majority
\
\
`Penjelasan lanjut mengenai mongodb`:
\
https://www.youtube.com/watch?v=iXhmi0NYdc8&list=PLFIM0718LjIW-XBdVOerYgKegBtD6rSfD&index=21 (Instalasi & Konfigurasi MongoDB)

## Usage
### Jalankan development server
React secara default akan memakai port 3000.
```
npm run dev

```
### Env variables
Untuk env variables sudah di berikan contoh konfigurasi(lihat .env_example). Tinggal diubah saja bagian yang diberikan tanda kurung(tanda kurung sendiri tidak termasuk dalam nilai env)
