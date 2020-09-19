# Signal Sensitivity

## Desired Properties

- each strain of units has a defined **sensitivity** to every signal
- friendly structures (and sometimes units) can produce pull, push and work signals
  - these are controlled using a parallel UI
  - queens and larvae produce pull signals for food
- sensitivities always sum to one, unless they are negative.
- sensitivities are hierarchical, for easy adjustment
  - at each tier, they sum to 1 for automatic normalization
- changing sensitivities should be fast and cheap, to allow for easy debugging
  - costs a small amount of [agency](pheromones.md)

## Constraints

- sensitivity needs to be easily tuned to allow for debugging problematic behavior
- constantly changing sensitivities should not be a viable strategy for micro

## Key Uncertainties

- how do you change sensitivities from a UI perspective?
