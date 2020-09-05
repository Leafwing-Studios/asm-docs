# Hidden Quantum

While hidden:

- your position is uncertain, as explained below
- you do not impose disadvantage on ranged attacks to creatures in your zone of control
- you cannot shift
- for the purposes of determining ranges for your actions (such as attacks of opportunity), you are treated as if you occupied all of your active hiding spots

The hidden status on you ends immediately after:

- one of your hiding spots is revealed, and the investigating creature rolled an 1 on their discovery roll
- you spend movement to travel laterally
- you make an attack against any creature other than yourself
- you apply a boon to any creature other than yourself

After you are revealed, you appear in the tile from which you took the action in question (having been hiding there all along) and gain the **ambush** boon until the end of the current turn. When you have the ambush boon, gain advantage on all attacks. Some affixes make use of the ambush keyword to provide additional benefits.

Other creatures can reveal hiding spots by taking the Scan minor action or Track reaction. Hiding spots are also immediately revealed when they are no longer veiled, as defined in the [Hide minor action.]()

When a hiding spot is revealed, the creature who revealed the hiding spot makes a **discovery roll:**

1. Roll 1dX, where X is the remaining number of hiding spots that creature has.
2. On a result of 1, the hidden status ends. Remove all hiding spots associated with that creature from the battlemap.
3. On any other result, remove this hiding spot from the battlemap.

You may always choose to be revealed by a discovery roll.

<div class="infobox">

**Rolling 1dX with rejection sampling**

Discovery rolls tell you to "Roll 1dX, where X is the remaining number of hiding spots that creature has."
While this makes plenty of sense as a game mechanic, the implementation can be a bit puzzling.

If you're playing on a virtual tabletop, this is trivial. Simply /roll 1d7 and you're good to go.
Those playing with physical dice may find this more challenging: few people have a d2, d3, d5 or a d7 around!

The fastest and easiest way to mimic dice with unusual numbers of sides is a technique called **rejection sampling:**

1. Pick a die that is slightly larger than the die you wish to simulate. If you were rolling a d7, pick a d8 for example.
2. Roll the larger die.
3. If the roll is possible on the desired die (in our example 1 through 7), you're done! Use this roll.
4. If the roll is larger than the highest value possible on the desired die (in our example, an 8), roll the dice again. Repeat until you get a valid number.

This produces fair results quickly and without the need for any special tools.

</div>

Creatures (and other entities such as traps or pools of acid) can make attacks can be made against your hiding spot, guessing that you are there:

1. If the attack would hit your defense, the attacker makes a discovery roll, revealing hiding spots in the usual fashion.
   1. No discovery roll is made (and hence no hiding spots are revealed) if you miss.
2. On a roll of 1, you also suffer the attack's effects.
3. On any other roll, you do not suffer the attack's effects (as you were not in that location after all).

If multiple hiding spots would be hit by a multi-target attack, the discovery roll is a success on any number less than or equal to the number of hiding spots that would be hit. In that case, reveal all hiding spots other than those that were hit.

Boons (and other effects which do not require an attack roll) function in an identical fashion, except that your hiding spots are not revealed due to the discovery rolls. BUG: If the boon is successfully applied, you are either in that location, or inconsistencies are created.
