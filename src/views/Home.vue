<template>
  <div class="home">
    <h1>ProspectFund, Self Regulating Liquidity for Gaming</h1>
    <h2>Ever growing price floor<br>Transactions dynamically burn supply<br>Mine Gems with up to a 10,000% ROI</h2>
    <router-link to="/wallet"><button class="btn btn-default">Open Wallet</button></router-link>
    <br>
    <br>
    <a target="blank" href="https://t.me/prospectfund"><button class="btn btn-primary"><img style="width: 30px; padding: 5px" src="@/assets/icons/telegram-plane-brands.svg">Telegram</button></a>
    <br>
    <hr>
    <section>
      <header>
        <h2 id="Timeline">Project Features</h2>
      </header>
      <div class="terminal-timeline">
        <div class="terminal-card">
          <header>Prospect Reserve Token ($PRES)</header>
          <div>
            Prospect Reserve Token holds the liquidity, in the form of Ether, for the whole platform. These tokens have a dynamic transaction burn, from a base of 5% to a maximum of 50% depending on the current Uniswap price, this dynamic burn will help stabilize price by creating arbitrage opportunities between the redeem value and Uniswap price. The maximum supply is 10,000 $PRES, and can be minted with Ether. PRES Can be redeemed for Ether at anytime or sold on Uniswap. 
          </div>
        </div>
        <div class="terminal-card">
          <header>Prospect Gems ($PGEM)</header>
          <div>
            Prospect Gems are the gaming chips of the ecosystem. $PGEM are issued by providing $PRES for a Gem Bond, which mature into $PGEM at different time frames depending on your time preference and user demand. The base function of $PGEMS before integrating with games will be their ability to burn for Ether, with up to 10,000% the $PGOV cost to create. Transfers have a 10% transfer fee, which will fund the redemption jackpot.
          </div>
        </div>
        <div class="terminal-card">
          <header>Dynamic Burn And Token Price Floor</header>
          <div>
            Since PRES holds the liquidity for the platform it is important to stabilize and grow the price of the token as the platform grows. Dynamic burn rates on transactions and the ability to mint and redeem tokens for a base price will force this to happen, regardless of the liquidity on Uniswap and dampens the effects of price manipulation. The dynamic burn will cause an arbitrage opportunity between Uniswap prices and inbuilt mint & redeem features. The calculation for the dynamic burn rate is: 5% base fee, when Uniswap price is greater than 10% of the base minting price the fee is 50% of the price difference.
          </div>
        </div>
        <div class="terminal-card">
          <header>Prospect Governance Token ($PGOV)</header>
          <div>
            $PGOV is an utility token that is used for governance in the ecosystem via vote by burn. PGOV will be issued to users for participating in the ecosystem. Earn PGOV for issuing PGEM's and providing liquidity. 
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
