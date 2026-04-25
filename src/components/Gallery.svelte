<script>
  import { onMount } from 'svelte';
  import { scroll, animate, inView, stagger } from 'motion';

  // Import all images from the local assets folder
  const imageModules = import.meta.glob('../assets/qafcoffee.eatery_instagram_posts/qafcoffee.eatery_instagram_photos/*.jpg', { eager: true });
  
  const allImages = Object.entries(imageModules).map(([path, mod]) => ({
    src: mod.default,
    alt: 'Qaf Coffee & Eatery Moment',
    filename: path.split('/').pop() // Extract filename for filtering
  }));

  // Specific images for the preview grid
  const requestedFiles = [
    'post_49_3822076415102335175_64768936442_0.jpg',
    'post_52_3822076415102335175_64768936442_3.jpg',
    'post_93_3753972524419018613_64768936442.jpg',
    'post_206_3623528261701129720_64768936442_7.jpg'
  ];

  let previewImages = requestedFiles.map(file => 
    allImages.find(img => img.filename === file)
  ).filter(Boolean); // Ensure we only include found images
  
  let showFullGallery = false;
  let selectedImage = null;
  let galleryRef;
  let titleRef;

  function toggleFullGallery() {
    showFullGallery = !showFullGallery;
    if (showFullGallery) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  function openLightbox(image) {
    selectedImage = image;
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    selectedImage = null;
    if (!showFullGallery) {
      document.body.style.overflow = '';
    }
  }

  onMount(() => {
    // Title reveal
    if (titleRef) {
      scroll(
        animate(titleRef, { opacity: [0, 1], y: [40, 0] }),
        { target: titleRef, offset: ["start 95%", "center center"] }
      );
    }

  });

  // Action untuk animasi scroll progress pada bento items
  function scrollReveal(node) {
    scroll(
      animate(node, { opacity: [0, 1], scale: [0.8, 1], y: [40, 0] }),
      { target: node, offset: ["start 95%", "center center"] }
    );
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') {
      if (selectedImage) closeLightbox();
      else if (showFullGallery) toggleFullGallery();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<section id="gallery" class="gallery-section" bind:this={galleryRef}>
  <div class="container">
    <div class="gallery-header" bind:this={titleRef}>
      <h2 class="section-title">Momen & Suasana</h2>
      <p class="section-subtitle">Setiap sudut bercerita tentang kenyamanan dan rasa.</p>
    </div>

    <!-- Bento Grid Preview -->
    <div class="bento-grid">
      {#each previewImages as image, i}
        <button 
          class="bento-item item-{i + 1}" 
          on:click={() => openLightbox(image)}
          aria-label="View image"
          use:scrollReveal
        >
          <img src={image.src} alt={image.alt} loading="lazy" />
          <div class="item-overlay">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
          </div>
        </button>
      {/each}
    </div>

    <div class="gallery-footer">
      <button class="btn-all" on:click={toggleFullGallery}>
        Lihat Semua Foto
        <span class="count">({allImages.length})</span>
      </button>
    </div>
  </div>
</section>

<!-- Full Gallery Overlay -->
{#if showFullGallery}
  <div class="full-gallery-overlay">
    <div class="overlay-header">
      <button class="btn-close-overlay" on:click={toggleFullGallery}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        Tutup
      </button>
      <h3>Semua Foto</h3>
    </div>
    <div class="full-gallery-content">
      <div class="bento-grid-full">
        {#each allImages as image}
          <button class="bento-item-mini" on:click={() => openLightbox(image)}>
            <img src={image.src} alt={image.alt} loading="lazy" />
          </button>
        {/each}
      </div>
    </div>
  </div>
{/if}

<!-- Lightbox -->
{#if selectedImage}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="lightbox" on:click={closeLightbox}>
    <button class="close-lightbox" on:click|stopPropagation={closeLightbox}>&times;</button>
    <img src={selectedImage.src} alt={selectedImage.alt} on:click|stopPropagation />
  </div>
{/if}

<style>
  .gallery-section {
    background-color: var(--bg-cream);
    overflow: hidden;
  }

  .gallery-header {
    text-align: center;
    margin-bottom: 4rem;
  }

  .section-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    color: var(--color-dark);
    margin-bottom: 1rem;
  }

  .section-subtitle {
    color: var(--color-text-light);
    font-size: 1.1rem;
  }

  /* Bento Grid Layout */
  .bento-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 300px;
    gap: 1.5rem;
  
  }

  .bento-item {
    position: relative;
    border: none;
    padding: 0;
    border-radius: 24px;
    overflow: hidden;
    cursor: pointer;
    background: #f0f0f0;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
    transition: transform 0.4s cubic-bezier(0.2, 1, 0.3, 1), box-shadow 0.4s ease;
  }

  .bento-item:hover {
    transform: scale(1.02);
    z-index: 2;
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  }

  .bento-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  .bento-item:hover img {
    transform: scale(1.1);
  }

  .item-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.4), transparent);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    color: white;
  }

  .bento-item:hover .item-overlay {
    opacity: 1;
  }

  /* Specific Grid Placements for Bento Effect */
  .item-1 { grid-column: span 2; grid-row: span 2; } /* Large main */
  .item-2 { grid-column: span 1; grid-row: span 1; }
  .item-3 { grid-column: span 1; grid-row: span 2; } /* Tall */
  .item-4 { grid-column: span 1; grid-row: span 1; }
  .item-5 { grid-column: span 2; grid-row: span 1; } /* Wide */
  .item-6 { grid-column: span 1; grid-row: span 1; }
  .item-7 { grid-column: span 1; grid-row: span 1; }
  .item-8 { grid-column: span 1; grid-row: span 1; }

  @media (max-width: 1024px) {
    .bento-grid {
      grid-template-columns: repeat(2, 1fr);
      grid-auto-rows: auto; /* IMPORTANT: reset auto-rows so they adapt to the aspect ratio */
    }
    .bento-item {
      grid-column: span 1 !important;
      grid-row: span 1 !important;
      aspect-ratio: 1;
      height: auto;
    }
  }

  @media (max-width: 600px) {
    .bento-grid {
      gap: 1rem;
    }
    .gallery-footer {
      margin-top: 3rem;
    }
    .btn-all {
      width: 100%;
      justify-content: center;
      padding: 1rem;
    }
  }

  .gallery-footer {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }

  .btn-all {
    background: var(--color-dark);
    color: white;
    border: none;
    padding: 1.2rem 2.5rem;
    border-radius: 100px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }

  .btn-all:hover {
    transform: translateY(-5px);
    background: var(--color-primary);
    box-shadow: 0 15px 30px rgba(179, 139, 89, 0.3);
  }

  .count {
    opacity: 0.6;
    font-weight: 400;
    font-size: 0.9rem;
  }

  /* Full Gallery Overlay */
  .full-gallery-overlay {
    position: fixed;
    inset: 0;
    background: white;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes slideUp {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }

  .overlay-header {
    padding: 1.5rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    background: white;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .overlay-header h3 {
    font-size: 1.5rem;
    margin: 0;
  }

  .btn-close-overlay {
    background: #f5f5f5;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 50px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    transition: background 0.3s;
  }

  .btn-close-overlay:hover {
    background: #e0e0e0;
  }

  .full-gallery-content {
    flex: 1;
    overflow-y: auto;
    padding: 3rem 2rem;
  }

  .bento-grid-full {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-auto-rows: 250px;
    gap: 1rem;
    max-width: 1400px;
    margin: 0 auto;
  }

  .bento-item-mini {
    border: none;
    padding: 0;
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    background: #f5f5f5;
  }

  .bento-item-mini:hover {
    transform: scale(1.03);
    z-index: 2;
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }

  /* Variations for full grid to keep bento feel */
  .bento-item-mini:nth-child(7n + 1) { grid-column: span 2; }
  .bento-item-mini:nth-child(11n + 3) { grid-row: span 2; }

  .bento-item-mini img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Lightbox */
  .lightbox {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.95);
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    cursor: zoom-out;
  }

  .lightbox img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 12px;
    animation: zoomIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes zoomIn {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  .close-lightbox {
    position: absolute;
    top: 2rem;
    right: 2rem;
    background: none;
    border: none;
    color: white;
    font-size: 3rem;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    .full-gallery-content {
      padding: 1rem;
    }
    .bento-grid-full {
      grid-template-columns: repeat(2, 1fr);
      grid-auto-rows: 180px;
      gap: 0.5rem;
    }
  }
</style>
