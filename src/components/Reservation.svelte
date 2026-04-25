<script>
  import { onMount } from 'svelte';
  import { scroll, animate, inView, stagger } from 'motion';

  let sectionRef;
  let bgRef;
  let eyebrowRef;
  let headingRef;
  let card1Ref;
  let card2Ref;
  let mapRef;

  onMount(() => {
    // Parallax BG
    if (bgRef && sectionRef) {
      scroll(
        animate(bgRef, { y: ['-8%', '8%'] }),
        { target: sectionRef }
      );
    }

    // Title reveal animations on scroll
    if (eyebrowRef && headingRef) {
      scroll(
        animate([eyebrowRef, headingRef], { opacity: [0, 1], y: [30, 0] }),
        { target: eyebrowRef, offset: ["start 95%", "center center"] }
      );
    }

    // Reveal other elements on scroll
    [card1Ref, card2Ref, mapRef].forEach(el => {
      if (el) {
        scroll(
          animate(el, { opacity: [0, 1], y: [30, 0] }),
          { target: el, offset: ["start 95%", "center center"] }
        );
      }
    });
  });
</script>



<section id="reservation" class="visit-section" bind:this={sectionRef}>

  <!-- Parallax background photo -->
  <div
    class="visit-bg"
    bind:this={bgRef}
    style="background-image: url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2000&auto=format&fit=crop');"
  ></div>
  <div class="visit-overlay"></div>

  <div class="container visit-body">

    <!-- Header -->
    <div class="visit-header">
      <span class="visit-eyebrow" bind:this={eyebrowRef} style="opacity:0;">— Kunjungi Kami</span>
      <h2 class="visit-heading" bind:this={headingRef} style="opacity:0;">
        Kami menunggu<br/>
        <em>dengan hangat.</em>
      </h2>
    </div>

    <!-- Info + Map layout -->
    <div class="visit-layout">

      <!-- Info cards column -->
      <div class="info-col">

        <!-- Card 1: Jam -->
        <div class="info-card" bind:this={card1Ref} style="opacity:0;">
          <div class="info-card-label">
            <span class="info-icon-line"></span>
            <span class="info-label-text">Jam Buka</span>
          </div>
          <div class="info-card-body">
            <h3 class="info-title">Setiap Hari</h3>
            <p class="info-time">10.00 – 22.00 WIB</p>
            <p class="info-note">Termasuk hari libur nasional</p>
          </div>
        </div>

        <!-- Card 2: Lokasi -->
        <div class="info-card" bind:this={card2Ref} style="opacity:0;">
          <div class="info-card-label">
            <span class="info-icon-line"></span>
            <span class="info-label-text">Lokasi</span>
          </div>
          <div class="info-card-body">
            <h3 class="info-title">Jl. Anggrek IV No. 2</h3>
            <p class="info-note">Makassar</p>
            <a
              href="https://maps.app.goo.gl/TNU6CuAHSTAgWuPL8"
              target="_blank"
              rel="noopener noreferrer"
              class="map-cta"
            >
              Buka di Google Maps
              <span class="cta-arrow">→</span>
            </a>
          </div>
        </div>

        <!-- Soft Islamic note -->
        <p class="visit-note">
          "Selamat datang"
        </p>
      </div>

      <!-- Map embed -->
      <div class="map-col" bind:this={mapRef} style="opacity:0;">
        <div class="map-frame">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d987.6!2d110.3695!3d-7.7956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a57e22e82da49%3A0x8b6e1e5adbd760b7!2sQaf%20Coffee%20%26%20Eatery!5e0!3m2!1sen!2sid!4v1"
            width="100%"
            height="100%"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Lokasi Qaf Coffee & Eatery"
          ></iframe>
        </div>
        <div class="map-tag">
          <span>📍 Qaf Coffee & Eatery</span>
        </div>
      </div>

    </div>
  </div>
</section>

<style>
  /* ============ Divider ============ */
  .section-divider {
    background: var(--bg-secondary);
    padding: 2rem 0;
    display: flex;
    justify-content: center;
  }

  .divider-inner {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    max-width: 400px;
    padding: 0 2rem;
  }

  .d-line {
    flex: 1;
    height: 1px;
    background: rgba(58, 38, 24, 0.15);
  }

  .d-ornament {
    font-size: 1.1rem;
    color: rgba(193, 106, 49, 0.5);
    letter-spacing: 1px;
    flex-shrink: 0;
  }

  /* ============ Section ============ */
  .visit-section {
    position: relative;
    overflow: hidden;
    background: var(--bg-secondary);
  }

  .visit-bg {
    position: absolute;
    top: -10%;
    left: 0;
    width: 100%;
    height: 120%;
    background-size: cover;
    background-position: center;
    z-index: 0;
    filter: brightness(0.15) saturate(0.5);
    opacity: 0.4;
  }

  .visit-overlay {
    position: absolute;
    inset: 0;
    z-index: 1;
    background: linear-gradient(to right, var(--bg-secondary) 40%, rgba(243,239,233,0.85) 100%);
  }

  .visit-body {
    position: relative;
    z-index: 10;
  }

  /* ---- Header ---- */
  .visit-header {
    margin-bottom: 4rem;
  }

  .visit-eyebrow {
    display: block;
    font-family: var(--font-body);
    font-size: 0.72rem;
    font-weight: 400;
    letter-spacing: 3.5px;
    text-transform: uppercase;
    color: var(--color-primary);
    margin-bottom: 1rem;
  }

  .visit-heading {
    font-family: var(--font-heading);
    font-size: clamp(2rem, 3.5vw, 2.9rem);
    font-weight: 600;
    color: var(--color-dark);
    line-height: 1.2;
  }

  .visit-heading em {
    font-style: italic;
    color: var(--color-primary);
  }

  /* ---- Layout ---- */
  .visit-layout {
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    gap: 4rem;
    align-items: start;
  }

  /* ---- Info cards ---- */
  .info-col {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .info-card {
    padding: 2rem 0;
    border-bottom: 1px solid rgba(58, 38, 24, 0.1);
    display: flex;
    gap: 1.5rem;
    align-items: flex-start;
    transition: padding-left 0.3s ease;
  }

  .info-card:first-child {
    border-top: 1px solid rgba(58, 38, 24, 0.1);
  }

  .info-card:hover {
    padding-left: 0.6rem;
  }

  .info-card-label {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding-top: 6px;
    flex-shrink: 0;
  }

  .info-icon-line {
    display: block;
    width: 2px;
    height: 20px;
    background: var(--color-primary);
    border-radius: 2px;
    opacity: 0.5;
  }

  .info-label-text {
    font-family: var(--font-body);
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--color-primary);
    writing-mode: vertical-rl;
    opacity: 0.6;
  }

  .info-card-body {
    flex: 1;
  }

  .info-title {
    font-family: var(--font-heading);
    font-size: 1.35rem;
    font-weight: 600;
    color: var(--color-dark);
    margin-bottom: 0.35rem;
    line-height: 1.2;
  }

  .info-time {
    font-family: var(--font-heading);
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-primary);
    font-style: italic;
    line-height: 1;
    margin-bottom: 0.4rem;
  }

  .info-note {
    font-family: var(--font-body);
    font-size: 0.8rem;
    color: var(--color-light-text);
    font-weight: 300;
    letter-spacing: 0.5px;
  }

  .map-cta {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    margin-top: 0.8rem;
    font-family: var(--font-body);
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--color-primary);
    text-decoration: none;
    letter-spacing: 0.5px;
    border-bottom: 1px solid rgba(193, 106, 49, 0.3);
    padding-bottom: 2px;
    transition: border-color 0.2s ease, gap 0.2s ease;
  }

  .map-cta:hover {
    border-color: var(--color-primary);
    gap: 0.7rem;
  }

  .cta-arrow {
    transition: transform 0.2s ease;
  }

  .map-cta:hover .cta-arrow {
    transform: translateX(3px);
  }

  .visit-note {
    margin-top: 2rem;
    font-family: var(--font-heading);
    font-size: 1rem;
    font-style: italic;
    color: rgba(58, 38, 24, 0.4);
    padding-left: 0.2rem;
  }

  .visit-note em {
    color: var(--color-primary);
    font-style: italic;
  }

  /* ---- Map ---- */
  .map-col {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .map-frame {
    width: 100%;
    height: 380px;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid rgba(58, 38, 24, 0.1);
    filter: sepia(0.15) contrast(0.95);
    transition: filter 0.3s ease;
  }

  .map-frame:hover {
    filter: sepia(0) contrast(1);
  }

  .map-tag {
    font-family: var(--font-body);
    font-size: 0.72rem;
    color: var(--color-light-text);
    letter-spacing: 1px;
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  /* ===== Responsive ===== */
  @media (max-width: 900px) {
    .visit-layout {
      grid-template-columns: 1fr;
      gap: 3rem;
    }

    .map-frame {
      height: 280px;
    }
  }

  @media (max-width: 480px) {
    .visit-section {
      padding: 5rem 0;
    }

    .info-card {
      gap: 1rem;
    }

    .info-time {
      font-size: 1.3rem;
    }
  }
</style>
