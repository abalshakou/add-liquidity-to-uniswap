const { ethers } = require('ethers')
const { abi: INonfungiblePositionManagerABI } = require('@uniswap/v3-periphery/artifacts/contracts/interfaces/INonfungiblePositionManager.sol/INonfungiblePositionManager.json')

require('dotenv').config()

const INFURA_URL_TESTNET = process.env.INFURA_URL_TESTNET
const WALLET_ADDRESS = process.env.WALLET_ADDRESS
const WALLET_SECRET = process.env.WALLET_SECRET

const positionManagerAddress = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88" // NonfungiblePositionManager

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(INFURA_URL_TESTNET)

    const nonfungiblePositionManagerContract = new ethers.Contract(
        positionManagerAddress,
        INonfungiblePositionManagerABI,
        provider
    )
     const wallet = new ethers.Wallet(WALLET_SECRET)
    const connectedWallet = wallet.connect(provider)

    nonfungiblePositionManagerContract.connect(connectedWallet).positions(
        '22993'
    ).then((res) => {

        const totalLiquidity = res.liquidity.toString()
        const halfLiquidity = parseInt(totalLiquidity / 2)

        params = {
            tokenId: 22993,
            liquidity: halfLiquidity,
            amount0Min: 0,
            amount1Min: 0,
            deadline: Math.floor(Date.now() / 1000) + (60 * 10),
        }

        nonfungiblePositionManagerContract.connect(connectedWallet).decreaseLiquidity(
            params,
            { gasLimit: ethers.utils.hexlify(1000000)}
        ).then((res2) => {
            console.log(res2)
        })
    })
}

main()