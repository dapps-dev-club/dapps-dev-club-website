pragma solidity ^0.5.0;

contract Bank02 {
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
        require(msg.value > 0);
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
        success = true;
    }

    function withdraw(uint256 amount)
        public
        returns (bool success)
    {
        success = false;
        // TODO implement me
    }
}
