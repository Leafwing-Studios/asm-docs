# Decisions

## The basics of unit behavior

<<<<<<< Updated upstream
Every time step, each unit who is not currently taking an action completes their previous action, chooses a new action, and then begins that action.
=======
Units follow the following core AI loop for all their behavior. The first step "Finish current action" can be done either by comparing to the system clock or using asynchronous methods (see Key Uncertainties).
>>>>>>> Stashed changes

1. Finish current action
1. If your current intent is not a need, check needs in deterministic order. If any are pressing, drop your current intent and switch to that need. Store the original next intent so you can go back to it after your needs are taken care of. Break.
1. Follow the “next” intent from your finished intent (this may be itself). Keep in mind the two special cases:
  - If the action had a “previous” next, switch to the intent that you saved.
  - If the action had a “break” next, determine your next intent. Compare the weighted signal strengths in your current tile, then pick the highest one.
1. Follow the intent's internal control flow to determine your next action.

<div class="infobox">

**Everything is More Complicated Than You Think**

This AI logic has a lot of weird nuance to it that we're not trying to nail down exactly right now. A list of things to keep in mind later:
- If you get two needs in a row, you must still return to your original want. You should be remembering the chain from wants, not needs.
- Needs should not interrupt each other, but they should be able to chain. For example, you can switch to a different need after your current need has finished, but you can interrupt a want chain with a need (even if it is not complete).

</div>

## Intents

Intents are chosen by the signals received (and occasionally the internal state), and then set a tangible behavioral pattern that help the unit resolve the signal that caused them to occur. Once an intent has been determined, the intent persists until overridden or until the action returned is completed. While intents often contain an internal control structure and loop on themselves, their runtime behavior is a list of actions completed in order. When that list is finished, they may specify another intent to chain to, for yet more actions.

Intents are pure functions that take in the local environment (but not signals) and return a `(action, next_intent)` tuple. Intents do not operate on signals, as that logic is performed when choosing the intent. The `next_intent` field indicates which intent should come next, if any. They can specify themselves, or the previous intent (although this should be reserved only for interrupts, like needs). Finally, they can also default to the regular intent logic by specifying `break`.

Intents are recorded with a hierarchical enum. The top level is split into **need, want,** and **wander.** All intents fall into one of these categories for a total of two levels.

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
- How should we ensure the decision subroutine runs only when the action has finished? (System clock, callbacks, messages, etc.)
- I feel like the current intent system is more complicated than it needs to be. The intents are useful because they can specify arbitrary chains, which is elegant and clear. However, I can't shake the feeling that we have more logic levels than needed. Better tech for handling interrupts may be the best way forward.
