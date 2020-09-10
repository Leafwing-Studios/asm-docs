**Signals** are the primary method by which information is transmitted between organisms, representing scents that slowly diffuse over the landscape.
They are intended to guide unit behavior in a scalable fashion by providing a framework for both path finding and decision making that avoids repeated work.

Every [resource](../resources/README.md) and [organism](../organisms/README.md) [produces](signal-production.md) a signal, allowing [units](../organisms/units.md) and [combinators](../organisms/combinators.md) to sense the environment around them.

Signals are stored for each [tile](../environment/tiles.md), and then [diffuse](diffusion.md) to their neighbors.

Units read the signals in their tile to [decide](decisions.md) what they want to do, then follow the gradient of that signal to eventually reach the source of the signal.

Players can readily adjust [signal sensitivity](sensitivity.md) on a per-strain basis to shift priorities and ensure desired unit behavior.

Players can examine the signals present in an area through various [analytics](../ui/analytics.md).

# Data structure

Signals are stored in a hierarchical enum, providing an organization for players to understand the complex array of signals available.

The leaf nodes of this hierarchy of are floats, representing the localized quantity of signal present.

# Constraints

- signal intensity needs high granularity to allow for gradual resource build-ups
- signal intensity must be continuous to avoid ties

# Key Uncertainties

- should signals actually be stored on a per-tile basis? This seems unidiomatic in ECS
