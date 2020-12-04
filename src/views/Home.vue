<template>
  <div class="home">
    <h1>Ever growing price floor<br>Transactions dynamically burn supply<br>Mine Gems with up to a 10,000% ROI</h1>
    <button class="btn btn-primary" style="margin: 5px"><img style="width: 30px; padding: 5px" src="@/assets/icons/telegram-plane-brands.svg">Telegram</button>
    <br>
    <button @click="$router.push('/dao')"  class="btn btn-default btn-ghost" style="margin: 5px; height: 54px">$PGOV Presale Live</button>
    <hr>
    <section>
      <header>
        <h2 id="Timeline">Project Features</h2>
      </header>
      <div class="terminal-timeline">
        <div class="terminal-card">
          <header>Prospect Reserve Token ($PRES)</header>
          <div>
            Prospect Reserve Token holds the liquidity, in the form of Ether, for the whole platform. These tokens have a dynamic transaction burn, from a base of 5% to a maxium of 50% depending on the current Uniswap price, this dynamic burn will help stablize price by creating arbritage oportunities between the redeem value and Uniswap price. The maximum supply is 10,000 $PRES, and can be minted with Ether. PRES Can be redeemed for Ether at anytime or sold on Uniswap. 
          </div>
        </div>
        <div class="terminal-card">
          <header>Prospect Gems ($PGEM)</header>
          <div>
            ...
          </div>
        </div>
        <div class="terminal-card">
          <header>Dynamic Burn And Token Price Floor</header>
          <div>
            ...
          </div>
        </div>
        <div class="terminal-card">
          <header>Prospect Governance Token ($PGOV)</header>
          <div>
            ...
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
