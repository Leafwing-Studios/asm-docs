When a unit completes its current [action](../organisms/actions.md), it must decide what to do next.

Units have three possible behaviors: following a [**need**](needs.md), following a **want**, or [wandering](../organisms/actions.md).

Units choose intentions based on the following algorithm:

1. If a unit has a pressing need, this becomes their new intention. If they have more than one, they follow a standard but arbitrary order.
2. Multiply all push and pull signals in the current tile by the units by the unit's corresponding [signal sensitivity](sensitivity.md), producing **perceptions**.
3. Select the highest value as the unit's **intention.**
4. If there are no pressing needs or active push / pull signals, the unit wanders.

Once an intention has been determined, the intention persists until the task has been completed, or has been overridden.
Needs override wants override wandering.

# Competing wants

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
- do want intents persist between needs?
