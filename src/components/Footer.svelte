<script>
  // Footer component logic if needed
</script>

<footer class="footer-section">
  <div class="container">
    <div class="footer-layout">
      <!-- Tengah: Copyright -->
      <div class="footer-bottom">
        <p>&copy; 2026 Qaf Coffee & Eatery. All rights reserved.</p>
      </div>
      
      <!-- Kanan: Socials -->
      <div class="footer-socials">
        <a href="https://www.instagram.com/qafcoffee.eatery/" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Instagram">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        </a>
        <a href="https://www.tiktok.com/@qaf.coffee" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="TikTok">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
          </svg>
        </a>
      </div>
    </div>
  </div>
</footer>

<style>
  .footer-section {
    background-color: var(--color-dark);
    color: var(--bg-cream);
    padding: 1.5rem 0;
    position: relative;
    z-index: 10;
    border-top: 1px solid rgba(253, 251, 247, 0.05);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .footer-layout {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .footer-bottom {
    font-size: 0.85rem;
    color: rgba(253, 251, 247, 0.5);
    font-family: var(--font-body);
    margin: 0;
  }

  .footer-socials {
    display: flex;
    gap: 0.8rem;
    align-items: center;
  }

  .social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: rgba(253, 251, 247, 0.05);
    color: var(--bg-cream);
    border: 1px solid rgba(253, 251, 247, 0.1);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .social-link:hover {
    background: var(--bg-cream);
    color: var(--color-dark);
    border-color: var(--bg-cream);
    transform: translateY(-3px);
  }

  @media (max-width: 768px) {
    .footer-section {
      padding: 2rem 0;
    }
    
    .container {
      padding: 0 1.5rem;
    }

    .footer-layout {
      flex-direction: column-reverse; /* Balik urutan: Social media di atas, copyright di bawah */
      text-align: center;
      gap: 1rem;
    }

    .footer-bottom {
      margin-top: 0.5rem;
    }
  }
</style>
