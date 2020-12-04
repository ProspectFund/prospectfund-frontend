<template>
  <div class="home">
    <h1>Ever growing price floor<br>Transactions dynamically burn supply<br>Mine Gems with up to a 10,000% ROI</h1>
    <button class="btn btn-primary"><img style="width: 30px; padding: 5px" src="@/assets/icons/telegram-plane-brands.svg">Telegram</button>
    <hr>
    <section>
      <header>
        <h2 id="Timeline">Presale In Progress</h2>
      </header>
      <h2>Purchase $PGOV</h2>
      <div class="progress-bar progress-bar-show-percent">
        <div class="progress-bar-filled" style="width: 30%" data-filled="7.51/25 ETH Sold"></div>
      </div>
      <form @submit.prevent.stop>
        <fieldset>
          <legend>Purchase</legend>
          <div class="form-group">
            <label for="itext">ETH Amount</label>
            <input id="itext" name="itext" type="text" />
          </div>
          <div class="form-group">
            <button class="btn btn-default" role="button" name="submit" id="submit">Buy PGOV</button>
          </div>
        </fieldset>
      </form>
      <br>
      <h2>PGOV Sale ETH Allocation</h2>
      <div class="progress-bar progress-bar-show-percent">
        <div class="progress-bar-filled" style="width: 20%" data-filled="PRES Liquidity: 5 ETH"></div>
      </div>
      <div class="progress-bar progress-bar-show-percent">
        <div class="progress-bar-filled" style="width: 20%" data-filled="PGEM Liquidity: 5 ETH"></div>
      </div>
      <div class="progress-bar progress-bar-show-percent">
        <div class="progress-bar-filled" style="width: 20%" data-filled="PGOV Liquidity: 5 ETH"></div>
      </div>
      <div class="progress-bar progress-bar-show-percent">
        <div class="progress-bar-filled" style="width: 40%" data-filled="Development: 10 ETH"></div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Governance',
}
</script>
