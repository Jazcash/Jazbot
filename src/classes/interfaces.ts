export enum Attribute{
	AGILITY = "Agility",
	CARPENTRY = "Carpentry",
	CHARISMA = "Charisma",
	COOKING = "Cooking",
	DEXTERITY = "Dexterity",
	EXPLORATION = "Exploration",
	FARMING = "Farming",
	INTELLIGENCE = "Intelligence",
	LORE = "Lore",
	MASONRY = "Masonry",
	MELEE = "Melee",
	PERCEPTION = "Perception",
	PSYCHE = "Psyche",
	SEWING = "Sewing",
	SMITHING = "Smithing",
	STEALTH = "Stealth",
	STRENGTH = "Strength",
	SURVIVAL = "Survival",
	UNARMED = "Unarmed",
	WILL = "Will"
}

export interface Equipment{
	name: string;
	slot: string;
	attribs: Attribute[];
	min: number;
	max: number;
	avg: number;
}

export interface Gilding{
	name: string;
	attribs: Attribute[];
	gilds: { [key in Attribute]: number; };
	min: number;
	max: number;
	avg: number;
}
