#pragma strict
import System.Collections.Generic;


class PerkList {
	private var list : List.<Perk>;
	private var movementPerkList : List.<MovementPerk>;
	private var weaponPerkList : List.<WeaponPerk>;
	
	private var lastAdded : Perk;
	
	function PerkList() {
		list = new List.<Perk>();
		movementPerkList = new List.<MovementPerk>();
		weaponPerkList = new List.<WeaponPerk>();
	}
	
	function addPerk(perk : Perk) {
		list.Add(perk);
		if (perk instanceof MovementPerk) {
			movementPerkList.Add(perk as MovementPerk);
		} else if (perk instanceof WeaponPerk) {
			weaponPerkList.Add(perk as WeaponPerk);
		}
		lastAdded = perk;
	}
	
	function getLastAdded() : Perk {
		return lastAdded;
	}
	
	function getPerks() : List.<Perk> {
		return list;	
	}
	
	function getMovementPerks() : List.<MovementPerk> {
		return movementPerkList;	
	}
	
	function getWeaponPerks() : List.<WeaponPerk> {
		return weaponPerkList;
	}
}