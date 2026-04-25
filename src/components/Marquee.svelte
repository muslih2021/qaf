<script>
  export let text = "FRONTEND // BACKEND // IOT // ROBOTICS";
</script>

<div class="marquee-container">
  <div class="marquee-content">
    {#each Array(10) as _, i}
      <div class="marquee-text">
        {text} 
        <span class="marquee-icon"></span>
      </div>
    {/each}
  </div>
</div>
