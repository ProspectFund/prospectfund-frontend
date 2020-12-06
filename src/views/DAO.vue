<template>
  <div class="home">
    <h1>ProspectFund, Self Regulating Liquidity for Gaming</h1>
    <h2>Ever growing price floor<br>Transactions dynamically burn supply<br>Mine Gems with up to a 10,000% ROI</h2>
    <a target="blank" href="https://t.me/prospectfund"><button class="btn btn-primary"><img style="width: 30px; padding: 5px" src="@/assets/icons/telegram-plane-brands.svg">Telegram</button></a>
    <hr>
    <section>
      <header>
        <h2 id="Timeline">Presale In Progress</h2>
      </header>
      <h2>Purchase $PGOV</h2>
      <div class="progress-bar progress-bar-show-percent">
        <div class="progress-bar-filled" :style="soldPercent" :data-filled="soldAmount"></div>
      </div>
      <form @submit.prevent.stop>
        <fieldset>
          <legend>Purchase</legend>
          <div class="form-group">
            <label for="itext">ETH Amount</label>
            <input id="itext" name="itext" type="number" v-model="buyAmount" />
          </div>
          <h4 v-if="buyAmount">{{ buyAmount }} ETH = {{ 100 * buyAmount }} PGOV</h4>
          <h4 v-else>1 ETH = 100 PGOV</h4>
          <div class="form-group">
            <button @click="buy" class="btn btn-default" role="button" name="submit" id="submit">Buy PGOV</button>
          </div>
        </fieldset>
      </form>
      <br>
      <h2>PGOV Sale ETH Allocation</h2>
      <p>The purchase of PGOV Tokens is not a financial investment and market value is not guaranteed by ProspectFund. $PGOV is an utility token that is used for governance in the ecosystem via vote by burn.</p>
      <br>
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
    <br>
  </div>
</template>

<script>
import { providers, Contract, utils } from 'ethers';
import presaleABI from "@/assets/abi/presale.json";
const presaleAddress = "0x43d97E6742f135Cd05a8665479f21fCd124C06e2";

export default {
  name: 'Governance',
  data() {
    return {
      soldAmount: "0.00/25 ETH Sold",
      soldPercent: "width: 0.00%",
      buyAmount: undefined
    }
  },
  methods: {
    buy() {
      window.ethereum.request({ method: 'eth_requestAccounts' }).then(() => {
        const signer = new providers.Web3Provider(window.ethereum).getSigner();
        const presaleContract = new Contract(presaleAddress, presaleABI, signer);
        const value = utils.parseEther(this.buyAmount);
        presaleContract.buy({ value });
      })
    }
  },
  mounted() {
    const defaultProvider = new providers.getDefaultProvider();
    const presaleContract = new Contract(presaleAddress, presaleABI, defaultProvider);
    presaleContract.soldEth().then(r => {
      const eth = Number(utils.formatEther(r)).toFixed(2);
      this.soldAmount = `${eth}/25 ETH Sold`;
      this.soldPercent = `width: ${Number((Number(eth) / 25) * 100).toFixed(2)}%`;
    })
  }
}
</script>
