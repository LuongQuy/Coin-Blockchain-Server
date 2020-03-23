module.exports = {
    contractABI: [
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_email",
                    "type": "string"
                }
            ],
            "name": "getReward",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_email",
                    "type": "string"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "giveReward",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_email",
                    "type": "string"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "spendReward",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "payable": true,
            "stateMutability": "payable",
            "type": "fallback"
        }
    ],
    contractAddress: '0xfc343485714460d0ca45262dd57219808340521a'
}