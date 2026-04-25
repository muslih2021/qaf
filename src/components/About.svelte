<script>
  import { onMount } from 'svelte';
  import { scroll, animate, inView, stagger } from 'motion';
  import qafBag from '../assets/about/qaf_bag.png';

  const leftFeatures = [
    {
      title: 'WiFi up to 200Mbps',
      description: 'Koneksi internet super cepat untuk mendukung segala aktivitas digital Anda.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>`
    },
    {
      title: 'Musholah',
      description: 'Fasilitas tempat ibadah yang bersih dan nyaman tersedia untuk Anda.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M6 21V9a9 9 0 0 1 12 0v12"/><circle cx="12" cy="5" r="2"/></svg>`
    },
    {
      title: 'Colokan di setiap meja',
      description: 'Akses listrik yang mudah di setiap sudut meja untuk kenyamanan bekerja.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/><line x1="9" y1="6" x2="15" y2="6"/><line x1="9" y1="10" x2="15" y2="10"/></svg>`
    }
  ];

  const rightFeatures = [
    {
      title: 'Ruangan Luas',
      description: 'Tersedia area Indoor (AC) dan Outdoor yang lega untuk berkumpul.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="3" y1="9" x2="21" y2="9"/></svg>`
    },
    {
      title: 'Kopi Premium',
      description: 'Biji kopi pilihan terbaik yang diproses dengan standar kualitas tinggi.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`
    },
    {
      title: 'Layanan Ramah',
      description: 'Staf kami siap melayani Anda dengan sepenuh hati.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`
    }
  ];

  let sectionRef;
  let bagRef;
  let titleRef;

  onMount(() => {
    // Scroll progress animations
    scroll(
      animate(titleRef, { opacity: [0, 1], y: [40, 0] }),
      { target: titleRef, offset: ["start 95%", "center center"] }
    );
    scroll(
      animate(bagRef, { opacity: [0, 1], scale: [0.8, 1], y: [30, 0] }),
      { target: sectionRef, offset: ["start 85%", "center center"] }
    );

    // Fitur kiri keluar satu per satu berdasarkan posisi masing-masing
    document.querySelectorAll(".feature-card.left").forEach((card) => {
      scroll(
        animate(card, { opacity: [0, 1], scale: [0.5, 1], x: [150, 0] }),
        { target: card, offset: ["start 95%", "center center"] }
      );
    });

    // Fitur kanan keluar satu per satu berdasarkan posisi masing-masing
    document.querySelectorAll(".feature-card.right").forEach((card) => {
      scroll(
        animate(card, { opacity: [0, 1], scale: [0.5, 1], x: [-150, 0] }),
        { target: card, offset: ["start 95%", "center center"] }
      );
    });
  });
</script>

<section id="about" class="about-section" bind:this={sectionRef}>
  <div class="container">
    <div class="about-header" bind:this={titleRef}>
      <span class="about-eyebrow">Fasilitas Kami</span>
      <h2 class="about-heading">Kenyamanan yang Utama</h2>
    </div>

    <div class="about-grid">
      <!-- Left Column -->
      <div class="features-col left">
        {#each leftFeatures as f}
          <div class="feature-card left">
            <div class="feature-text">
              <h3 class="feature-title">{f.title}</h3>
              <p class="feature-desc">{f.description}</p>
            </div>
            <div class="feature-icon-wrapper">
              {@html f.icon}
            </div>
          </div>
        {/each}
      </div>

      <!-- Center Column (Bag) -->
      <div class="center-col" bind:this={bagRef}>
        <div class="image-container">
          <img src={qafBag} alt="Qaf Premium Coffee" class="main-image" />
          <div class="glow-effect"></div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="features-col right">
        {#each rightFeatures as f}
          <div class="feature-card right">
            <div class="feature-icon-wrapper">
              {@html f.icon}
            </div>
            <div class="feature-text">
              <h3 class="feature-title">{f.title}</h3>
              <p class="feature-desc">{f.description}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .about-section {
    position: relative;
    z-index: 10;
    background-color: #fff;
    overflow: hidden;
    box-shadow: 0 -20px 50px rgba(0,0,0,0.15);
  }

  .about-header {
    text-align: center;
    margin-bottom: 80px;
  }

  .about-eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-size: 0.85rem;
    color: #888;
    display: block;
    margin-bottom: 15px;
  }

  .about-heading {
    font-size: clamp(2rem, 5vw, 3rem);
    color: #1a1a1a;
    font-weight: 400;
  }

  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1.5fr 1fr;
    align-items: center;
    gap: 20px;
  }

  .features-col {
    display: flex;
    flex-direction: column;
    gap: 80px;
  }

  .feature-card {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .feature-card.left {
    text-align: right;
    justify-content: flex-end;
    transform-origin: right center;
  }

  .feature-card.right {
    text-align: left;
    justify-content: flex-start;
    transform-origin: left center;
  }

  .feature-icon-wrapper {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    color: #333;
  }

  .feature-icon-wrapper :global(svg) {
    width: 100%;
    height: 100%;
  }

  .feature-title {
    font-size: 0.9rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 8px;
    color: #1a1a1a;
  }

  .feature-desc {
    font-size: 0.85rem;
    color: #666;
    line-height: 1.5;
    max-width: 200px;
  }

  .feature-card.left .feature-desc {
    margin-left: auto;
  }

  /* Center Column */
  .center-col {
    display: flex;
    justify-content: center;
    position: relative;
  }

  .image-container {
    position: relative;
    width: 100%;
    max-width: 450px;
  }

  .main-image {
    width: 100%;
    height: auto;
    filter: drop-shadow(0 20px 40px rgba(0,0,0,0.1));
    position: relative;
    z-index: 2;
  }

  .glow-effect {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 80%;
    background: radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%);
    z-index: 1;
  }

  @media (max-width: 1024px) {
    .about-grid {
      grid-template-columns: 1fr;
      gap: 80px;
    }

    .center-col {
      order: -1;
      max-width: 300px;
      margin: 0 auto;
    }

    .features-col {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      gap: 40px;
    }

    .feature-card {
      flex-direction: column !important;
      text-align: center !important;
      width: 250px;
      transform-origin: center top !important;
    }

    .feature-card.left .feature-desc {
      margin-left: 0;
    }
  }

  @media (max-width: 640px) {
    .features-col {
      flex-direction: column;
      align-items: center;
    }
  }
</style>
