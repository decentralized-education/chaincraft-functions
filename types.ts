type Web3OffchainFunctionResult = {
    status: "ok" | "error"
    result?: object
}
export type ActionOptions = {
    sender: string
    outputs?: object
}