<script>
  import { onMount } from 'svelte';
  import { scroll, animate, inView, stagger } from 'motion';
  import { fade, fly } from 'svelte/transition';

  // Mengambil semua gambar dari folder menulist secara dinamis
  const images = import.meta.glob('../assets/menulist/*.{png,jpg,jpeg,webp}', { eager: true });
  
  // Mapping gambar ke format menuItems
  const menuItems = Object.entries(images).map(([path, module], index) => {
    const filename = path.split('/').pop();
    
    // Mapping nama manual berdasarkan observasi gambar
    let title = 'Qaf Specialty';
    let category = 'Minuman'; // Default
    let tag = 'Fresh';

    // Deteksi berdasarkan kata kunci di nama file
    const lowerFile = filename.toLowerCase();
    const coffeeKeywords = ['coffee', 'kopi', 'latte', 'espresso', 'brew', 'pouch'];
    const nonCoffeeKeywords = ['tea', 'matcha', 'chocolate', 'rimpangan', 'drink', 'minum'];
    const foodKeywords = ['food', 'snack', 'makan', 'bread'];
    const dessertKeywords = ['cake', 'pastry', 'croissant', 'dessert', 'cheese'];

    if (coffeeKeywords.some(k => lowerFile.includes(k))) {
      category = 'Kopi';
      tag = 'Coffee';
    } else if (nonCoffeeKeywords.some(k => lowerFile.includes(k)) || filename.includes('532213613')) {
      category = 'Non Kopi';
      tag = 'Fresh';
    } else if (dessertKeywords.some(k => lowerFile.includes(k)) || filename.includes('514960884')) {
      category = 'Dessert';
      tag = 'Sajian';
      if (filename.includes('514960884')) title = 'Cranberry Cheese';
    } else if (foodKeywords.some(k => lowerFile.includes(k))) {
      category = 'Makanan';
      tag = 'Sajian';
    } else {
      // Fallback agar terlihat tersebar
      const cats = ['Kopi', 'Non Kopi', 'Makanan', 'Dessert'];
      category = cats[index % 4];
    }

    if (filename.includes('551968205')) title = 'Espresso Pouch';
    if (filename.includes('661713726')) title = 'Dirty Latte';
    if (filename.includes('532213613')) title = 'Rimpangan';

    return {
      id: index + 1,
      no: (index + 1).toString().padStart(2, '0'),
      category: category, 
      tag: tag,
      title: title, 
      description: 'Nikmati sajian spesial kami yang dibuat dengan bahan pilihan.',
      price: (category === 'Makanan' || category === 'Dessert') ? '25K' : 'Mulai 15K',
      ingredients: ['Bahan Pilihan', 'High Quality'],
      variants: (category === 'Kopi' || category === 'Non Kopi') ? [
        'Panas S: 15K', 'Panas M: 18K', 'Panas L: 20K',
        'Dingin S: 16K', 'Dingin M: 19K', 'Dingin L: 22K'
      ] : [],
      image: module.default,
      note: '',
    };
  });

  let sectionRef;
  let titleRef;
  let cardRefs = [];
  let showFullMenu = false;
  let selectedItem = null;
  let selectedCategory = 'Semua';

  // Filter semua item berdasarkan kategori
  $: filteredItems = selectedCategory === 'Semua' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  // Hanya tampilkan 6 item di halaman depan sebagai preview
  const PREVIEW_LIMIT = 6;
  $: displayedItems = filteredItems.slice(0, PREVIEW_LIMIT);

  function toggleFullMenu() {
    showFullMenu = !showFullMenu;
    if (showFullMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  function openDetail(item) {
    selectedItem = item;
  }

  function closeDetail() {
    selectedItem = null;
  }

  onMount(() => {
    if (titleRef) {
      scroll(
        animate(titleRef, { opacity: [0, 1], y: [40, 0] }),
        { target: titleRef, offset: ["start 95%", "center center"] }
      );
    }
  });

  // Action untuk menganimasi kartu menu saat di-scroll
  function scrollReveal(node) {
    scroll(
      animate(node, { opacity: [0, 1], y: [40, 0] }),
      { target: node, offset: ["start 95%", "start 75%"] }
    );
  }
</script>

<section id="menu" class="menu-section" bind:this={sectionRef}>
  <div class="container">

    <!-- Section header -->
    <div class="menu-header" bind:this={titleRef} style="opacity:0;">
      <span class="menu-eyebrow">— Our Specialties</span>
      <h2 class="menu-heading">Menu<br/><em> yang kami sediakan.</em></h2>
    </div>

    <!-- Category Tabs (Desktop) -->
    <div class="category-filters">
      <button 
        class="filter-btn" 
        class:active={selectedCategory === 'Semua'}
        on:click={() => selectedCategory = 'Semua'}
      >Semua</button>
      <button 
        class="filter-btn" 
        class:active={selectedCategory === 'Kopi'}
        on:click={() => selectedCategory = 'Kopi'}
      >Kopi</button>
      <button 
        class="filter-btn" 
        class:active={selectedCategory === 'Non Kopi'}
        on:click={() => selectedCategory = 'Non Kopi'}
      >Non Kopi</button>
      <button 
        class="filter-btn" 
        class:active={selectedCategory === 'Makanan'}
        on:click={() => selectedCategory = 'Makanan'}
      >Makanan</button>
      <button 
        class="filter-btn" 
        class:active={selectedCategory === 'Dessert'}
        on:click={() => selectedCategory = 'Dessert'}
      >Dessert</button>
    </div>

    <!-- Grid -->
    <div class="menu-grid">
      {#each displayedItems as item, i (item.id)}
        <article 
          class="menu-card" 
          on:click={() => openDetail(item)}
          use:scrollReveal
        >
          <div class="card-image-wrapper">
            <img src={item.image} alt={item.title} class="card-image" />
            <div class="image-overlay">
              <span>Detail →</span>
            </div>
          </div>
          
          <div class="card-content">
            <div class="card-top">
              <span class="card-tag">{item.tag}</span>
              {#if item.variants && item.variants.length > 0}
                <span class="card-badge">Panas/Dingin | S/M/L</span>
              {:else if item.note}
                <span class="card-badge">{item.note}</span>
              {/if}
            </div>

            <h3 class="card-title">{item.title}</h3>
            <p class="card-price">{item.price}</p>
          </div>
        </article>
      {:else}
        <div class="no-menu">
          <p>Sedang memuat menu...</p>
        </div>
      {/each}
    </div>

    <div class="menu-cta">
      <button class="btn-outline" on:click={toggleFullMenu}>Lihat Full Menu</button>
    </div>
  </div>
</section>

<!-- Full Menu Page Overlay -->
{#if showFullMenu}
  <div class="full-menu-overlay" transition:fade={{ duration: 400 }}>
    <div class="full-menu-container" transition:fly={{ y: 50, duration: 500 }}>
      <header class="full-menu-header">
        <button class="back-btn" on:click={toggleFullMenu}>← Kembali</button>
        <h2>Daftar Menu Lengkap</h2>
      </header>

      <div class="full-menu-content">
        <div class="menu-category-section">
          <h3 class="category-title">Kopi</h3>
          <div class="menu-list">
            {#each menuItems.filter(i => i.category === 'Kopi') as item}
              <div class="list-item" on:click={() => openDetail(item)}>
                <div class="item-info">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
                <span class="item-price">{item.price}</span>
              </div>
            {/each}
          </div>
        </div>

        <div class="menu-category-section">
          <h3 class="category-title">Non Kopi</h3>
          <div class="menu-list">
            {#each menuItems.filter(i => i.category === 'Non Kopi') as item}
              <div class="list-item" on:click={() => openDetail(item)}>
                <div class="item-info">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
                <span class="item-price">{item.price}</span>
              </div>
            {/each}
          </div>
        </div>

        <div class="menu-category-section">
          <h3 class="category-title">Makanan</h3>
          <div class="menu-list">
            {#each menuItems.filter(i => i.category === 'Makanan') as item}
              <div class="list-item" on:click={() => openDetail(item)}>
                <div class="item-info">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
                <span class="item-price">{item.price}</span>
              </div>
            {/each}
          </div>
        </div>

        <div class="menu-category-section">
          <h3 class="category-title">Dessert</h3>
          <div class="menu-list">
            {#each menuItems.filter(i => i.category === 'Dessert') as item}
              <div class="list-item" on:click={() => openDetail(item)}>
                <div class="item-info">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
                <span class="item-price">{item.price}</span>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<!-- Detail Modal -->
{#if selectedItem}
  <div class="modal-backdrop" on:click={closeDetail} transition:fade>
    <div class="modal-content" on:click|stopPropagation transition:fly={{ y: 30 }}>
      <button class="close-modal" on:click={closeDetail}>×</button>
      
      <div class="modal-grid">
        <div class="modal-image-col">
          <img src={selectedItem.image} alt={selectedItem.title} />
        </div>
        
        <div class="modal-info-col">
          <span class="modal-tag">{selectedItem.tag}</span>
          <h2 class="modal-title">{selectedItem.title}</h2>
          <p class="modal-price">{selectedItem.price}</p>
          
          <div class="modal-section">
            <h4>Deskripsi</h4>
            <p>{selectedItem.description}</p>
          </div>
          
          <div class="modal-section">
            <h4>Ingredients</h4>
            <ul class="ingredient-list">
              {#each selectedItem.ingredients as ing}
                <li>{ing}</li>
              {/each}
            </ul>
          </div>
          
          {#if selectedItem.variants && selectedItem.variants.length > 0}
          <div class="modal-section">
            <h4>Pilihan Penyajian</h4>
            <div class="variant-options">
              {#each selectedItem.variants as variant}
                <span class="variant-badge">{variant}</span>
              {/each}
            </div>
          </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .menu-section {
    background-color: #CD6715; /* Brown background matching Customer Love */
    position: relative;
    color: #fff;
  }

  .menu-header {
    margin-bottom: 3rem;
  }

  .menu-eyebrow {
    display: block;
    font-family: var(--font-body);
    font-size: 0.75rem;
    font-weight: 400;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.85);
    margin-bottom: 1rem;
  }

  .menu-heading {
    font-family: var(--font-heading);
    font-size: clamp(2.2rem, 4vw, 3.2rem);
    font-weight: 600;
    color: #ffffff;
    line-height: 1.15;
  }

  .menu-heading em {
    font-style: italic;
    color: rgba(255, 255, 255, 0.9);
  }

  .category-filters {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 3rem;
    border-bottom: 1px solid rgba(253, 251, 247, 0.1);
    padding-bottom: 1rem;
  }

  .filter-btn {
    background: none;
    border: none;
    font-family: var(--font-body);
    font-size: 0.9rem;
    color: rgba(253, 251, 247, 0.6);
    cursor: pointer;
    padding: 0.5rem 0;
    position: relative;
    transition: color 0.3s;
  }

  .filter-btn.active {
    color: #ffffff;
    font-weight: 600;
  }

  .filter-btn.active::after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #ffffff;
  }

  .menu-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2.5rem;
  }

  .menu-card {
    background: rgba(255, 255, 255, 0.15); /* Glass background */
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .menu-card:hover {
    transform: translateY(-8px);
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 255, 255, 0.4);
  }

  .card-image-wrapper {
    position: relative;
    height: 240px;
    overflow: hidden;
  }

  .card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .menu-card:hover .card-image {
    transform: scale(1.1);
  }

  .image-overlay {
    position: absolute;
    inset: 0;
    background: rgba(193, 106, 49, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-weight: 600;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .menu-card:hover .image-overlay {
    opacity: 1;
  }

  .card-content {
    padding: 1.5rem;
  }

  .card-top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.75rem;
  }

  .card-tag {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #ffffff;
    font-weight: 600;
    background: rgba(0, 0, 0, 0.2);
    padding: 2px 8px;
    border-radius: 4px;
  }

  .card-badge {
    font-size: 0.65rem;
    background: var(--color-primary);
    color: #fff;
    padding: 2px 8px;
    border-radius: 4px;
    font-weight: 600;
  }

  .card-title {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: #fdfbf7;
  }

  .card-price {
    font-family: var(--font-heading);
    font-weight: 600;
    color: #ffffff;
    font-size: 1.1rem;
  }

  .menu-cta {
    margin-top: 4rem;
    text-align: center;
  }

  .btn-outline {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.5);
    color: #ffffff;
    padding: 1rem 2rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s;
    backdrop-filter: blur(4px);
  }

  .btn-outline:hover {
    background: rgba(255, 255, 255, 0.25);
    border-color: #ffffff;
  }

  /* Full Menu Overlay */
  .full-menu-overlay {
    position: fixed;
    inset: 0;
    background: #0f0f0f;
    z-index: 2000;
    overflow-y: auto;
    color: #fdfbf7;
  }

  .full-menu-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 4rem 2rem;
  }

  .full-menu-header {
    margin-bottom: 4rem;
    text-align: center;
  }

  .back-btn {
    background: none;
    border: none;
    font-family: var(--font-body);
    color: var(--color-primary);
    cursor: pointer;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .full-menu-header h2 {
    font-size: clamp(2rem, 5vw, 3.5rem);
    color: #ffffff; /* Pure white for maximum visibility */
    font-family: var(--font-heading);
    font-weight: 600;
  }

  .menu-category-section {
    margin-bottom: 4rem;
  }

  .category-title {
    font-size: 2.2rem;
    color: #ffffff; /* Pure white */
    font-family: var(--font-heading);
    border-bottom: 2px solid var(--color-primary);
    padding-bottom: 0.5rem;
    margin-bottom: 2rem;
  }

  .menu-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .list-item {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid rgba(253, 251, 247, 0.1);
    cursor: pointer;
    transition: background 0.2s;
  }

  .list-item:hover {
    background: rgba(193, 106, 49, 0.1);
  }

  .item-info h4 {
    font-size: 1.2rem;
    margin-bottom: 0.25rem;
    color: #ffffff; /* Pure white */
    font-family: var(--font-heading);
  }

  .item-info p {
    font-size: 0.85rem;
    color: rgba(253, 251, 247, 0.6);
  }

  .item-price {
    font-weight: 600;
    color: var(--color-primary);
  }

  /* Modal */
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.8);
    backdrop-filter: blur(8px);
    z-index: 3000;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
  }

  .modal-content {
    background: #1a1a1a;
    border-radius: 20px;
    max-width: 900px;
    width: 100%;
    max-height: 90vh;
    overflow: hidden; /* NO SCROLLING */
    position: relative;
    color: #fdfbf7;
    border: 1px solid rgba(253, 251, 247, 0.1);
    display: flex;
    flex-direction: column;
  }

  .close-modal {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    font-size: 2rem;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 10;
    color: #fdfbf7;
  }

  .modal-grid {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    height: 100%;
    max-height: 100%;
    overflow: hidden;
  }

  .modal-image-col {
    height: 100%;
    overflow: hidden;
  }

  .modal-image-col img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .modal-info-col {
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    overflow: hidden;
  }

  .modal-tag {
    color: var(--color-primary);
    font-weight: 600;
    letter-spacing: 2px;
    font-size: 0.8rem;
    text-transform: uppercase;
  }

  .modal-title {
    font-size: clamp(2rem, 4vw, 2.5rem);
    margin: 0.5rem 0;
    color: #ffffff; /* Pure white for menu name */
    font-family: var(--font-heading);
    font-weight: 600;
  }

  .modal-price {
    font-size: 1.5rem;
    color: var(--color-primary);
    font-weight: 600;
    margin-bottom: 2rem;
  }

  .modal-section {
    margin-bottom: 2rem;
  }

  .modal-section h4 {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: rgba(253, 251, 247, 0.6);
  }

  .ingredient-list {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .ingredient-list li {
    background: rgba(253, 251, 247, 0.1);
    padding: 4px 12px;
    border-radius: 100px;
    font-size: 0.85rem;
    color: #fdfbf7;
  }



  @media (max-width: 1024px) {
    .menu-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .modal-grid {
      grid-template-columns: 1fr;
      grid-template-rows: 35vh 1fr; /* Bagian atas untuk gambar, bawah untuk teks */
    }
    .modal-info-col {
      padding: 1.5rem;
      justify-content: center;
    }
    .modal-section {
      margin-bottom: 1rem; /* Kurangi jarak agar muat */
    }
    .modal-price {
      margin-bottom: 1rem;
    }
    .modal-title {
      font-size: 1.5rem;
    }
    .menu-list {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 600px) {
    .menu-grid {
      grid-template-columns: 1fr;
    }
    .modal-grid {
      grid-template-rows: 25vh 1fr; /* Perkecil tinggi gambar di layar HP */
    }
    .modal-info-col {
      padding: 1rem;
      justify-content: space-evenly; /* Sebarkan jarak agar rapi otomatis */
    }
    .modal-tag {
      font-size: 0.65rem;
      margin-bottom: -5px;
    }
    .modal-title {
      font-size: 1.25rem;
      margin: 0.25rem 0;
    }
    .modal-price {
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
    }
    .modal-section {
      margin-bottom: 0.5rem;
    }
    .modal-section h4 {
      font-size: 0.75rem;
      margin-bottom: 0.2rem;
    }
    .modal-section p {
      font-size: 0.8rem;
      line-height: 1.3;
      margin: 0;
    }
    .ingredient-list {
      gap: 0.25rem;
    }
    .ingredient-list li {
      padding: 2px 8px;
      font-size: 0.7rem;
    }
  }

  .no-menu {
    grid-column: 1 / -1;
    text-align: center;
    padding: 4rem;
    color: rgba(253, 251, 247, 0.6);
    font-style: italic;
  }

  .variant-options {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin-top: 0.5rem;
  }

  .variant-badge {
    background: rgba(193, 106, 49, 0.2);
    border: 1px solid var(--color-primary);
    color: #fdfbf7;
    padding: 6px 16px;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
  }

  @media (max-width: 600px) {
    .variant-badge {
      padding: 3px 8px;
      font-size: 0.7rem;
    }
    .variant-options {
      gap: 0.3rem;
      margin-top: 0.2rem;
    }
  }
</style>
