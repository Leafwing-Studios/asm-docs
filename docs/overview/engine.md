# Big Picture Questions about Engine Design and Architecture

# What paradigm do we want to use?

Entity-Component-System architecture.

# What language and frameworks do we want to use and why?

Rust. Tentatively, using Bevy.

We cannot get sensible performance from Unreal / Unity, and most of their features are wasted.

This leaves us with using a partially bespoke engine, in either C++ or Rust. Rust will be more maintainable going forward due to our relative inexperience, and a stronger community.

# What is our strategy for graphics?

2D isometric? 3D pre-rendered to 2D? 3D but in a 2D game-space?

# What are our largest performance bottlenecks?

- unit behavior?
- resource tracking?
- environmental actions?'

# What platforms do we want to target?

Desktop only. Windows, Mac and Linux.

# What our are target specs?

TODO: add table based on market research.

# Constraints

- small dev team
- limited budget
- weak visual art skills
- weak music and sound design skills

# Key Uncertainties

- what specs are we targeting?
- how do we want to handle graphics?
- should we be using Bevy? Amethyst? Something else entirely?
- what are our biggest performance bottlenecks to be mindful of?
