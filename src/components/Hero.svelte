<script>
  import { onMount, onDestroy } from 'svelte';
  import { animate, stagger, scroll } from 'motion';
  import heroBgImage from '../assets/Gemini_Generated_Image_hqmn5xhqmn5xhqmn.png';

  let heroRef;
  let bgRef;
  let contentRef;

  // ── Typewriter state ──
  const fullText = 'Rehat sejenak, nikmati berkah dalam secangkir kopi.';
  let typedCount = 0;
  let cursorVisible = true;
  let typeTimer;
  let cursorTimer;

  $: typedDisplay = fullText.slice(0, typedCount);

  onMount(() => {
    // ── 1. Content animations ──
    if (contentRef) {
      animate(
        contentRef.children,
        { opacity: [0, 1], x: [-50, 0] },
        { delay: stagger(0.2), duration: 1, easing: [0.16, 1, 0.3, 1] }
      );
    }

    // ── 2. Parallax/Zoom on BG ──
    if (bgRef && heroRef) {
      scroll(
        animate(bgRef, { scale: [1.1, 1], opacity: [0.9, 0.6] }),
        {
          target: heroRef,
          offset: ['start start', 'end start']
        }
      );
    }

    // ── 2.5 Content shrink on scroll ──
    if (contentRef && heroRef) {
      scroll(
        animate(contentRef, { scale: [1, 0.6], opacity: [1, 0], y: [0, -50] }),
        {
          target: heroRef,
          offset: ['start start', 'end start']
        }
      );
    }

    // ── 3. Typewriter ──
    let delay = 1000;
    typeTimer = setTimeout(function typeNext() {
      if (typedCount < fullText.length) {
        typedCount++;
        const ch = fullText[typedCount - 1];
        const pause = (ch === ',' || ch === '.') ? 220 : 50;
        typeTimer = setTimeout(typeNext, pause);
      }
    }, delay);

    cursorTimer = setInterval(() => { cursorVisible = !cursorVisible; }, 530);
  });

  onDestroy(() => {
    clearTimeout(typeTimer);
    clearInterval(cursorTimer);
  });
</script>

<section class="hero-section" bind:this={heroRef}>
  
  <!-- Full Background Image -->
  <div 
    class="hero-bg" 
    bind:this={bgRef}
    style="background-image: url('{heroBgImage}');"
  ></div>

  <!-- Cinematic Overlays -->
  <div class="hero-overlay"></div>
  <div class="hero-vignette"></div>

  <div class="container hero-container">
    
    <!-- Content Layered on Top -->
    <div class="hero-content" bind:this={contentRef}>
      <p class="hero-eyebrow">— Makassar, sejak 2024</p>
      
      <h1 class="hero-headline">
        qaf coffee <br/>
        <span class="accent">& eatery</span>
      </h1>

      <p class="hero-typewriter">
        {typedDisplay}<span class="cursor" class:hidden={!cursorVisible || typedCount >= fullText.length}>|</span>
      </p>

      <p class="hero-sub">
        Tempat yang pas untuk kerja, ngobrol, atau sekadar syukuri hari yang sudah dijalani. Hangat, nyaman, dan penuh rasa.
      </p>

      <div class="hero-actions">
        <a href="#menu" class="btn-pill">Lihat Menu</a>
        <a href="#reservation" class="btn-text">Temukan Kami →</a>
      </div>
    </div>

  </div>

  <!-- Scroll Cue -->
  <div class="scroll-cue">
    <div class="mouse">
      <div class="wheel"></div>
    </div>
  </div>

</section>

<style>
  .hero-section {
    position: sticky;
    top: 0;
    height: 100dvh;
    min-height: 600px;
    background-color: #000;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding: 0;
    z-index: 0;
  }

  /* Full Screen Background */
  .hero-bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 0;
    opacity: 0.85; /* Brighter background */
    transform: scale(1.1); /* For initial zoom animation */
    will-change: transform, opacity;
  }

  /* Overlays for contrast */
  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%);
    z-index: 1;
  }

  .hero-vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%);
    z-index: 2;
  }

  .hero-container {
    position: relative;
    z-index: 10;
    width: 100%;
  }

  .hero-content {
    color: #fff;
    max-width: 800px;
    padding-left: 2rem;
  }

  .hero-eyebrow {
    font-family: var(--font-body);
    font-size: 0.8rem;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: var(--color-primary);
    margin-bottom: 2rem;
    font-weight: 500;
  }

  .hero-headline {
    font-family: var(--font-heading);
    font-size: clamp(2.8rem, 10vw, 6.5rem);
    line-height: 1.05;
    font-weight: 600; /* Match logo weight */
    margin-bottom: 1.5rem;
    color: #ffffff;
    letter-spacing: -1px; /* Match logo spacing */
  }

  .hero-headline .accent {
    color: #ffffff;
    font-style: italic;
    opacity: 0.95;
  }

  .hero-typewriter {
    font-family: var(--font-body);
    font-size: 1.2rem;
    color: var(--color-primary);
    margin-bottom: 1.5rem;
    min-height: 1.5em;
    font-weight: 500;
    letter-spacing: 0.5px;
  }

  .cursor {
    color: var(--color-primary);
    margin-left: 2px;
    font-weight: 300;
  }
  .cursor.hidden { opacity: 0; }

  .hero-sub {
    font-family: var(--font-body);
    font-size: 1.15rem;
    color: rgba(255,255,255,0.7);
    line-height: 1.8;
    max-width: 550px;
    margin-bottom: 4rem;
    font-weight: 300;
  }

  .hero-actions {
    display: flex;
    align-items: center;
    gap: 3rem;
  }

  .btn-pill {
    background: var(--color-primary);
    color: #fff;
    padding: 1.2rem 3rem;
    border-radius: 100px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    border: 1px solid var(--color-primary);
    font-family: var(--font-body);
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }

  .btn-pill:hover {
    background: transparent;
    color: var(--color-primary);
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(193, 106, 49, 0.3);
  }

  .btn-text {
    color: #fff;
    text-decoration: none;
    font-weight: 500;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    font-family: var(--font-body);
    font-size: 1rem;
    opacity: 0.8;
  }

  .btn-text:hover {
    opacity: 1;
    transform: translateX(10px);
  }

  /* Scroll Cue */
  .scroll-cue {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
  }

  .mouse {
    width: 26px;
    height: 42px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 20px;
    position: relative;
  }

  .wheel {
    width: 2px;
    height: 6px;
    background: #fff;
    position: absolute;
    top: 6px;
    left: 50%;
    transform: translateX(-50%);
    animation: scroll-wheel 2s infinite;
  }

  @keyframes scroll-wheel {
    0% { top: 6px; opacity: 1; }
    100% { top: 25px; opacity: 0; }
  }

  @media (max-width: 768px) {
    .hero-content {
      padding-left: 0;
      text-align: center;
    }

    .hero-sub {
      margin-left: auto;
      margin-right: auto;
    }

    .hero-actions {
      justify-content: center;
      flex-direction: column;
      gap: 1.5rem;
    }

    .hero-typewriter {
      font-size: 1rem;
      margin-bottom: 1rem;
    }

    .hero-sub {
      font-size: 1rem;
      margin-bottom: 2.5rem;
    }

    .btn-pill {
      width: 100%;
      max-width: 300px;
    }
  }
</style>
