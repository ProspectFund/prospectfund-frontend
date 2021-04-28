<template>
  <div class="home">
    <h1>ProspectFund, Gamified deflationary token</h1>
    <h2>Insurance fund backed price floor<br>Dynamic burn rate<br>Burn tokens with up to a 10,000% ROI paid in BNB</h2>
    <router-link to="/app"><button class="btn btn-default">Open App</button></router-link>
    <br>
    <br>
    <a target="blank" href="https://t.me/prospectfund"><button class="btn btn-primary"><img style="width: 30px; padding: 5px" src="@/assets/icons/telegram-plane-brands.svg">Telegram</button></a>
    <br>
    <hr>
    <section>
      <header>
        <h2 id="Timeline">Project Road Map</h2>
      </header>
      <div class="terminal-timeline">
        <div class="terminal-card">
          <header>Trade in and lock liquidity for PROSPECT</header>
          <div>
            Tokens will be issued at 1000 PROSPECT per BNB, with a maximum of 100 BNB raised.
            After 100 BNB is reached, liquidity will be created and locked and tokens will be tradeable.
            50 BNB will be added to Pancake Pool liquidity at the rate of 750 PROSPECT per BNB, The remaining 50 BNB will go to the insurance fund.
          </div>
        </div>
        <div class="terminal-card">
          <header>Insurance Fund Activated</header>
          <div>
            The Insurance fund will allow users to sell back their PROSPECT for BNB at the insurance fund rate, setting a miniumum price floor.
            Users will also be able to mint new PROSPECT with BNB at 10% above the insurance fund rate.
          </div>
        </div>
        <div class="terminal-card">
          <header>Burn Lottery Released</header>
          <div>
            Users will able to burn their PROSPECT tokens for up to 100x their value back in BNB, the BNB will grow from burns and transaction.
          </div>
        </div>
      </div>
      <br>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>
