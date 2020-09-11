Units choose intentions based on the following algorithm:

1. TODO: Write this algorithm.

Once an intention has been determined, the intention persists until the task has been completed, or has been overridden.

# Activities

Activities are an enum, used in the definition of each signal.

- **push:** actively attempts to remove something
  - analogous to active provider chests in Factorio
  - primarily used for zoning for negative space, or to clear construction sites
- **passive:** indicates where something is
  - analogous to passive provider chests in Factorio
  - resources and units always give off this signal type
- **pull:** actively attempts to grab something
  - analogous to requester chests in Factorio
- **work:** requests worker input in a static location
  - used for calling workers over without needing them to bring a good
  - signal identity corresponds to the type of activity that needs to be performed

# Intents

Intents are a hierarchical enum, split into need / want / wander. Intents set a tangible behavioral pattern.

# Actions

Actions are tangible actions that units can take in order to carry out their intents.

# Tolerances

- units occasionally dying because they're stupid and wander too far from a source of food / water is probably fine
- units only ever care about the local neighborhood

# Constraints

- actions must be localized, and can affect adjacent tiles
- needs must override wants
- units should not yo-yo between two different needs
- failing to meet a need should have consequences. Ideally these are smooth

# Key Uncertainties

- what actions exist?
- what needs exist?
- how do we want to manage defecation?
- how do we want to manage nutritional balance?
- how do we manage traffic jams?
- do want intents persist between needs?
