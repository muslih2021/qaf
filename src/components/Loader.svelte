<script>
  import { onMount } from 'svelte';

  onMount(() => {
    const loader = document.getElementById('global-loader');
    
    if (!loader) return;

    const hideLoader = () => {
      // Berikan jeda sebentar agar logo animasi Qaf sempat terlihat cantik, 
      // bahkan saat internet sedang sangat cepat
      setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        
        // Hapus elemen dari DOM secara permanen setelah animasi fade selesai (0.8s)
        setTimeout(() => {
          if (loader.parentNode) {
            loader.parentNode.removeChild(loader);
          }
        }, 800);
      }, 500); 
    };

    // Cek apakah halaman (semua gambar, css, font) sudah selesai dimuat 
    if (document.readyState === 'complete') {
      hideLoader();
    } else {
      window.addEventListener('load', hideLoader);
    }

    return () => {
      window.removeEventListener('load', hideLoader);
    };
  });
</script>

<!-- 
  Catatan: 
  HTML dan CSS untuk loader ini berada langsung di dalam 'index.html'. 
  Ini memastikan bahwa layar loading akan LANGSUNG terender di layar secepat kilat (bahkan saat internet sangat jelek dan file javascript/svelte belum selesai diunduh).
  Komponen Svelte ini hanya bertugas untuk menghilangkan layar loading tersebut secara mulus setelah semuanya siap.
-->
