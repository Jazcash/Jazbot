import { Attribute, Gilding, Equipment } from "./interfaces";

export default class GildManager{
	equipments:Equipment[] = [];

	constructor(public gildings:Gilding[], equipments?:Equipment[]){
		if (equipments) this.equipments = equipments;
	}

	getEquipmentsBySlot(slot:string) : Equipment[]{
		return this.equipments.filter(item => item.slot.includes(slot));
	}

	getGildingByName(name:string) : Gilding | undefined{
		return this.gildings.find(item => item.name === name);
	}

	getEquipmentByName(name:string) : Equipment | undefined{
		return this.equipments.find(item => item.name === name);
	}

	getGildingsByBonus(bonusAttrib:Attribute) : Gilding[]{
		return this.gildings.filter(gilding => gilding.gilds[bonusAttrib]);
	}

	getGildingsByAttrib(gildings:Gilding[], attrib:Attribute, tailorCredo:boolean) : Gilding[]{
		let finalGildings = gildings.filter(item => item.attribs.includes(attrib));

		if (tailorCredo){
			let bestNonMatchingGilding = gildings.find(item => !item.attribs.includes(attrib));
			if (bestNonMatchingGilding) finalGildings.unshift(bestNonMatchingGilding);
		}

		return finalGildings;
	}

	getBestEquipment(slot: string, attrib:Attribute) : Equipment | undefined{
		let candidates = this.equipments.filter(item => item.slot.includes(slot));

		if (candidates.length === 0) return;

		let tempCandidates = candidates.filter(item => item.attribs.includes(attrib));

		if (tempCandidates.length !== 0) candidates = tempCandidates;

		let bestCandidate = candidates.reduce(function(prev, current) {
			return (prev.avg > current.avg) ? prev : current;
		});

		return bestCandidate;
	}

	getCommonAttribute(gildings:Gilding[], bonusAttrib:Attribute) : Attribute{
		let attribScores:any = {};

		for (let gilding of gildings){
			for (let gildingAttrib of gilding.attribs){
				let gildScore = gilding.gilds[bonusAttrib];
				if (attribScores[gildingAttrib] !== undefined){
					(attribScores[gildingAttrib] as any) += gildScore;
				} else {
					attribScores[gildingAttrib] = gildScore;
				}
			}
		}

		let bestAttrib = Object.keys(attribScores).reduce((a, b) => attribScores[a] > attribScores[b] ? a : b) as Attribute;

		return bestAttrib;
	}

	gildItemChance(equipment:Equipment, gilding:Gilding, attribs:{ [ key in Attribute]: number}) : number {
		let minChance = equipment.min * gilding.min;
		let maxChance = equipment.max * gilding.max;
		let maxCap = 400;

		let matchingAttributes = equipment.attribs.filter(x => gilding.attribs.includes(x));

		if (matchingAttributes.length === 0) return minChance;

		let bestAttrib = matchingAttributes.reduce((prev, current) => attribs[prev] > attribs[current] ? prev : current);
		let gildAttribValue = Math.min(attribs[bestAttrib], maxCap);

		let chanceRange = maxChance - minChance;
		let chance = minChance + (Math.sqrt(gildAttribValue / 400) * chanceRange);

		return chance;
	}
}
