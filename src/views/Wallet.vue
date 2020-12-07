<template>
  <div class="home">
    <div v-if="connected">
      <br>
      <p>Connected {{ walletAddress }} <a @click="disconnect">Disconnect Wallet</a></p>
      <hr>
      <div class="terminal-card">
        <header>Token Info</header>
        <div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-around">
          <div>
            <h2>PRES</h2>
            <p>Supply: {{ totalSupply }} / 10000</p>
            <p>Base Price: {{ basePrice }} Ether</p>
            <p>Transfer Fee: {{ transferFee }}%</p>
            <p>Uniswap Price: {{ presUniPrice }} Ether</p>
          </div>
          <div>
            <h2>PGOV</h2>
            <p>Supply: {{ pgovSupply }}</p>
            <p>Uniswap Price: {{ pgovUniPrice }} Ether</p>
          </div>
        </div>
      </div>
      <br>
      <div class="terminal-card">
        <header>Wallet Balances</header>
        <div style="text-align: center">
          <h2><strong>PRES </strong> {{ presBalance }} (<a href="https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x30E08EAf7E641D89276043CEBC5E324Bd11c2147" target="_blank">Uniswap</a>)</h2>
          <h2><strong>PGEM </strong> 0.00 (Uniswap Coming Soon)</h2>
          <h2><strong>PGOV </strong> {{ pgovBalance }} (<a href="https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x8f339cead5c2463ff5fe2426faa708ea9eaef441" target="_blank">Uniswap</a>)</h2>
        </div>
      </div>
      <br>
      <fieldset>
        <legend>Mint PRES</legend>
        <div class="form-group">
          <label>Amount to mint:</label>
          <input type="number" v-model="mintInput"/>
        </div>
        <div class="form-group">
          <label>Max Mint Amount: {{ 10000 - totalSupply }}</label>
        </div>
        <div class="form-group">
          <label>Base Price: {{ basePrice }} Ether</label>
        </div>
        <div v-show="mintInput" class="form-group">
          <label>{{ mintInput }} PRES = {{ Number(basePrice * mintInput).toFixed(4) }} Ether</label>
        </div>
        <div class="form-group">
          <button @click="mint" class="btn btn-default" type="submit" role="button" name="submit" id="submit">Mint</button>
        </div>
      </fieldset>
      <br>
      <fieldset>
        <legend>Burn PRES</legend>
        <div class="form-group">
          <label>Amount to burn:</label>
          <input type="number" v-model="burnInput"/>
        </div>
        <div class="form-group">
          <label>Your PRES Balance: {{ presBalance }}</label>
        </div>
        <div class="form-group">
          <label>Base Price: {{ basePrice }} Ether</label>
        </div>
        <div v-show="burnInput" class="form-group">
          <label>Base value: {{ burnInput }} PRES = {{ Number(basePrice * burnInput).toFixed(4) }} Ether</label>
        </div>
        <div v-show="burnInput" class="form-group">
          <label style="color: #ff3c74">Fee: -{{ Number(basePrice * burnInput * 0.1).toFixed(4) }} Ether</label>
        </div>
        <div v-show="burnInput" class="form-group">
          <label>You will receive: ~{{ Number(basePrice * burnInput * 0.9).toFixed(4) }} Ether</label>
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
import { providers, Contract, utils, BigNumber } from 'ethers';
import presABI from "@/assets/abi/pres.json";
import uniswapPairABI from "@/assets/abi/uniswapPair.json";

const presAddress = "0x30E08EAf7E641D89276043CEBC5E324Bd11c2147";
const pgovAddress = "0x8f339CEAd5c2463Ff5Fe2426FAa708ea9eAeF441"

export default {
  name: 'Wallet',
  data() {
    return {
      connected: !window.ethereum || !window.ethereum.selectedAddress ? false : true,
      walletAddress: !window.ethereum || !window.ethereum.selectedAddress ? "..." : window.ethereum.selectedAddress,
      mintInput: undefined,
      burnInput: undefined,
      basePrice: 0.005,
      totalSupply: 10000,
      pgovSupply: '',
      pgovBalance: '0.00',
      presBalance: '0.00',
      transferFee: '5.00',
      presUniPrice: "0.00",
      pgovUniPrice: "0.00"
    }
  },
  methods: {
    connect() {
      window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
        this.connected = true;
        this.walletAddress = accounts[0];
        this.loadData();
      })
    },
    disconnect() {
      this.connected = false;
    },
    mint() {
      const signer = new providers.Web3Provider(window.ethereum).getSigner();
      const presContract = new Contract(presAddress, presABI, signer);
      presContract.mint({ value: BigNumber.from(String(Number(this.mintInput) * Number(this.basePrice) * 1e18)) })
      this.mintInput = undefined;
    },
    burn() {
      const signer = new providers.Web3Provider(window.ethereum).getSigner();
      const presContract = new Contract(presAddress, presABI, signer);
      presContract.redeem(BigNumber.from(String(Number(this.burnInput) * 1e18)));
      this.burnInput = undefined;
    },
    async loadData() {
      const signer = new providers.Web3Provider(window.ethereum).getSigner();
      const presContract = new Contract(presAddress, presABI, signer);
      const pgovContract = new Contract(pgovAddress, presABI, signer);
      const pgovLiqContract = new Contract("0x82D324e710c7c72A196ca1838480665f5Bc85026", uniswapPairABI, signer);
      const presLiqContract = new Contract("0xe1420b0add4c9fc136765dd028baebc6b500aac2", uniswapPairABI, signer);
      presContract.balanceOf(this.walletAddress).then(r => this.presBalance = Number(utils.formatEther(r)).toFixed(2));
      presContract.baseValue().then(r => this.basePrice = Number(utils.formatEther(r)).toFixed(4));
      presContract.fee().then(r => this.transferFee = Number((1 - Number(utils.formatEther(r))) * 100).toFixed(2));
      presContract.totalSupply().then(r => this.totalSupply = Number(utils.formatEther(r)).toFixed(2));
      pgovContract.balanceOf(this.walletAddress).then(r => this.pgovBalance = Number(utils.formatEther(r)).toFixed(2));
      pgovContract.totalSupply().then(r => this.pgovSupply = Number(utils.formatEther(r)).toFixed(2));

      pgovLiqContract.getReserves().then(r => {
        const { _reserve0, _reserve1 } = r;
        this.pgovUniPrice = Number(utils.formatEther(BigNumber.from(_reserve1).mul("1000000000000000000").div(BigNumber.from(_reserve0)))).toFixed(4)
      })
      presLiqContract.getReserves().then(r => {
        const { _reserve0, _reserve1 } = r;
        this.presUniPrice = Number(utils.formatEther(BigNumber.from(_reserve1).mul("1000000000000000000").div(BigNumber.from(_reserve0)))).toFixed(4)
      })
    }
  },
  mounted() {
    this.loadData();
  }
}
</script>
