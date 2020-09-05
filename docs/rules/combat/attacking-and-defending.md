# Attacking and Defending

Almost every offensive action, from swinging a sword to throwing a fireball at your enemy to tricking them with illusions requires making an attack. The attacker rolls a d20, adds their attack bonus, and then compares the result to the defender’s defense. If the result is greater than or equal to the defense, the attack hits. “Meets it, beats it” can be a useful mnemonic for remembering this rule.

Just like with skills, if you are attacking with **advantage,** roll two d20s and use the higher result. If you are attacking with **disadvantage,** roll two d20s and select the lower result.

Attacks use either your **basic attack bonus** (proficiency bonus + Agility), or your **special attack bonus** (proficiency bonus + Expertise)..

**Basic attacks** are attempts to strike your opponent directly, and use the mundane properties of your currently equipped set of arms. This might be a classic sword or bow and arrows, but it could also be a set of claws, a flaming torch, or simple magic emanating from an ancient tome.

Basic attacks are always made against the defender’s **basic defense.** This reflects the effectiveness of their armor and their ability to dodge or parry blows. A player’s basic defense is, by default, 10 + Prowess + Agility, but wearing armor replaces the Prowess component with its own basic defense (which is determined by the affixes of the armor instead).

**Special** attacks are used for unusual effects and magical spells: attempting to trip your opponent, light them on fire, banish them to another realm or so on in ways that armor won’t help defend them from.

Each special attack is associated with a particular attribute. Your **special defense** for that attribute is 10 + your proficiency bonus + your corresponding attribute.

<div class="infobox">

**Terminology for special attacks**

Every special attack targets a different special defense corresponding to an attribute, and we need a fast way to distinguish this. This convention is best illustrated through an example. **A Focus attack, for example, is a special attack made against your target’s Focus special defense.** Add your special attack bonus (your proficiency bonus + your Expertise) to the d20 you rolled to make your attack, then compare it to your opponent’s Focus special defense to see if you hit. **You do not add your Focus to a Focus attack. The name refers to the relevant special defense.**

</div>

Unless there are particularly strange extenuating circumstances (such as if your ally is being carried away on horseback, or very far away through a cloud of smoke), **you can always hit a willing creature with an attack without needing to roll.**

If an effect tells you to select a creature within range, or something to that effect, you can always select yourself as the target unless there is some specific reason that you could not.

## Critical Hits and Efficacy

Whenever you roll a 20 on your d20 while making an attack (no matter what type of attack it is), your attack inflicts a **critical hit** (if it would otherwise land). When this happens, the **efficacy** of your attack is doubled.

Efficacy multiplies the following characteristics of attacks:

- The damage dealt. You do not roll again; simply multiply the damage dealt.
- The number of stacks of afflictions applied.
- The number of stacks of ailments applied.
- The amount of absorption applied or stolen.
- The distances involved in forced movement.

Multiple modifiers to efficacy (such as critical hits and Trickster's All In class feature) stack multiplicatively: if your attack would deal 7 damage, and then its efficacy was doubled twice, you would deal 28 damage instead. Like always, round down when computing the final effects after efficacy is applied.

Some effects (such as the _audacious_ combat talent or the _keen_ arms affix) can lower the **critical hit threshold,** allowing you to extend the range of numbers rolled which result in a critical hit. For example, if your critical hit threshold is lowered by one, any attack that you hit with where you rolled a 19 or 20 deals damage twice. These effects stack with each other. Determining whether an attack would be a critical hit is seperate from determining if it hits: rolls that are at least your critical hit threshold do not automatically make contact with your target(s), but are critical hits if they land.

## Attack Ranges

Attacks are either **melee** or **ranged.** While you are in an enemy zone of control, ranged attacks that you make have disadvantage.

Most melee attacks are made against any target within your zone of control, such as the Strike, Expose, and Shove core actions. However, some melee attacks have a fixed range, such as the Grapple major action or Paragon's Auras. Ranged attacks always have their exact range specified.

When a power describes its range as "weapon", its range is equal to that of your basic attacks. It is melee if your currently equipped arms makes melee basic attacks, and ranged if they make ranged basic attacks.

## Single-Target and Multi-Target Attacks

Attacks are either **single-target** or **multi-target.**
Many features are half as effective when used with multi-target attacks, in order to ensure their balance between hitting one versus many targets at once.

There are several commonly used terms to describe the area of effect of powers; their meaning is described in the table below.

## Weapon Modes

Some sets of arms can be used in different **modes** (such as _thrown_, _radial_, _piercing_, or _cleaving_).
Whenever you make a basic attack with one of these weapons, you may choose a mode to use, in addition to the **standard mode** (which attacks a single target at full efficacy at the weapon's range).
The mode of a weapon alters the base behaviour of the weapon, typically by altering its range, targets, efficacy or so on.

Modes can be combined, multiplying together any changes to efficacy. For example, you might combine the _splashing_ and _thrown_ modes when making an attack with a vial of bubbling acid.

<div class="infobox">

**Faster area attacks**

To accelerate the pace of combat, you may roll the same attack made against multiple targets a single time, affecting all creatures whose defense it meets or exceeds.

This has strange implications for the mechanics of combat even though the expected hit rate is the same (namely that lower defense creatures are always hit if a higher defense creature is), so we do not recommend calculating attacks this way unless you find it needed to speed up combat.

</div>

**Types of area of effect**

| Term     | Description                                                                                                                                                           |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cone     | A 90 degree cone, expanding out from the origin (typically the caster). This is measured as a 1/4 section of a sphere of the same radius.                             |
| Cylinder | A tall cylinder centered around the chosen point.                                                                                                                     |
| Line     | A line, typically beginning at the caster and affects all creatures within length specified. Lines wider than 1 tile expand out from both sides of the original line. |
| Sphere   | A sphere centered around the chosen point. This is measured as all tiles reachable by spending that many tiles of movement.                                           |
