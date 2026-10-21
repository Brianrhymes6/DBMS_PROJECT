# Database schema

Unique identifier constraints cover User, Pet, PetCategory, Shelter, Adoption, Volunteer, RescueEvent, and Donation. Pet status and shelter location are indexed. Relationships are directed: User–APPLIED_FOR→Adoption–FOR_PET→Pet–HOUSED_AT→Shelter; Pet–BELONGS_TO→PetCategory; Volunteer–PARTICIPATED_IN→RescueEvent–RESCUED→Pet; Donation–DONATED_BY→User; Donation–DONATED_TO→Shelter.

Adoption and Donation are first-class nodes because each has its own attributes and connects multiple entities. This graph complements the normalized relational design: stable IDs preserve entity identity, while explicit relationships make variable-length path exploration direct.

The sample dataset contains fictional, illustrative records and is not sourced from real people.
