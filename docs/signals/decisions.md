# Decisions

## The basics of unit behavior

Intents are the workhorse of each unit's internal AI, containing simple but coherent logic flows to ensure that tasks get completed once they are settled on.

Units determine their intent based on their current environment and internal state, then each time they need to act, consult the intent to determine both their next action and their new intent.

Intents are classified into two **priorities:** needs and wants. Needs override wants, to ensure that ants eat / drink / flee and so on in an appropriate fashion.

Tangibly, the core AI loop is given by:

1. Once enough time has elapsed, finish current action.
   1. All effects occur during the time step when actions complete.
   2. This can be done either by comparing to the system clock or using asynchronous methods (see Key Uncertainties).
2. If your current intent is not a need, check each of your needs.
   1. If a need is pressing:
      1. If your current intent is a want, store it as `previous_want` if it is a want. This becomes your new intent after the need is complete, but can be overridden in the usual fashion if other needs are still pressing.
      2. Set your current intent as the pressing need. Break.
3. Run your current intent. The internal control flow will determine both your action and your next intent.
4. Start the action returned by your current intent.
5. Set your new intent as the `next_intent` returned by your current intent.
   1. `think` will always set the next intent to a want: either the most pressing signal or `explore` if no relevant signals are found.
   2. Wants will always set the next intent to `think` once their task is complete, allowing them to select a new want.
   3. Needs will always set the next intent to the stored `previous_want` once their task is complete.

## Intents

Intents are chosen by the signals received (and, in the case of needs the internal state of the ant), and then set a tangible behavioral pattern that help the unit resolve the signal that caused them to occur.
Once an intent has been determined, the intent persists until overridden or until the action returned is completed (or abandoned).
While intents often contain an internal control structure and loop on themselves, they are stateless and their runtime behavior is a list of actions completed in order. When that list is finished, they may specify another intent to chain to, for yet more actions.

Intents are pure functions that take in information about the local environment and return a `(action, next_intent)` tuple.

`action` returns the action to begin, which always costs some energy and takes some time.

The `next_intent` field indicates which intent should come next.

Intents are recorded with a simple hierarchical enum. The top level is split into **need** and **want**. All intents fall into one of these categories for a total of two levels. `think` is the most basic intent, which is used to determine the next course of action and is described immediately below.

### Think

**Trigger:** A non-think want intent completed, or a new unit is created.

**Behavior:**

1. Compute preferences as the product of all push, pull and work signals in this unit's tile with the corresponding strain's signal sensitivities.
2. If the max preference is 0, return (`wait`, `explore`).
3. Set `new_intent` to the highest preference, creating an intent based on both the signal type and identity.
4. Return (`wait`, `new_intent`).

Attempting to act immediately will result in accessing tiny amounts of memory in a strange order, so we wait a very small amount of time to actually begin the next action.

### Needs

#### Defecation

**Trigger:** The unit's bowels are full.

**Behavior:** Return (`defecate`, `previous_want`)

#### Fear

**Trigger:** The sum of negative signals in the current tile is greater than their `fear_threshold`.

**Behavior:** Return (`hun`, `previous_want`).

#### Hunger

**Trigger:** The unit's energy has fallen below their `hunger_threshold`.

**Behavior:**

1. If carrying food, return (`eat`, `previous_want`).
2. If adjacent to food, return (`lift(food)`, `hunger`).
3. Otherwise, return (`travel (passive food)`, `hunger`).

#### Thirst

**Trigger:** The unit's water has fallen below their `thirst_threshold`.

**Behavior:**

1. If carrying food or water, return (`eat`, `previous_want`).
2. If adjacent to food or water, return (`lift(food or water)`, `thirst`).
3. Otherwise, return (`travel (passive water)`, `thirst`).

### Wants

#### Dump

**Trigger:** No pull signal was found for a push signal, or an apex was reached during travel while carrying an object.

**Behavior:**

A tile is suitable if it:

1.  Is not zoned, or is zoned with the corresponding object.
2.  It is either empty or contains an appropriate pile.
3.  It contains enough space to hold the object.

4.  If an adjacent tile is suitable:
    1.  In the case of a tie, select the tile with the lowest entity ID.
    2.  Return (`drop(object, tile)`, `think`).
5.  Otherwise, return (`wander`, `drop`).

### Explore

**Trigger:** No wants or needs were found.

**Behavior:** Return (`wander`, `think`).

#### Push

**Trigger:** A push signal was selected as the highest priority want. This intent also encodes the identity of the object requested.

**Behavior:**

1. If not carrying the identified object:
   1. If adjacent to a push emitter of the identified type, return `(lift(signal_identity, push_emitter_tile), push (signal_identity))`.
   2. Otherwise, return `(travel('push', signal_identity), push(signal_identity))`.
2. If carrying the identified object:
   1. If a pull signal of the identified type is detected, return `(travel('pull', signal_identity), pull(signal_identity))`.
   2. Otherwise, return (`wander, dump)`.

#### Pull

**Trigger:** A pull signal was selected as the highest priority want.

**Behavior:**

1. If not carrying the identified object:
   1. If a push signal of the identified type is detected, return `(travel('push', signal_identity), push(signal_identity))`.
   2. If adjacent to a passive emitter of the identified type, return `(lift(signal_identity, passive_emitter_tile), pull (signal_identity))`.
   3. Otherwise, return `(travel('passive', signal_identity), pull(signal_identity)`.
2. If carrying the identified object:
   1. If adjacent to a pull emitter of the identified type return `(drop(signal_identity, pull_emitter_tile), think)`.
   2. Otherwise, return `(travel('pull', signal_identity), pull(signal_identity))`.

#### Work

**Trigger:** A work signal was selected as the highest priority want.

**Behavior:**

1. If adjacent to a work emitter of the identified type, return `(craft(signal_identity), work (signal_identity)`).
2. Otherwise, return `travel('work', signal_identity), work(signal_identity)`.

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

### Flee

Emit fear signal, then immediately perform the wander action.

TODO: probably subtypes the wander action.

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
   2. If the unit is holding an object, the intent changes to dump.
   3. Otherwise, clear intent.
2. For each adjacent, passable tile:
   1. Add the strain-specific negative perception of a tile and the product of the intent signal and the corresponding signal sensitivity, producing a net perception for that tile.
3. Set the destination tile as the tile with the highest net perception.
4. Move to the destination tile.

TODO: how long are signals ignored for?

TODO: add movement calculations.

TODO: add the ability to walk over small structures, and the damage caused.

### Wait

Do nothing for the specified amount of time.

This is used when actions fail.

This is used for the `think` intent, to allow for better memory properties.

### Wander

1. Weight each adjacent, passable tile based on their `negative_perception`.
   1. A higher negative perception always results in a lower chance of selection: the weights must monotonically decrease with negative perception.
   2. Proportional scaling does not matter, as weights get renormalized to 1 anyways.
   3. `weight = 1 / negative_perceptions` is a sensible formula to start.
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
- matching push / pull will always be prioritized over passive, is this what we want?
- should units stampede? Emerges from the fear signal production while in the fear intent
  - creates automatic stampede when crowded due to negative response to other units
- How should we ensure the decision subroutine runs only when the action has finished? (System clock, callbacks, messages, etc.)
- how do we handle conflicting actions?
  - this is particularly bad when the actions occur in the same phase: e.g. picking up or putting down an object in the same tile
  - this is the same problem, from a technical perspective, as collision detection
- should we have flying units? how do they work?
  - ignores terrain
  - detects signals in a short radius
  - flies directly to those new signals
