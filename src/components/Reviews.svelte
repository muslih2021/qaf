<script>
  import { onMount } from 'svelte';
  import { scroll, animate, inView, stagger } from 'motion';
  import qafDrink from '../assets/Gemini_Generated_Image_239wzw239wzw239w-Photoroom.png';

  const reviews = [
    { 
      name: "swst", 
      text: "Buka jam 6 pagi! Pelayanan ramah & area outdoor yang asik.", 
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=swst",
      pos: { top: '15%', left: '10%' },
      origin: 'bottom right'
    },
    { 
      name: "Adinda", 
      text: "Tempat tenang buat ngerjain tugas, kopinya mantap!", 
      rating: 4,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=adinda",
      pos: { top: '25%', right: '5%' },
      origin: 'bottom left'
    },
    { 
      name: "Kaki Panjang", 
      text: "Konsep outdoor-nya juara, nyaman banget buat ngobrol.", 
      rating: 4,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=kaki",
      pos: { bottom: '20%', left: '5%' },
      origin: 'top right'
    },
    { 
      name: "Maharani", 
      text: "Suka banget sama suasana paginya, bener-bener berkah.", 
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maharani",
      pos: { bottom: '30%', right: '10%' },
      origin: 'top left'
    },
    { 
      name: "Andi", 
      text: "Espresso pouch-nya praktis dan enak bangeet!", 
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=andi",
      pos: { top: '50%', left: '2%' },
      origin: 'right center'
    }
  ];

  let sectionRef;
  let drinkRef;
  let titleRef;
  let bubbles = [];

  onMount(() => {
    // Title reveal
    scroll(
      animate(titleRef, { opacity: [0, 1], y: [40, 0] }),
      { target: titleRef, offset: ["start 95%", "center center"] }
    );
    
    // Drink reveal on scroll progress
    scroll(
      animate(drinkRef, { opacity: [0, 1], scale: [0.8, 1], y: [30, 0] }),
      { target: sectionRef, offset: ["start 85%", "center center"] }
    );
    
    // Bubbles reveal one by one based on their scroll position
    bubbles.forEach((bubble) => {
      if (bubble) {
        scroll(
          animate(bubble, { opacity: [0, 1], scale: [0, 1] }),
          { target: bubble, offset: ["start 95%", "center center"] }
        );
      }
    });
  });
</script>

<section id="reviews" class="reviews-section" bind:this={sectionRef}>
  <div class="container relative z-10">
    
    <div class="reviews-header" bind:this={titleRef}>
      <span class="reviews-eyebrow">Customer Love</span>
      <h2 class="section-title">Apa Kata Mereka?</h2>
    </div>

    <div class="visual-container">
      <!-- Floating Reviews -->
      {#each reviews as review, i}
        <div 
          class="review-bubble" 
          bind:this={bubbles[i]}
          style="
            top: {review.pos.top || 'auto'}; 
            bottom: {review.pos.bottom || 'auto'}; 
            left: {review.pos.left || 'auto'}; 
            right: {review.pos.right || 'auto'};
            transform-origin: {review.origin};
          "
        >
          <div class="bubble-header">
            <img src={review.avatar} alt={review.name} class="avatar" />
            <div class="bubble-meta">
              <span class="user-name">{review.name}</span>
              <div class="stars">{"★".repeat(review.rating)}</div>
            </div>
          </div>
          <p class="bubble-text">{review.text}</p>
        </div>
      {/each}

      <!-- Center Product Image -->
      <div class="product-display" bind:this={drinkRef}>
        <img src={qafDrink} alt="Qaf Specialty Drink" class="main-product" />
        <div class="glow"></div>
      </div>
    </div>

  </div>
</section>

<style>
  .reviews-section {
    padding-bottom: 0 !important; /* Keep bottom flush for the floating image */
    background-color: #CD6715; /* New requested background color */
    position: relative;
    overflow: hidden;
    color: #fff;
  }

  .reviews-header {
    text-align: center;
    position: relative;
    z-index: 20;
  }

  .reviews-eyebrow {
    text-transform: uppercase;
    letter-spacing: 3px;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.85); /* Improved contrast */
    font-weight: 600;
  }

  .section-title {
    font-family: var(--font-heading);
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    margin-top: 10px;
    color: #FDFBF7;
  }

  .visual-container {
    position: relative;
    height: 700px;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 1000px;
    margin: 0 auto;
  }

  /* Review Bubbles */
  .review-bubble {
    position: absolute;
    background: #ffffff;
    color: #333;
    padding: 15px 24px;
    border-radius: 16px; /* Softer rounded corners */
    box-shadow: 0 15px 35px rgba(0,0,0,0.3);
    width: 320px;
    z-index: 10;
    opacity: 0;
    border: 1px solid rgba(193, 106, 49, 0.1);
  }

  .bubble-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
  }

  .avatar {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: #f0f0f0;
    border: 2px solid #fff;
  }

  .bubble-meta {
    display: flex;
    flex-direction: column;
    line-height: 1.2;
  }

  .user-name {
    font-weight: 700;
    font-size: 0.95rem;
    color: #1a1a1a;
  }

  .stars {
    color: #f1c40f;
    font-size: 0.85rem;
    margin-top: 2px;
  }

  .bubble-text {
    font-size: 0.9rem;
    line-height: 1.5;
    color: #555;
    margin: 0;
  }

  /* Product Display */
  .product-display {
    position: relative;
    z-index: 5;
    width: 100%;
    max-width: 480px;
    opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .main-product {
    width: 100%;
    height: auto;
    filter: drop-shadow(0 40px 80px rgba(0,0,0,0.6));
    position: relative;
    z-index: 2;
  }

  .glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(193, 106, 49, 0.25) 0%, transparent 70%);
    z-index: 1;
  }

  @media (max-width: 1024px) {
    .visual-container {
      height: 550px; /* Tetap pakai tinggi relatif, bukan auto */
    }

    .review-bubble {
      width: 240px;
      padding: 12px 16px;
    }

    .bubble-text {
      font-size: 0.78rem;
    }

    .user-name {
      font-size: 0.82rem;
    }

    .avatar {
      width: 34px;
      height: 34px;
    }

    .product-display {
      max-width: 340px;
    }
  }

  @media (max-width: 600px) {
    .visual-container {
      height: 420px;
    }

    .review-bubble {
      width: 140px;
      padding: 5px 8px;
      border-radius: 10px;
    }

    .bubble-text {
      font-size: 0.4rem;
    }

    .user-name {
      font-size: 0.4rem;
    }

    .stars {
      font-size: 0.4rem;
    }

    .avatar {
      width: 15px;
      height: 15px;
    }

    .bubble-header {
      gap: 8px;
    }

    .product-display {
      max-width: 220px;
      margin-bottom: -80px;
    }
  }
</style>
