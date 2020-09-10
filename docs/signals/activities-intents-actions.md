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

# Intents

# Constraints

- actions must be localized, and can affect adjacent tiles

# Key Uncertainties

- what actions exist?
-
