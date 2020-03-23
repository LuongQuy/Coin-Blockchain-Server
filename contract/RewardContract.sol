pragma solidity ^0.4.11;

contract SmartReward {
    address public owner;
    mapping (string => uint) private reward;

    function SmartReward () {
        owner = msg.sender;
    }

    modifier ifOwner() { 
        if (msg.sender != owner) {
            revert();
        }
        _;
    }

// Give reward after completing certain task
    function giveReward(string _email, uint _value) public ifOwner{
        if (_value < 0) revert();
        reward[_email] += _value;
    }

// Get user's current reward points
    function getReward(string _email) constant returns(uint) {
        return reward[_email];
    }

// Spend reward to buy items
    function spendReward(string _email, uint _value) ifOwner {
        if (reward[_email] < _value ) revert();
        reward[_email] -= _value;
    }

// Fallback function - Called if other functions don't match call or
    function () public payable {
        revert(); // revert() reverts state to before call
    }
}