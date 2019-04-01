## Functions

Here we add a few functions to the contract.

- `addCar`
- `driveCar`
- `parkCar`

The `addCar` function creates a new `Car` struct, and saves it to the `cars`
mapping.

The `driveCar` and `parkCar` functions modify the state of existing cars.

All of the functions have `require()` statements at the beginning, and these
are used to assert that certain prerequisite conditions are met before
proceeding.

For example `addCar` checks that you have paid some Ether to the contract,
and both `driveCar` and `parkCar` checks that you're operating a car that you
own, not one that belongs to someone else.
