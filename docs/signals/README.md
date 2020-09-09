# What is the core algorithm?

- pretty much everything produces signals
- signals are propagated over tiles
  - linear diffusion
  - clipping to zero for performance
- units read signals and follow gradients

# How is this presented to the player?

- visually, using heat maps
- visually, by showing worker intents
- signals are hierarchically nested for complexity management

# Constraints

- high granularity
- continuous to avoid ties
- sensitivity can be tuned
- signal quantity when left alone are conserved or decay

# Constraints

# Key Uncertainties
