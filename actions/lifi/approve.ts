import { Contract, ethers } from "ethers"
import ERC20_ABI from "../../abi/ERC20"

const approve = async (wallet, tokenAddress, approvalAddress, amount) => {

    if (tokenAddress === ethers.constants.AddressZero) {
        return true
    }
    const erc20 = new Contract(tokenAddress, ERC20_ABI, wallet)
    const allowance = await erc20.allowance(await wallet.getAddress(), approvalAddress)

    if (allowance.lt(amount)) {
        const approveTx = await erc20.approve(approvalAddress, amount)
        return approveTx
    }

    return true
}


export default approve