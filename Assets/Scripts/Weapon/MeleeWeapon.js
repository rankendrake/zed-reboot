#pragma strict

class MeleeWeapon extends Weapon {
	var reach : int;
	var power : int;
	
	function MeleeWeapon(reach : int, 
			power : int,
			id : String) {
			
		this.reach = reach;
		this.power = power;
		this.id = id;
		
	}
	
	// @Override
	function strike() {
		//Debug.Log("attack with melee weapon. power = " + power);
	}
	
	// @Override
	function getClipSize() : int {
		return 0; // 0 is melee
	}
}