

    Final Fantasy IV Without Leveling (working title)



NOTE: This mod is still very much in development!  The later part of the game (i.e. the Giant of Babil forward, and the two side dungeons in the underworld) are largely untouched, and bosses and enemies before that still need work.  Going to add more equipment to the game too.

NOTE: Unequip your characters before they leave!  If they're wearing expensive equipment, then you'll lose their value!  Adding an auto-unequip for leaving characters is on my todo list but it hasn't been done yet.



This mod removes XP and the leveling system from Final Fantasy IV, and then rebalances the game to work without levels.  Character stats are now static throughout the game (though can be boosted with equipment), and monster stats are all altered so fights "feel" roughly the same as when you play them at an appropriate level in vanilla.

Character equipment is now the main source of character stat growth, and is relatively expensive, so gold sort of acts as the new XP.  Also tried to add a bit of variety to how each character plays (or at least the end-game characters): the men's equipment can be balanced between offense and defense, Rosa can be oriented towards casting or archery, and Rydia can be oriented towards Black magic or Summons.

Other changes have been made as well (i.e. the damage equation was completely rewritten).  Below is a (mostly) full list, along with a list of things that need to be done before this mod is considered finished.

The mod is a bit harder than vanilla, but not substantially so.

Big thanks to Crow, Chillyfeez, and Aexoden for their help with figuring out how to hack SNES assembly, (and again to Crow for his Equip Menu mod, Grimoire LD and Chillyfeez for the Critical Hit Fix mod, 


  Changes:

Leveling system removed, character and monster stats scaled.

Weapons and Equipment completely overhauled.
The hand/gauntlet armor slot is now always for rings, which act more like Relics from FF6
Signicant boost to the number of 2-handed weapons.  Spears are now 2-handed, and 2-handed swords have a different icon
Boomerangs, whips, axes, and harps have been removed, and a lot of other equipment has been removed too

Magic has been rebalanced.  Low rank spells are now more mp-efficient than their higher rank counterparts, and the cast times from most spells have been removed

Certain skills like Sing and Steal have been removed.  Dart and Kick are out right now but will be added back in once I can figure out how to make them use the physical damage equation

Sell-back prices are now 90% of buy price, except for consumables, so you're not penalized too much for buying expensive armor and selling it back later

Vitality has been changed so that it's now as important to damage mitigation as strength is to damage (i.e. double your vitality, and you halve your physical damage)

Evade is now all-or-nothing, like in later FF games: you either completely evade an attack or not.  Evade checks also happen before the Image status is consumed, making evade much more valuable (especially for Edge)

Defense has a much more noticeable effect than in vanilla.  Now even the modest defense boost of a shield can make a substantial impact on damage mitigation.

The physical damage equation has been overhauled, so that damage is a bit less random and the damage mitigation of armor is more consistent.  Here's a detailed list of changes:
 - 75% of Armor is subtracted from Attack power before the 1.0-1.5 random multiplier is applied (the remaining 25% is applied afterwards, so there's still some randomness to mitigation)
 - The difference between your character's armor and average enemy Attack Power has been tightened, and enemy Attack Multipliers are higher, so your armor's defense has become a lot more important
 - The Attack Power multipliers from Berserk and Jump are applied after the 75% armor mitigation happens, so they aren't as effective against armored foes as in vanilla.  The Critical Hit damage bonus IS still applied pre-defense though
 - Elemental and Racial modifiers are still applied to attack power before defense is subtracted, so their attack bonus is still an effective way to circumvent enemy defense.  However, Racial weakness now only provide a 2x boost, Strong Elemental weakness only 3x, and weaknesses now stack via addition instead of multiplication (i.e ele weakness combined with racial weakness only yeilds 3x AP instead of 4x ap, and for strong-ele & racial it's 4x instead of 8x AP)
 - Defense modifiers (i.e. back row and Defend) now halve final damage, instead of doubling defense
 - Monster attacks aren't penalized if from the back row
 - Curse has been tweaked in that it now halves final attack damage instead of attack power (otherwise it would make enemies do virtually no damage).  It still halves defense though, and with the changes to how defense works this makes it much more dangerous than in vanilla
 - Character attack multiplier is now just STR/2
 - Drain weapon effects have been removed (as have drain weapons)


Jump now only does 1.5x damage from the back row, instead of 2x

Most game dialogue has been untouched.  The exception to this are the NPCs in Inns, who will give mod-specific hints

Most potions are self-cast only now (since you have to drink them).  Many potions have been removed too; elixers and other things that allow you to overpower a boss by spending money/resources are gone

The cost of fleeing from battles is now always half of what you'd get from that battle, and costs of Exit and Smoke are way up, so casting them is not an easy work-around

New claws so that Edge can continue filling Yang's roll as an elemental/racial weakness exploiting fighter (like FFVs Mystic Knight) through end-game (this is something he does well in vanilla btw up until the lunar core- pair a katana with a claw and he's a fucking beast!)

Summons are now based on Will instead of Wisdom.  When equipping Rydia, you'll usually be choosing from equipment that either boosts wisdom & will, or equipment that provides a more substantial wisdom boost (making her black magic more powerful at the expense of her summons).  

Any item that has no effect will have a "no effect" message appear, so it's more explicit when items do or don't have a use effect.

Character elemental defense (i.e. Fire Shield) no longer makes you weak against the opposing element

Blink spell now only adds 1 image, but is cheap to cast.  Image still adds two images, and a new "Blnk2" spell adds two images for a higher mp cost

Poison now does 50 damage per step, instead of 1.  Damage tiles now do 200 damage instead of 50

Tents restore full hp/mp now

Slow and Haste have been removed (though I'd like to add them back in, as statuses instead of their current battle-permanent speed altering effects)

The aerial weakness is now racial instead of elemental.

...and other stuff that I've forgot to list.



  Still needs to be done before 1.0 released:


Enemies in Land of Summons and Sylph Cave to be scaled and tweaked so that they're harder, so that Summons, Sylpth, and Lunar Core feel like the final three dungeons.  Boss enemies to be added to all three, dropping weapons and skills that are effective on the weaknesses of other bosses, so the end-feels a bit like tackling the robot masters in a classic Mega Man

Still want to add a lot more weapons and rings, and have some enemies drop rare items (though not with obscenely rare drop rates; like a 1/16 chance at worst)

Finalize bosses and enemies throughout the earlier game (a lot of them still need work)

Have characters automatically unequipped when they leave

Remove item duplication glitch



  Might add eventually (but probably after version 1.0 is released):


Want to overhaul the ATB system (then add Slow and Haste back in as status effects).  Give Edge self-cast haste spell ("Quick")

Add in agility boosting equipment after ATB overhaul.  Maybe have agility effect critical hit rate too (or some add some new stat that boosts crit)

Have charmed characters only attack, and not cast random spells

Have berserked characters only attack front row enemies to avoid back-row penalty

Overhaul Cover so that Cecil takes damage from the covered character's row (instead of his, so you can't cover front-row guys from the back and take little damage).  Also add a 1/8th chance for Cover not to trigger against weakened allies, so Cecil doesn't render low-health characters completely immune to physical damage

Have self-cast spells bring up an unmoveable hand like in FF6, instead of just skipping the selection phase of the cast menu sequence

Alter menu so irrelevant stats like Level and Defense Multiplier aren't shown

Have attacks undo sleep status, like with charm

Change debuff-on-hit algorithm to take something other than level into account (maybe magic defense, maybe vitality, or maybe replace defense multiplier with some new stat)

Add a Stona spell, and a Stona potion/salve

Have Dart and Kick use physical damage equation and not ignore defense.  Give ninja stars Aerial attribute (so now fill the hole left by boomerang removal).  Have Kick inflict 1/2 the damage of Fight (without elemental/racial bonuses) to all enemies.

Have Odin inflict physical damage instead of inflicting Fatal.  Have his damage be based on Rydia's strength (maybe (str+will)/2).

Have Asura have a 1/2 chance to cure all, and a 1/2 chance to cast Blink on all characters.  Maybe also a weaker cure that removes status ailments?

Maybe have Blink add a second image if the character already has one.




Big thanks to:

Aexoden, chillifeez, Crow! for answering my nooby questions and helping me learn the basics of general romhacking, how to hack FFIV specifically, and helping me figure out where the physical damage code is and how it works, where the sell-back price code is, and how to do the GP flee code

Thanks again to Crow! for making the TLS Equipment Screen Mod, Grimoire LD and chillifeez for the Critical Hit Fix patch, and Dragoon ZERO for the Long Range Fix patch

Bond617 for hosting his site rb.thundaga.com after slick productions went down, along with the docs he wrote

Pinkpuff for making FF4kster open source, which was a massive help!

Thanks by extension to everyone who they thanked and made their work possible (especially whoever it was that wrote the Tower of Babil docs)

BTB and everyone involved in making FF6 Brave New World, which inspired me to get into romhacking


