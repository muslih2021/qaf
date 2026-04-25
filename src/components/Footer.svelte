<script>
  // Footer component logic if needed
</script>

<footer class="footer-section">
  <div class="container">
    <div class="footer-content">
      <div class="footer-brand">
        <h2 class="footer-logo">qaf</h2>
        <p class="footer-sub">coffee & eatery</p>
      </div>
      
      <div class="footer-socials">
        <a href="https://www.instagram.com/qafcoffee.eatery/" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Instagram">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-instagram"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        </a>
        <a href="https://www.tiktok.com/@qaf.coffee" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="TikTok">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-tiktok">
            <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
          </svg>
        </a>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; 2026 Qaf Coffee & Eatery. All rights reserved.</p>
    </div>
  </div>
</footer>

<style>
  .footer-section {
    background-color: var(--color-dark);
    color: var(--bg-cream);
    padding: 6rem 0 2rem;
    position: relative;
    z-index: 10;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    margin-bottom: 4rem;
    text-align: center;
  }

  .footer-logo {
    font-family: var(--font-heading);
    font-size: 4rem;
    font-weight: 600;
    font-style: italic;
    color: var(--color-primary);
    letter-spacing: -2px;
    line-height: 1;
    margin-bottom: -5px;
  }

  .footer-sub {
    font-family: var(--font-body);
    font-size: 0.9rem;
    font-weight: 400;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: rgba(253, 251, 247, 0.7);
  }

  .footer-socials {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
  }

  .social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: rgba(253, 251, 247, 0.05);
    color: var(--bg-cream);
    border: 1px solid rgba(253, 251, 247, 0.1);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .social-link:hover {
    background: var(--color-primary);
    border-color: var(--color-primary);
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(193, 106, 49, 0.2);
  }

  .footer-bottom {
    border-top: 1px solid rgba(253, 251, 247, 0.1);
    padding-top: 2rem;
    text-align: center;
    font-size: 0.85rem;
    color: rgba(253, 251, 247, 0.5);
    font-family: var(--font-body);
  }

  @media (max-width: 768px) {
    .footer-section {
      padding: 4rem 0 2rem;
    }
    
    .container {
      padding: 0 1.5rem;
    }

    .footer-content {
      margin-bottom: 3rem;
    }
  }
</style>
