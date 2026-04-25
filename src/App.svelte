<script>
  import './app.css';
  import Navbar from './components/Navbar.svelte';
  import Hero from './components/Hero.svelte';
  import About from './components/About.svelte';
  import Menu from './components/Menu.svelte';
  import Gallery from './components/Gallery.svelte';
  import Reviews from './components/Reviews.svelte';
  import Reservation from './components/Reservation.svelte';
  import Footer from './components/Footer.svelte';
  import Loader from './components/Loader.svelte';
</script>

<svelte:head>
  <title>Qaf Coffee & Eatery | Luxurious Minimalist</title>
  <meta name="description" content="Experience the finest coffee and exquisite eatery in a luxurious minimalist setting at Qaf Coffee & Eatery." />
</svelte:head>

<main>
  <Loader />
  <Navbar />
  <Hero />
  <About />
  <Menu />
  <Gallery />
  <Reviews />
  <Reservation />
  <Footer />
</main>
