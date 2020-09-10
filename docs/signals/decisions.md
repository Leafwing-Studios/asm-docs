When a unit completes its current [action](../organisms/actions.md), it must decide what to do next.

Units have three possible behaviors: following a [**need**](needs.md), following a **want**, or [wandering](../organisms/actions.md).

Units choose intentions based on the following algorithm:

1. If a unit has a pressing need, this becomes their new intention. If they have more than one, they follow a standard but arbitrary order.
2. Multiply all push and pull signals in the current tile by the units by the unit's corresponding [signal sensitivity](sensitivity.md), producing **perceptions**.
3. Select the highest value as the unit's **intention.**
4. If there are no pressing needs or active push / pull signals, the unit wanders.

Once an intention has been determined:

1. The intention persists until the task has been completed, or has been overridden.
   1. Needs override wants, which override wandering.
2. The unit checks to see if the appropriate action can be performed while in the current tile.
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
- does making fear a need create the appropriate behavior?
- do we need to let wants overpower current intentions before items get picked up? This is slower and fussier, but might result in more responsiveness
