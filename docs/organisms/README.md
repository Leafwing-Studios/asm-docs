# Organisms

## Organism Properties

- must consume energy to survive
  - amount scales linearly with mass
  - small baseline upkeep cost, then linear scaling with actions
- can act on the environment, at a certain rate per unit time
  - effectiveness scales linearly with mass
  - only influences and detects their local environment
- vital statistics

  - core: entity ID, [identity](../signals/README.md), mass, energy, time of last action
  - nutritional: digestible carbon, indigestible carbon, nitrogen, phosphorus, inorganics
  - positional: tile location, shape
  - combat: HP, defense, energy

- produces a passive signal that corresponds to its identity and mass
- naturally regenerates life at the cost of energy

### Structure Properties

- cannot move
- grows and shrinks based on energy available, eventually reaching the carrying capacity of the cell
- automatically reproduces, spreading to nearby tiles
- max life is proportional to mass
- structures always occupy one tile

#### Plant Properties

- propagated by seeds
- does not share resources with adjacent structures of the same strain
- gathers energy by photosynthesis

#### Fungi Properties

- propagated by cuttings
- shares resources with adjacent structures of the same strain
- gathers energy by decomposition or parasitism

### Unit Properties

- able to move
- gathers
- [chooses](../signals/decisions.md) a course of action based on signals and the local environment
- able to take [actions](../signals/decisions.md) based on those choices
  - craft
  - defecate
  - drop
  - eat
  - flee
  - fight
  - lift
  - travel
  - wait
  - wander

## Constraints

## Uncertainties
