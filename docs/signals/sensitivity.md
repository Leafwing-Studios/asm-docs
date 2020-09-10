Each strain of units has a defined **sensitivity** to every signal.

Sensitivities always sum to one, unless they are negative.

Changing sensitivities should be fast and cheap, to allow for easy debugging.

# Constraints

- sensitivity needs to be easily tuned to allow for debugging problematic behavior
- constantly changing sensitivities should not be a viable strategy for micro

# Key Uncertainties

- how do you change sensitivities from a UI perspective?
- what does it cost, if anything, to change sensitivities?
