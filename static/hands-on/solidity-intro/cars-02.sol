// variables reference types
pragma solidity ^0.5.0;

contract Cars {

    enum CarStatus { driving, parked }

    struct Car {
        bytes3 colour;
        uint8 doors;
        uint256 distance;
        uint16 lat;
        uint16 lon;
        CarStatus status;
        address owner;
    }

    uint256 public numCars = 0;
    mapping(uint256 => Car) public cars;

    constructor() public {}
}
