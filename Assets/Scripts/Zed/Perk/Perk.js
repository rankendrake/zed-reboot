#pragma strict

/*
 * Framework for perks 
 * all perks extend the Perk class
 * perks with same behavior but different effect magnitude 
 * do not require separate classes 
 * The actual implementation of each type of perk
 * is always located in the respective code location where the
 * effect takes place
 * 
 */
 
class Perk {
	private var name : String;
	private var skillPointCost : int;
	private var perkIcon : Texture2D;
	
	function Perk(name : String,
			skillPointCost : int,
			perkIcon : Texture2D){
			
		this.name = name;
		this.skillPointCost = skillPointCost;
		this.perkIcon = perkIcon;	
	}
		
	function getName() : String {
		return name;
	}	
		
	function setSkillPointCost(skillPointCost : int){
		this.skillPointCost = skillPointCost;
	}
	
	function getSkillPointCost() : int{
		return skillPointCost;
	}
	
	function setPerkIcon(perkIcon : Texture2D) {
		this.perkIcon = perkIcon;
	}
	
	function getPerkIcon() : Texture2D {
		return perkIcon;
	}
}
