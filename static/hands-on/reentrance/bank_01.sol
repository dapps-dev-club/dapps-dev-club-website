pragma solidity ^0.5.0;

contract Bank01 {
    // state
    mapping(address => uint256) public balances;

    // events
    event Withdrawal(address indexed sender, uint256 amount);
    event Deposit(address indexed sender, uint256 amount);

    // methods
    constructor() public payable {
        // we do not have any non-default initial state
    }

    function deposit()
        public
        payable
        returns (bool success)
    {
        success = false;
        // TODO implement me
    }

    function withdraw(uint256 amount)
        public
        returns (bool success)
    {
        success = false;
        // TODO implement me
    }
}
