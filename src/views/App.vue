<template>
  <div class="home">
    <div v-if="connected">
      <br>
      <p>Connected {{ walletAddress }} <a @click="disconnect">Disconnect Wallet</a></p>
      <hr>
      <h2>Current Burn {{ transferFee }}%</h2>
      <p>Minimum rate 5%, <br>the higher the price rises above the base price the higher the burn gets 🚀🚀🚀</p>
      <div class="terminal-card">
        <header>PROSPECT Token</header>
        <div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-around">
          <h2>Price: {{ Number(ProspectBNBPrice).toFixed(6) }} BNB <strong>(~${{ Number(BNBUSDPrice * ProspectBNBPrice).toFixed(2) }})</strong></h2>
          <h2><strong>PROSPECT Balance:</strong> {{ balance }} (~${{ Number(balance * ProspectBNBPrice * BNBUSDPrice).toFixed(2) }}), <a :href="`https://exchange.pancakeswap.finance/#/swap?outputCurrency=${outputAddress}`" target="_blank">Buy On PancakeSwap</a></h2>
          <h2>Circulating Supply: {{ totalSupply }} / 100000</h2>
          <h2>Market Cap: ${{ Math.floor(totalSupply * BNBUSDPrice * ProspectBNBPrice) }}</h2>
        </div>
      </div>
      <br>
      <!-- <div class="terminal-card"> -->
      <!--   <header>Prospect Gem</header> -->
      <!--   <div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-around"> -->
      <!--     <div> -->
      <!--       <h2>Stats</h2> -->
      <!--       <p>Supply: </p> -->
      <!--       <p>Transfer Fee: 10%</p> -->
      <!--       <p>Uniswap Price: </p> -->
      <!--     </div> -->
      <!--     <div> -->
      <!--       <h2>Rewards</h2> -->
      <!--       <p>Jackpot: {{ 'Not Added' }} Ether</p> -->
      <!--       <p>Total Reward Pool: {{ 'Not Added' }} Ether</p> -->
      <!--     </div> -->
      <!--   </div> -->
      <!-- </div> -->
      <!-- <br> -->
      <!-- <div class="terminal-card"> -->
      <!--   <header>Wallet Balances</header> -->
      <!--   <div style="text-align: center"> -->
      <!--     <h2><strong>PRES </strong> {{ presBalance }} (<a href="https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x30E08EAf7E641D89276043CEBC5E324Bd11c2147" target="_blank">Uniswap</a>)</h2> -->
      <!--     <h2><strong>PGEM </strong> 0.00 (Uniswap Coming Soon)</h2> -->
      <!--     <h2><strong>PGOV </strong> {{ pgovBalance }} (<a href="https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x8f339cead5c2463ff5fe2426faa708ea9eaef441" target="_blank">Uniswap</a>)</h2> -->
      <!--   </div> -->
      <!-- </div> -->
      <!-- <br> -->
      <fieldset>
        <legend>Sell your LP</legend>
        <p>Sell the LP to the insurance fund, it will pay you 10% premium in PROSPECT and the LP gets locked.</p>
        <div class="form-group">
          <label>Amount of LP to sell:</label>
          <input type="number" v-model="sellLPInput"/>
        </div>
        <div class="form-group">
          <label>Max Sell Amount: {{ maxLPSell }}</label>
        </div>
        <div class="form-group">
          <label>LP Balance: {{ lpBalance }}</label>
        </div>
        <div class="form-group">
          <button v-if="Number(approvedLPToLock) >= Number(sellLPInput) || !sellLPInput" @click="sellLP" class="btn btn-default" type="submit" role="button" name="submit" id="submit">Sell LP</button>
          <button v-else @click="approveLP" class="btn btn-default" type="submit" role="button" name="submit" id="submit">Approve LP Tokens</button>
        </div>
      </fieldset>
      <br>
      <fieldset>
        <legend>Mint</legend>
        <div class="form-group">
          <label>Amount to mint:</label>
          <input type="number" v-model="mintInput"/>
        </div>
        <div class="form-group">
          <label>Max Mint Amount: {{ 100000 - totalSupply }}</label>
        </div>
        <div class="form-group">
          <label>Base Price: {{ basePrice }} Ether</label>
        </div>
        <div v-show="mintInput" class="form-group">
          <label>{{ mintInput }} PROSPECT = {{ Number(basePrice * mintInput).toFixed(6) }} BNB</label>
        </div>
        <div class="form-group">
          <button @click="mint" class="btn btn-default" type="submit" role="button" name="submit" id="submit">Buy</button>
        </div>
      </fieldset>
      <br>
      <fieldset>
        <legend>Burn PROSPECT</legend>
        <div class="form-group">
          <label>Amount to burn:</label>
          <input type="number" v-model="burnInput"/>
        </div>
        <div class="form-group">
          <label>Your PRES Balance: {{ balance }}</label>
        </div>
        <div class="form-group">
          <label>Base Price: {{ basePrice }} BNB</label>
        </div>
        <div v-show="burnInput" class="form-group">
          <label>Redeem Value: {{ burnInput }} PROSPECT = {{ Number(basePrice * burnInput).toFixed(6) }} BNB</label>
        </div>
        <div v-show="burnInput" class="form-group">
          <label style="color: #ff3c74">Fee: -{{ Number(basePrice * burnInput * 0.1).toFixed(6) }} BNB</label>
        </div>
        <div v-show="burnInput" class="form-group">
          <label>You will receive: ~{{ Number(basePrice * burnInput * 0.9).toFixed(6) }} BNB</label>
        </div>
        <div class="form-group">
          <button @click="burn" class="btn btn-default" type="submit" role="button" name="submit" id="submit">Burn</button>
        </div>
      </fieldset>
      <br>
      <br>
    </div>
    <div v-else style="text-align: center">
      <br>
      <button @click="connect" class="btn btn-default"><img style="width: 35px; margin: 3px" src="@/assets/icons/metamask-fox.svg">Connect Wallet</button>
    </div>
  </div>
</template>

<script>
import { providers, Contract, utils, BigNumber, constants } from 'ethers';
import presABI from "@/assets/abi/pres.json";
import uniswapPairABI from "@/assets/abi/uniswapPair.json";

const prospectAddress = "0x2520fFB5421Fe83F25362f0c94b749cE7EA764a6";
const prospectBNBPairAddress = "0x608A9AabA21B22151D2feeB01845e3B2293bcD2A";
const BNBBUSDPairAddress = "0x1b96b92314c44b159149f7e0303511fb2fc4774f";

export default {
  name: 'App',
  data() {
    return {
      outputAddress: prospectAddress,
      connected: !window.ethereum || !window.ethereum.selectedAddress ? false : true,
      walletAddress: !window.ethereum || !window.ethereum.selectedAddress ? "..." : window.ethereum.selectedAddress,
      signer: undefined,
      mintInput: undefined,
      sellLPInput: undefined,
      burnInput: undefined,
      utils: utils,
      basePrice: 0.005,
      totalSupply: 10000,
      balance: '0.00',
      lpBalance: '0.00',
      transferFee: '5.00',
      ProspectBNBPrice: "0.00",
      BNBUSDPrice: "0.00",
      lpTotalSupply: "0.00",
      prospectInLP: "0.00",
      maxLPSell: "0.00",
      approvedLPToLock: 0,
    }
  },
  methods: {
    connect() {
      window.ethereum.request({ method: 'eth_requestAccounts' }).then(() => {
        this.connected = true;
        this.signer = new providers.Web3Provider(window.ethereum);
        this.walletAddress = window.ethereum.selectedAddress;
        this.loadData();
      })
    },
    disconnect() {
      this.connected = false;
    },
    mint() {
      const signer = new providers.Web3Provider(window.ethereum).getSigner();
      const presContract = new Contract(prospectAddress, presABI, signer);
      presContract.mint({ value: BigNumber.from(String(Number(this.mintInput) * Number(this.basePrice) * 1000000000000000000)) }).then(tx => tx.wait(1)).then(() => this.loadData());
      this.mintInput = undefined;
    },
    burn() {
      const signer = new providers.Web3Provider(window.ethereum).getSigner();
      const presContract = new Contract(prospectAddress, presABI, signer);
      presContract.redeem(utils.parseEther(this.burnInput)).then(tx => tx.wait(1)).then(() => this.loadData());
      this.burnInput = undefined;
    },
    approveLP() {
      const signer = new providers.Web3Provider(window.ethereum).getSigner();
      const presContract = new Contract(prospectBNBPairAddress, presABI, signer);
      presContract.approve(prospectAddress, constants.MaxUint256).then(tx => tx.wait(1)).then(() => this.loadData());
    },
    sellLP() {
      const signer = new providers.Web3Provider(window.ethereum).getSigner();
      const presContract = new Contract(prospectAddress, presABI, signer);
      presContract.lockLiquidity(utils.parseEther(this.sellLPInput).toString()).then(tx => tx.wait(1)).then(() => this.loadData());
      this.sellLPInput = undefined;
    },
    async loadData() {
      const signer = new providers.Web3Provider(window.ethereum).getSigner();
      const prospectContract = new Contract(prospectAddress, presABI, signer);
      const prospectLiqContract = new Contract(prospectBNBPairAddress, uniswapPairABI, signer);
      prospectContract.balanceOf(this.walletAddress).then(r => this.balance = Number(utils.formatEther(r)).toFixed(2));
      prospectContract.baseValue().then(r => this.basePrice = Number(utils.formatEther(r)).toFixed(6));
      prospectContract.fee().then(r => this.transferFee = Number((1 - Number(utils.formatEther(r))) * 100).toFixed(2));
      prospectLiqContract.getReserves().then(r => {
        const _reserve0 = r[0].toString();
        const _reserve1 = r[1].toString();
        this.ProspectBNBPrice = Number(utils.formatEther(BigNumber.from(_reserve1).mul("1000000000000000000").div(BigNumber.from(_reserve0))))
      })
      prospectLiqContract.balanceOf(this.walletAddress).then(r => this.lpBalance = Number(utils.formatEther(r)).toFixed(2));
      prospectLiqContract.allowance(this.walletAddress, prospectAddress).then(r => this.approvedLPToLock = Number(utils.formatEther(r)));
      Promise.all([
        prospectContract.balanceOf(prospectBNBPairAddress).then(r => this.prospectInLP = r),
        prospectContract.totalSupply().then(r => this.totalSupply = Math.ceil(utils.formatEther(r))),
        prospectLiqContract.totalSupply().then(r => this.lpTotalSupply = utils.formatEther(r))
      ]).then(() => this.maxLPSell = Number(utils.formatEther(BigNumber.from(utils.parseEther(String(100000 - this.totalSupply))).div(BigNumber.from(this.prospectInLP).mul('2').div(BigNumber.from(utils.parseEther(this.lpTotalSupply)))))).toFixed(6));
      const bnbbusdLiqContract = new Contract(BNBBUSDPairAddress, uniswapPairABI, signer);
      bnbbusdLiqContract.getReserves().then(r => {
        const _reserve0 = r[0].toString();
        const _reserve1 = r[1].toString();
        this.BNBUSDPrice = Number(utils.formatEther(BigNumber.from(_reserve1).mul("1000000000000000000").div(BigNumber.from(_reserve0))))
      })
    }
  },
  computed: {
    addjustedUniBuy: function () {
      return Number(this.presUniPrice * (1 + (Number(this.transferFee)/100))).toFixed(6);
    },
    addjustedUniSell: function () {
      return Number(this.presUniPrice * (1 - (Number(this.transferFee)/100))).toFixed(6)
    },
    addjustedMint: function () {
      return Number(this.basePrice * (1 + (Number(this.transferFee)/100))).toFixed(6);
    },
    addjusteRedeem: function () {
      return Number(this.basePrice * (1 + (Number(this.transferFee)/100)) * 0.9 ).toFixed(6);
    }
  },
  mounted() {
    this.loadData();
  }
}
</script>
