## Events

- `event CarHonk`
- `indexed`
- `emit CarHonk`

Here we have defined a new event named `CarHonk` that has two parameters which
indicate the IDs of the car that does the honking, and the car that is on the
receiving end of the honk.

The keyword `indexed` means that the events are logged in such a manner that
they are easily searchable by that particular event parameter. This will be useful for those which are listening to the events.

Finally we wrote a new function where which allows the owner of a car to honk at another car, by emitting the `CarHonk` event that was defined earlier.
