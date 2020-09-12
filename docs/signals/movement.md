The behavior of units when they move between tiles is worth examining in detail.

# Movement with collision [rejected- hard mechanical constraints and techincal problems]

Units **move** when they take either the [travel](decisions.md?id=travel) or [wander](decisions.md?id=wander) actions.

There are four critical strategies to avoid serious traffic jams despite collisions:

1. Mild repulsion from other allied units, causing ties or near-ties to break in less congested directions.
2. Tiles are claimed by at most one unit at a time, to represent the process of a unit moving continuously between them. Units cannot move into a claimed tile.
3. The time step is smaller than the time it takes to move a unit between tiles. This also lets us increase speed.
4. Units that have been waiting longer get priority. This allows for smooth interlacing and automatic balancing.

Proposed movement with collision algorithm:

1. Select a destination tile.
   1. Destination tiles must be empty, not claimed and have a greater signal concentration than the current tile. This naturally leads to a 2 tile spacing between units moving in the same direction at the same speed.
   2. If no suitable unclaimed destination tiles exist, take the Wait action, with a time slightly greater than the `ActionTime` of the claimed tile.
   3. If no suitable destinations exist at all, ignore the current intent.
2. Mark the destination tile as **claimed**, recording the `ActionTime` of your movement.
3. Check that tiles are claimed only once.
   1. If a tile is claimed multiple times, all but the highest-priority unit take the Wait action until just after the `ActionTime` of the claimed tile instead. This ensures waiting units do not take huge amounts of CPU and creates a smooth spacing
   2. The unit with the highest priority is the one that has waited longest. In the case of a tie, use their entity ID. This prevents units getting endlessly stuck and produces a clean interleaving.
4. When your `ActionTime` is reached:
   1. If your claimed tile is empty, move there.
   2. If your claimed tile is occupied, select a new destination tile, then move there very quickly (but not instantly). This avoids memory thrash issues with accessing and modifying tiny bits of the position or claimed data structures out of order.

# Constraints

- core movement properties
  - **Quantized:** Units travel between tiles directly, always occupy a number (and shape) equal to their size.
  - **Variable:** Not all units travel at the same rate, and not all tiles take the same speed to cross.
  - **Signal-driven:** Units have no need for explicit pathfinding: they merely need to follow local signal gradients.
- requires additional checks on movement to avoid running into friends
- requires storing or broadcasting travel time between units (which may be variable)
- in ECS, the tilemap is probably going to be proxied, and this requires lots of read/write to that proxy system (or a copy of it)
- this imposes mechanical constraints:
  - reinforcing loop: systems are worker limited, and it's possible to get systems which can't fit all the workers they need. workers continue to pour in to serve the need, boxing in the ones who have completed the task (but not all the way). this continues until all the drones die.
  - noob trap: systems require relatively wide roads to move units around, but it's easy to build a large colony without doing this and screw your supply lines later on
  - prevents more interesting layouts for production facilities (tight fractals are impossible, so lines become more optimal)
  - fails to deliver on part of the fantasy: drones wait in patient lines, and trickle around slowly instead of chaotically whizzing back and forth
  - units feel more clunky than they are because they get stuck on each other
  
# Desired Properties
- Units should feel like the interact with each other. Factorio bots fail at this because they don't care about each other basically at all.

# Key uncertainties

- do we _want_ collisions between units for gameplay reasons?
- if we don't use unit collision, how do we ensure units don't "clump" too much? (We want to avoid this for clarity and reality reasons.)
- without hard collision, how to we incentivize wider paths for supply lines (ideally a bit softer)
