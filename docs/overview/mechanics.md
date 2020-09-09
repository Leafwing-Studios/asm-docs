# Big Picture Questions about Mechanics

## What are the most basic building blocks of the game's world?
- **Tiles** are the basic units of space, which contain resources 
- **Resources** are the basic currencies of the world, which must be refined, moved and converted.
- **Organisms** are living creatures.
  - **Units** are animals which move, build, carry resources, eat, die and attack.
  - **Structures** are the plants, fungi and bacteria that occupy tiles, transforming and transmitting resources while automatically spreading.
- **Signals** are emitted by structures and resources, travelling between tiles in a local fashion. Units use signals to navigate and determine priorities.

## How can the player interact with the world?
- **Pheromones:** Rapidly produce signals or grant buffs in a specific location where you have vision. These are expensive, limited and powerful, to be used for quickly solving one-time frustrations.
- **Zoning:** Designate tiles to contain specific structures (or none at all), manually or with a blueprint system. You can control the strength of the zoning to change prioritization.
- **Breeding:** By spending resources (and time), you can create new **strains** or improve existing ones.

## What is the core gameplay loop?
1. Explore to find a useful new place
2. Connect that useful new place to your existing base
3. Automate sustainable resource extraction in that useful new place
4. Spend resources to breed new forms or improve existing ones to improve resource extraction
  
## What are this game's unique gameplay propositions?
- you must design for robustness and graceful failure
- you must ensure that resource use is sustainable by adapting to the local environment
- you must gently coax your orgamisms to do what you need through the use of signals, rather than relying on perfectly reliable robots

## What does the game sacrifice and why?
- fine-grained control, to force players to design for robustness and scalable attention
- fair combat, to encourage dominance by resource superiority
- easily balanced units and structures that are defined a priori, to encourage customization and sell the theme
- fully 3D gameplay environments, for ease of visulization and interactions (as well as performance reasons)
- shiny realistic graphics, for performance and budget reasons
- tightly balanced highly reliable optimization puzzles, to encourage building for resilience
- a player avatar in the game, to sell the theme and to prevent issues with boring travel time
- quick and easy mastery, in exchange for a long, steady learning curve
- a traditional story, in order to fit the theme and focus on environmental storytelling

## What raw skills need to be mastered?
- designing for robustness in a world with strong temporal and enviromental variability
- understanding uses and pathways for resources
- debugging signalling issues
- gracefully handling resources excesses
- defending your resource rich base from pillagers

## What core tensions need to be balanced?
- building new bases to exploit new resources | optimizing existing bases
- scaling up existing production | researching new options
- spending pheromones to fix problems | automating a permanent solution
- localizing production to reduce transport costs | distributing resources to allow for specialization and simplicity
- specialized strains | generalist strains
- dense, efficient factories | open factories that are less congested

## How does the game change as you progress?
- you develop more strains, and domesticate new species
- your strains are more powerful
- you extract more resources
- you extract and create a wider diversity of resources
- your resource processing chains grow longer and more complex
- you must expand onto marginal land, or manage larger transportation networks

# Constraints

# Key uncertainties
- is signal-driven control usable and fun?
- how do we encourage small outpost-style bases rather than a megabase?
- how do we make sure the game feels responsive?
- how can we balance genetic improvements to a single strain versus splitting them?
- how much control and precision do you have over your own colony?
- which parts of the game do you have fine control over?