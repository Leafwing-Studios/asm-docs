# Map Generation

## Desired Properties

- strong, meaningful spatial heterogeneity
- patchy resource distribution

## Constraints

- must be controllable with a random seed
- cannot use infinite just-in-time maps
  - environment acts on its own, unlike Factorio and Minecraft
  - continuity is much more important, and much harder, so we can't afford hard chunk edges
- need a burn-in period in order to let things stabilize

## Key Uncertainties

- what are the resources in question?
- how are threats handled?
- how are we handling map size?
- what process balances erosion?
  - if left to run forever, the world will end up flat, which is bad
- what's our map topology?
  - two good options: islands and toroidal geometry
  - islands are simpler but a bit weird thematically
    - global warming sea level rise?
    - non-water barriers?
  - toroids are elegant
    - how much does it slow down neighbor checking?
    - does this do weird things to our water physics?
    - can we afford a large enough map that your base is very unlikely to loop into itself?
