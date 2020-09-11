# Signals

**Signals** are the primary method by which information is transmitted between organisms, representing scents that slowly diffuse over the landscape.
They are intended to guide unit behavior in a scalable fashion by providing a framework for both pathfinding and decision making that avoids repeated work.

Every [resource](../resources/README.md) and [organism](../organisms/README.md) [produces](production-diffusion.md) a signal, allowing [units](../organisms/units.md) and [combinators](../organisms/combinators.md) to sense the environment around them.

Signals are stored for each [tile](../environment/tiles.md), and then [diffuse](production-diffusion.md) to their neighbors.

Units read the signals in their tile to [decide](decisions.md) their [intent](decisions.md?id=intents), following the gradient of that signal to eventually reach the source of the signal and then finally perform the appropriate [action](decisions.md?id=actions).

Players can readily adjust [signal sensitivity](sensitivity.md) on a per-strain basis to shift priorities and ensure desired unit behavior.

Players can examine the signals present in an area through various [analytics](../ui/analytics.md).

## Data structure

Signals are a three-tuple of an signal type, an identity and a float that represents the amount of signal present.

[**Signal type**](activities-actions-intents.md) is an enum:

- **passive:** indicates where something is
  - analogous to passive provider chests in Factorio
  - resources and units always give off this signal type
  - signals to avoid something use passive signals and a negative signal-weight
- **push:** actively attempts to remove something
  - analogous to active provider chests in Factorio
  - primarily used for zoning for negative space, or to clear construction sites
  - push and pull signals are used together to transport goods
- **pull:** actively attempts to grab something
  - analogous to requester chests in Factorio
- **work:** requests workers to perform a task
  - used for calling workers over without needing them to bring a good
  - signal identity corresponds to the type of activity that needs to be performed

**Identity** is stored in a hierarchical [non-exhaustive](https://doc.rust-lang.org/reference/attributes/type_system.html) enum, providing an organization for players to understand the complex array of objects available.
This enum is reused throughout the game, and updated when new strains are created.

## Standard use cases

### Keeping a tile clear

1. The player zones a tile as clear.
2. Something occurs that causes the tile contents to be non-empty.
3. Signal buildup occurs, recruiting units.
4. The unit follows the push signal.
5. The unit picks up as much of the tile contents as they can carry.
   1. If the tile is now empty, the push emitter turns off.
6. The unit searches for a corresponding pull signal.
   1. If a pull signal is found, they change their intent to that pull signal.
      1. They follow that pull signal, and drop off the object they are holding there.
      2. If the apex is reached with no available action, their intent changes to dump.
   2. If none can be found, they change their intent to "dump".
      1. While their intent is dump, they wander until they find a tile that can accept the object they are holding.

### Creating a new structure

1. The player zones a tile with the structure.
   1. The player can zone more tiles, increasing signal strength and thus the amount of workers that attempt to bring material.
   2. The player can
2. If the tile is not clear, it emits a push signal for its current contents. See _Keeping a tile clear_ above.
   1. This is needed to be sure that weeds don't constantly overgrow.
3. The tile simultaneously emits a pull signal for its desired contents via signal buildup, recruiting units.
4. The unit searches for a corresponding push signal. Either:
   1. A push signal is found, and the unit sets their new intention as this push signal.
   2. No push signal is found. The unit follows the gradient of the corresponding passive signal.
5. The unit follows the signal gradient until they are adjacent to a suitable tile.
   1. A tile is suitable for the push signal intent if it contains a push signal emitting organism.
   2. A tile is suitable for the pull signal intent if it contains a passive signal emitting organism.
6. If the unit had a push signal intent, it now swaps to a pull signal intent.
7. The unit now follows the pull signal gradient until it is adjacent to a pull signal emitting organism.
8. The unit deposits the chunk of the structure they were holding.
9. The zoning signal weakens. If the structure is fully built, the zoning signal stops emitting.
10. Other units who were chasing the pull signal continue following the signal:
    1. If other emitters exist nearby, they will deposit their object near there instead.
    2. If the apex is reached with no available action, their intent changes to dump.

### Repairing a structure

1. The player zones a tile with the structure.
2. The structure is damaged.
3. The zoning signal strengthens based on the amount of mass missing.
4. Replacement material / organisms are fetched, following _Creating a New Structure_ above.

### Fetching an ingredient

1. The structure requests the ingredient and signal build-up occurs.
2. A unit sets its intent to the appropriate ingredient.
3. The unit fetches the ingredient, following the pull activity, as outlined in _Creating a New Structure_ above.

### Storing processed goods

1. Either:
   1. The structure provides a push signal. Goods are taken away and stored wherever possible.
   2. The structure provides a passive signal. Goods are taken away when a pull signal exists.

### Work is needed

1. Signal build-up occurs.
2. Workers are summoned.
3. Workers occupy adjacent tiles, performing work on the structure, until a need is met or the work emitter stops.

## Constraints

- signal intensity needs high granularity to allow for gradual resource build-ups
- signal intensity must be continuous to avoid ties

## Key Uncertainties

- should signals actually be stored on a per-tile basis? This seems unidiomatic in ECS
  - use external system with proxy system to access it
