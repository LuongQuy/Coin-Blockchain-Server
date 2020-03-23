const Web3 = require('web3');
const contract_config = require('../configs/contract_config')
const account_config = require('../configs/account_config')
const Tx = require('ethereumjs-tx')
const coinModel = require('../models/coin')
const historyModel = require('../models/history')
 
//Infura HttpProvider Endpoint
const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/66c96dc1ab7a4473b0866d378964e9d5"));

const myAccount = account_config.address;
const privateKey = Buffer.from(account_config.privateKey, 'hex')

web3.eth.defaultAccount = myAccount;

exports.addCoin = (req, res) => {
    var email = req.body.email;
    var coin = req.body.coin;

    coinModel.findOne({email: email}, (err, coinDoc) => {
        if(coinDoc){
            coinDoc.coin = parseInt(coinDoc.coin) + parseInt(coin);
            coinDoc.save((err, result) => {
                var newHistoryDoc = new historyModel({
                    email: email,
                    comment: 'add ' + coin + ' coin'
                });
                newHistoryDoc.save((err, result) => {});

                return res.send(result);
            });
        } else{
            var newCoinDoc = new coinModel({
                email: email,
                coin: coin
            });
            newCoinDoc.save((err, result) => {
                var newHistoryDoc = new historyModel({
                    email: email,
                    comment: 'add ' + coin + ' coin'
                });
                newHistoryDoc.save((err, result) => {});
                
                return res.json(result);
            })
        }
    }) 
}

exports.getCoin = (req, res) => {
    coinModel.findOne({email: req.body.email}, (err, result) => {
        res.json(result);
    })
}

exports.withdrawEth = (req, res) => {
    var email = req.body.email;
    var address = req.body.address;
    var coin = req.body.coin;
    var ethAmount = (parseFloat(coin)/1000).toString();

    coinModel.findOne({email: email}, (err, coinDoc) => {
        if(coinDoc){
            if(coinDoc.coin >= coin){
                if(web3.utils.isAddress(address)){
                    web3.eth.getTransactionCount(myAccount, (err, txCount) => {
                        // Build the transaction
                        var txObjectToContract = {
                            nonce:    web3.utils.toHex(txCount),
                            to:       address,
                            value:    web3.utils.toHex(web3.utils.toWei(ethAmount, 'ether')),
                            gasLimit: web3.utils.toHex(2100000),
                            gasPrice: web3.utils.toHex(web3.utils.toWei('6', 'gwei')),
                            chainId: 3
                        }
                        // Sign the transaction
                        var tx = new Tx(txObjectToContract);
                        tx.sign(privateKey);
                    
                        var serializedTx = tx.serialize();
                        var raw = '0x' + serializedTx.toString('hex');
                        
                        var transaction = web3.eth.sendSignedTransaction(raw, (err, tx) => {
                            if(!err){
                                coinDoc.coin -= coin;
                                coinDoc.save((err, result) => {
                                    if(err) console.log('coinDoc.coin ' + err);
                                });

                                var newHistoryDoc = new historyModel({
                                    email: email,
                                    comment: 'add ' + coin + ' coin'
                                });
                                newHistoryDoc.save((err, result) => {console.log('newHistoryDoc ' + err)});
                                
                                return res.json({
                                    status: 'done',
                                    transaction_hash: tx
                                })
                            }else{
                                return res.send('web3.eth.sendSignedTransaction ' + err);
                            }
                        });
                    });
                }else{
                    return res.json({
                        status: 'fail',
                        message: 'invalid ethereum anddress'
                    });
                }
            }else{
                return res.json({
                    status: 'fail',
                    message: 'balance is not enough'
                });
            }
        }else{
            return res.json({
                status: 'fail',
                message: 'this email is not exist in the database'
            });
        }
    })
}

exports.getHistory = (req, res) => {
    var email = req.body.email;
    historyModel.findOne({email: email}, (err, result) => {
        return res.json(result);
    })
}