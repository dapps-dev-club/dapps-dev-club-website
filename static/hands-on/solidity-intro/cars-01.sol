// variables basic types
pragma solidity ^0.5.0;

contract Cars {
    bytes3 public colour;
    uint8 public doors;
    uint256 public distance;
    uint16 public lat;
    uint16 public lon;
    enum Status { driving, parked }
    Status public status;
    address public owner;

    constructor() public {}
}
