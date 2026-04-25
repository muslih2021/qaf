<script>
  import { onMount } from 'svelte';
  import { animate, scroll } from 'motion';

  let navRef;
  let logoRef;
  let linkRefs = [];
  let isMenuOpen = false;
  let mobileMenuRef;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function closeMenu() {
    isMenuOpen = false;
  }

  onMount(() => {
    // Initial load animation
    if (navRef) {
      animate(navRef, { y: [-50, 0], opacity: [0, 1] }, { duration: 0.8, easing: [0.25, 1, 0.5, 1] });

      // Animate background color on scroll
      scroll(
        animate(navRef, {
          backgroundColor: ["rgba(253, 251, 247, 1)", "rgba(253, 251, 247, 0.92)"],
          boxShadow: ["none", "0 4px 24px rgba(58, 38, 24, 0.08)"],
        }),
        { offset: ["0px", "80px"] }
      );
    }
  });
</script>

<nav class="navbar" bind:this={navRef}>
  <div class="nav-content container">

    <!-- Left nav links (desktop) -->
    <div class="nav-group left">
      <a href="#about" class="nav-link" bind:this={linkRefs[0]} on:click={closeMenu}>About</a>
      <a href="#menu" class="nav-link" bind:this={linkRefs[1]} on:click={closeMenu}>Menu</a>
    </div>

    <!-- Logo (center) -->
    <div class="logo" bind:this={logoRef}>
      <span class="logo-qaf">qaf</span>
      <span class="logo-sub">coffee and eatery</span>
    </div>

    <!-- Right nav links (desktop) -->
    <div class="nav-group right">
      <a href="#gallery" class="nav-link" bind:this={linkRefs[2]} on:click={closeMenu}>Gallery</a>
      <a href="#reservation" class="nav-link" bind:this={linkRefs[3]} on:click={closeMenu}>Lokasi</a>
    </div>

    <!-- Hamburger Button (mobile only) -->
    <button
      class="hamburger"
      class:open={isMenuOpen}
      on:click={toggleMenu}
      aria-label="Toggle navigation menu"
      aria-expanded={isMenuOpen}
    >
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </button>

  </div>

  <!-- Mobile Dropdown Menu -->
  <div class="mobile-menu" class:active={isMenuOpen} bind:this={mobileMenuRef}>
    <a href="#about" class="mobile-link" on:click={closeMenu}>About</a>
    <a href="#menu" class="mobile-link" on:click={closeMenu}>Menu</a>
    <a href="#gallery" class="mobile-link" on:click={closeMenu}>Gallery</a>
    <a href="#reservation" class="mobile-link" on:click={closeMenu}>Lokasi</a>
  </div>
</nav>

<!-- Overlay to close menu when clicking outside -->
{#if isMenuOpen}
  <div class="overlay" on:click={closeMenu} role="presentation"></div>
{/if}

<style>
  .navbar {
    background-color: rgba(253, 251, 247, 1);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    transition: box-shadow 0.3s ease, background-color 0.3s ease;
  }

  .nav-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 72px;
    padding: 0 1.5rem;
  }

  /* Desktop nav groups */
  .nav-group {
    display: flex;
    gap: 2.5rem;
    flex: 1;
  }

  .nav-group.right {
    justify-content: flex-end;
  }

  .nav-link {
    color: var(--color-dark);
    font-size: 0.85rem;
    font-weight: 400;
    letter-spacing: 1.5px;
    position: relative;
    text-transform: uppercase;
    text-decoration: none;
    white-space: nowrap;
    transition: color 0.2s ease;
  }

  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 1px;
    background-color: var(--color-primary);
    transition: width 0.3s ease;
  }

  .nav-link:hover {
    color: var(--color-primary);
  }

  .nav-link:hover::after {
    width: 100%;
  }

  /* Logo */
  .logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 1;
    text-align: center;
    flex-shrink: 0;
  }

  .logo-qaf {
    font-family: var(--font-heading);
    font-size: 2.4rem;
    color: var(--color-primary);
    font-weight: 600;
    letter-spacing: -1px;
    line-height: 1;
  }

  .logo-sub {
    font-family: var(--font-body);
    font-size: 0.62rem;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--color-dark);
    margin-top: 5px;
    opacity: 0.75;
  }

  /* Hamburger Button */
  .hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    width: 40px;
    height: 40px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    border-radius: 6px;
    transition: background 0.2s ease;
    z-index: 1100;
  }

  .hamburger:hover {
    background: rgba(58, 38, 24, 0.06);
  }

  .bar {
    display: block;
    width: 24px;
    height: 1.5px;
    background-color: var(--color-dark);
    border-radius: 2px;
    transition: transform 0.35s ease, opacity 0.35s ease, width 0.35s ease;
    transform-origin: center;
  }

  /* Hamburger → X animation */
  .hamburger.open .bar:nth-child(1) {
    transform: translateY(6.5px) rotate(45deg);
  }

  .hamburger.open .bar:nth-child(2) {
    opacity: 0;
    width: 0;
  }

  .hamburger.open .bar:nth-child(3) {
    transform: translateY(-6.5px) rotate(-45deg);
  }

  /* Mobile Dropdown */
  .mobile-menu {
    display: none;
    flex-direction: column;
    background-color: rgba(253, 251, 247, 0.98);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                opacity 0.3s ease,
                padding 0.3s ease;
    opacity: 0;
    border-top: 1px solid rgba(58, 38, 24, 0.06);
  }

  .mobile-menu.active {
    max-height: 300px;
    opacity: 1;
    padding: 0.5rem 0 1rem;
  }

  .mobile-link {
    display: block;
    padding: 0.85rem 2rem;
    color: var(--color-dark);
    font-size: 0.82rem;
    font-weight: 400;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-decoration: none;
    transition: color 0.2s ease, background 0.2s ease, padding-left 0.2s ease;
  }

  .mobile-link:hover {
    color: var(--color-primary);
    background: rgba(58, 38, 24, 0.03);
    padding-left: 2.6rem;
  }

  /* Overlay */
  .overlay {
    position: fixed;
    inset: 0;
    z-index: 999;
    background: transparent;
  }

  /* ===========================
     Responsive Breakpoints
  =========================== */

  /* Tablet: 768px - 1024px */
  @media (max-width: 1024px) {
    .nav-group {
      gap: 1.8rem;
    }

    .logo-qaf {
      font-size: 2.1rem;
    }
  }

  /* Mobile: <= 768px → Show hamburger, hide desktop links */
  @media (max-width: 768px) {
    .nav-content {
      height: 64px;
      padding: 0 1.25rem;
    }

    .nav-group {
      display: none;
    }

    .hamburger {
      display: flex;
    }

    .mobile-menu {
      display: flex;
    }

    .logo-qaf {
      font-size: 2rem;
    }

    .logo-sub {
      font-size: 0.58rem;
      letter-spacing: 2.5px;
    }
  }

  /* Small Mobile: <= 480px */
  @media (max-width: 480px) {
    .nav-content {
      height: 58px;
      padding: 0 1rem;
    }

    .logo-qaf {
      font-size: 1.8rem;
    }

    .logo-sub {
      font-size: 0.55rem;
      letter-spacing: 2px;
    }
  }
</style>
