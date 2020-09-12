# Decisions

# The basics of unit behavior

Every time step, each unit who is not currently taking an action completes their previous action, chooses a new action, and then begins that action.

1. For each unit at each time step:
   1. If the matching `ActionTime` field is less than or equal to the current time, they may act during this time step.
      1. Complete their `CurrentAction`.
      2. Determine their intent, below.
      3. Set `CurrentAction` to the action specified by that intent.
      4. Subtract energy based on the `EnergyCost` of the action.
      5. Set `ActionTime` equal to the current time plus the `TimeCost` of the action.

## Intents

Every time step, each unit that is not action chooses an intent according to the following algorithm:

1. If the unit's intent is already a need, break.
2. Check each need in a deterministic order.
   1. If a need is pressing, set intent to that need and break.
3. If the unit is already carrying an object, break.
4. Compare wants.
   1. Compute preferences as the product of each push / pull signal in the current tile by the unit's corresponding signal sensitivity.
   2. Set intent to the highest preference and break.
5. If no wants were found, set the intention to wander.

Once an intent has been determined, the intent persists until overridden or removed as part of the intent logic.

Intents contain a simple control flow, always terminating with exactly one action for the time step.

Intents are recorded with a hierarchical enum, split into need / want / wander. Intents set a tangible behavioral pattern that help the unit resolve the signal that caused them to occur.

### Needs

#### Defecation

**Trigger:** The unit's bowels are full.

**Behavior:** Pause to defecate in the current tile. This enriches the soil with nutrients. Then, clear intent.

#### Fear

**Trigger:** The sum of negative signals in the current tile is greater than their `fear_threshold`.

**Behavior:** Produce fear signal, take the wander action, then clear intent.

#### Hunger

**Trigger:** The unit's energy has fallen below their `hunger_threshold`.

**Behavior:** If carrying food, eat. If adjacent to food, lift it. Otherwise, travel following the strongest (weighted) passive food signal.

#### Thirst

**Trigger:** The unit's water has fallen below their `thirst_threshold`.

**Behavior:** If carrying food, eat. If adjacent to food, lift it. Otherwise, travel following the strongest (weighted) passive water signal.

### Wants

#### Dump

**Trigger:** No pull signal was found for a push signal, or an apex was reached during travel while carrying an object.

**Behavior:**

1. If an adjacent tile is suitable, drop the object there, then clear intent.
2. Otherwise, wander.

TODO: how are ties broken for dropping objects?

#### Push

**Trigger:** A push signal was selected as the highest priority want. This intent also encodes the identity of the object requested.

**Behavior:**

1. If not carrying the identified object:
   1. If adjacent to a push emitter, lift the specified object from the strongest push emitter.
   2. Otherwise, travel to follow the push signal.
2. If carrying the identified object:
   1. If a pull signal of the identified type exists, change intent to that pull signal.
   2. Otherwise, change intent to dump.

#### Pull

**Trigger:** A pull signal was selected as the highest priority want.

**Behavior:**

1. If not carrying the identified object:
   1. If a corresponding push signal is found, change intent to that push signal.
   2. If adjacent to a passive emitter of that object, lift the specified object from the strongest passive emitter.
   3. Otherwise, follow the corresponding passive signal.
      1. If the apex of the passive signal is reached and no object exists to be picked up, ignore this signal for some period of time.
2. If carrying the identified object:
   1. If adjacent to a corresponding pull emitter, drop the object on the strongest emitter.
   2. Otherwise, travel to follow the pull signal.

#### Work

**Trigger:** A work signal was selected as the highest priority want.

**Behavior:**

1. If adjacent to a corresponding work emitter, take the craft action.
2. Otherwise, travel to follow the work signal.

### Wandering

**Trigger:** No wants or needs were found.

**Behavior:** Take the wander action, then clear intent.

## Actions

Actions are tangible actions that units can take in order to carry out their intents.

Every action has an associated energy cost (which may be 0) and time cost (which cannot be 0).

### Craft

Performs work at an adjacent matching structure.

### Defecate

TODO: add defecation mechanics.

### Drop

Place the currently carried object in an adjacent tile.
The tile must either be empty, set up to receive an input of the appropriate type, or already contain the same sort of object.

If something is in the way, you pick it up simultaneously, then look for the corresponding pull signal. If none is found, dump.

### Eat

Consumes the currently held object.

TODO: add food mechanics.

### Fight

TODO: add combat mechanics.

### Lift

Picks up the desired object from an adjacent tile.

For piles and structures, breaks off an amount of mass equal to the `LiftingCapacity` of the unit.
If there is not enough mass available, all remaining mass is taken and the tile is set to empty.

### Travel

Determines where to move, then moves there.

1. If the intent signal is stronger in the current tile than any of its neighbors:
   1. Ignore this signal for some period of time.
   2. If the unit is holding a tile, the intent changes to dump.
   3. Otherwise, clear intent.
2. For each adjacent, passable tile:
   1. Sum all negative perceptions and the product of the intent signal and the corresponding signal sensitivity, producing a net perception for that tile.
3. Set the destination tile as the tile with the highest net perception.
4. Move to the destination tile.

TODO: how long are signals ignored for?

TODO: add movement calculations.

### Wait

Do nothing for the specified time period. Record how long you've been waiting. Whenever a different action completes, reset this time to 0.

### Wander

1. Weight each adjacent, passable tile based on their negative signals.
2. Select one of those tiles randomly as the destination tile.
3. Move to that tile.
4. Clear intent.

TODO: how exactly do negative signals get weighted?
TODO: can we eliminate the randomness?

## Tolerances

- units occasionally dying because they're stupid and wander too far from a source of food / water is probably fine
- units only ever care about the local neighborhood

## Constraints

- actions must be localized, and can affect adjacent tiles
- needs must override wants
- units should not yo-yo between two different needs
- failing to meet a need should have consequences. Ideally these are smooth

## Key Uncertainties

- how do we manage traffic jams?'
  - is a negative attraction to other units adequate?
- do want intents persist between needs?
- matching push / pull will always be prioritized over passive, is this what we want?
- should units stampede? Emerges from the fear signal production while in the fear intent
  - creates automatic stampede when crowded due to negative response to other units
