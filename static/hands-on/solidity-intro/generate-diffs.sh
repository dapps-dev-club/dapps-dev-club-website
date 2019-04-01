#!/bin/bash
diff --unified=3 null.sol cars-00.sol > cars-null-00.sol.diff
diff --unified=3 cars-00.sol cars-01.sol > cars-00-01.sol.diff
diff --unified=3 cars-01.sol cars-02.sol > cars-01-02.sol.diff
diff --unified=3 cars-02.sol cars-03.sol > cars-02-03.sol.diff
diff --unified=3 cars-03.sol cars-04.sol > cars-03-04.sol.diff
diff --unified=3 cars-04.sol cars-05.sol > cars-04-05.sol.diff
