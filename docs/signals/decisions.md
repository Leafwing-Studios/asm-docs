When a unit completes its current [action](../organisms/actions.md), it must decide what to do next.

Units have two possible concerns: [**needs**](needs.md) and **wants**, discussed here.

If a unit has no pressing needs, it determines which want to pursue based on the following algorithm:

1. Multiply all signals in the current tile by the units by the unit's corresponding [signal sensitivity](sensitivity.md), producing **perceptions**.
2. Select the highest value as the unit's **intention.**
3. Once an intention has been determined, the unit checks to see if the appropriate action can be performed while in the current tile.
   1. If yes, it performs that action.
   2. If not, a **direction** is chosen, based on which adjacent, empty tile contains the highest concentration of the appropriate signal.

When selecting a direction, negative perceptions are summed, then subtracted from the corresponding tile.
This helps units avoid bad paths, which contain excessive congestion, dead allies or dangerous hazards.

# Tolerances

- we only ever need orderings to decide what to do
- we should be able to batch the negative perceptions if necessary
- we only ever care about the local neighborhood

# Constraints

- needs must override wants

# Key Uncertainties

- how do we manage traffic jams?
- how do we avoid constant intention shifting given the time delay of propagation?
- does making fear a need create the appropriate behavior?
