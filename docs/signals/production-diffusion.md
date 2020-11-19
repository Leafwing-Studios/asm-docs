# Signal Production

Organisms and resources steadily produce signals, slowly spreading out.

# Signal Diffusion

Signal diffusion operates using a modification of the standard [diffusion equation](https://en.wikipedia.org/wiki/Diffusion_equation).

The critical properties of the standard diffusion equation are:

- no material is created or destroyed
- the rate of flux is proportional to the local density gradient (Fick's first law)
  - the density gradient is just the difference in signals divided by the distance between tiles
  - the scaling parameter here is the global `SIGNAL_PROPAGATION_RATE`

We modify this in the following ways:

- the rate of diffusion through a tile is also multiplied by that tiles **diffusivity**, which is always in [0, 1]
  - typically, this should reduce units' movement by the same amount, in order to ensure that the signal gradient always leads to the shortest path
- signals decay in proportion to their quantity
  - this is required to ensure that the total quantity over time reaches an equilibrium despite the constant production
  - this is controlled by a global `SIGNAL_DECAY_RATE` parameter
- once a signal is below the threshold, it is clipped to zero
  - this reduces issues with numerical instability and excessive computation
  - it serves no real gameplay purpose

# Negative perceptions

After we diffuse signals, compute the strain-specific negative perception for each signal, by summing the product of all negative signal sensitivities and the corresponding signals.

As a performance optimization, we can filter for tiles that are currently near units of that strain.

This is used repeatedly, when checking for the `fear` need, and in the `travel` and `wander` strain, so is probably worth precomputing.

# Signals and Construction

Signals disappear from a tile when diffusivity hits 0.

# Tolerances

- at most tiles, actual signal value does not matter, because there is no unit or combinator there
  - we only ever need orderings to decide what to do

# Constraints

- signals must build up over time if a constant emitter is left unsatisfied
  - this ensures an automatic balancing of effort
  - it's alright if

## Production

- everything needs a different type of signal, or differences can't be detected
- everything needs to produce a passive signal, or it can't be detected

## Diffusion

- signal quantity during diffusion is conserved or decays in order to ensure that it doesn't pile up endlessly
- signals are always stronger closer to their stationary source
- signal intensity should not have waves: this limits the order of the partial differential equation used
- signal intensity should not have checker-board artifacts: this may limit our discretization approach

# Uncertainties

- how often do signal emitters need to tick?
- do we need to incorporate fancier discretization schemes in order to avoid artifacts?
- can we compute these faster by taking a less local approach?
- how does diffusion interact with changes in height?
- would it be possible to eliminate the time delay of signal propagation? Would we even want to do this?
  - can we swap to something like local regression or CNNs to approximate this instead?
  - [Arad et al. 1995](https://onlinelibrary.wiley.com/doi/abs/10.1002/nme.1620381104) seems like a promising start
  - this seems to violate the constraint that signals must build up :(
- does chasing a moving target using signals work properly? Is this desired?
- are waves produced when buildings / resources only tick infrequently?
- how can we tweak and alter signals in interesting ways to change the default behaviors?
