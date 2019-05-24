pragma solidity ^0.5.0;

contract Bank05 {
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
        require(balances[msg.sender] >= amount);
        balances[msg.sender] -= amount;
        emit Withdrawal(msg.sender, amount);
        msg.sender.transfer(amount);
        // the above line loses flow control, whenever msg.sender is a contract,
        // so if we do not reach the next line that is OK.
        // How about the state changes? `.transfer()` reverts automatically
        // if it fails, so the state changes never get recorded.
        success = true;
    }
}

contract Bank05Robber {
    Bank05 public target;
    uint public count;

    event Robbed(uint256 balance);

    constructor (address newTarget)
        public
        payable
    {
        target = Bank05(newTarget);

        // call deposit, which is payable, with `msg.value=100`,
        // in order ot allow attack
        target.deposit.value(100)();
    }

    function steal() public {
        // attack
        target.withdraw(100);
    }

    function balance()
        public
        view
        returns (uint)
    {
        return address(this).balance;
    }

    function ()
        external
        payable
    {
        if (count < 10) {
            // reenter ten times with maliciours intent
            count++;
            target.withdraw(100);
            emit Robbed(address(this).balance);
        }
    }
}
