pragma solidity ^0.8.0;

contract SecureEtherTransfer {
  address payable public owner;

  modifier onlyOwner() {
    require(msg.sender == owner, "Only owner can call this function");
    _;
  }

  constructor(address payable _owner) {
    owner = _owner;
  }

  function transferEth(address payable _sender, address payable _recipient, uint256 _amount) public onlyOwner {
    require(_sender != address(0), "Invalid sender address");
    require(_recipient != address(0), "Invalid recipient address");
    require(_amount > 0, "Transfer amount must be greater than zero");

    
     require(_sender.balance >= _amount, "Insufficient funds in sender's account");

    _sender.transfer(_amount);
  }
}
