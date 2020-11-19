As organisms interact with the world, they frequently need to know the contents of a particular physical place, in order to interact with it.

Naively, using the ECS paradigm, they could query for all entities of the particular type (i.e. which have the appropriate component), then check to see if they are in the right spot by examining their Position component. This is very slow, because the search process is always linear time, repeated for each entity that needs to find something else.

We could attempt to fix this by creating a Contents resource, which is periodically updated to record exactly which type of object is where. This is better, especially if we can only record changes to it, but still suffers from maintainability issues. What if we want other information about that entity for a new feature? Do we keep making variants of this eternally?

Instead, what we really want is a way to perform quickly (approximately constant time) lookups of any entities that might exist at certain relevant positions. Effectively, use Position as an index. We want this to be a multimap, not just a hashmap, so we can store multiple entities at the same position.

This leads us to a proposal.

1. Create an EntityMap resource.
2. Collect a list of which entities have changed position in the last time step.
3. Go through the complete set of values once, removing any entities which have changed position.
4. Insert each of the entities that have changed position into this hashmap.
5. When we need to know about the status of a particular area, grab all of the entities found at the appropriate key(s) of the multimap.
6. Filter these by which components they have, in order to only extract the relevant ones, then use their information in your system.