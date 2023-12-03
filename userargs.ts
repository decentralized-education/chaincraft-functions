// TranferTo WETH
export const userargs = {
    task:{
        filters:[[{
            type:"GASPRICE",
            condition:"LESS",
            value:"99999999999"
        }]],
        action:{
            type:"SEND_ERC20",
            fromAddress:"",
            toAddress:"",
            tokenAddress:"0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9", // WETH
            value:"0.000000000000000001"
        }
    }
}

// TranferTo WMATIC
// export const userargs = {
//     task:{
//         filters:[[{
//             type:"GASPRICE",
//             condition:"LESS",
//             value:"50"
//         }]],
//         action:{
//             type:"SEND_ERC20",
//             toAddress:"",
//             fromAddress:"",
//             address:"0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889", // WMATIC
//             value:"0.01"
//         }
//     }
// }

function escapeRegExp(string:any) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }
  
  function replaceAll(str:any, find:any, replace:any) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
  }

console.log("user args for gelato ",JSON.stringify(userargs.task))
// This is for the json file
console.log("user args for file ",replaceAll(JSON.stringify(userargs.task),"\"","\\\""))