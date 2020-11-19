The behavior of units when they move between tiles is worth examining in detail.

# Constraints
- must be relatively cycle-efficient
  
# Desired Properties
- should leverage signal gradients as they are precomputed to help with this task
- can be executed concurrently
- Units should feel like the interact with each other. Factorio bots fail at this because they don't care about each other basically at all.

# Uncertainties
- if we don't use unit collision, how do we ensure units don't "clump" too much? (We want to avoid this for clarity and reality reasons.)
- without hard collision, how to we incentivize wider paths for supply lines (ideally a bit softer)
