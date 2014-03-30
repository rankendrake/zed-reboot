#pragma strict

class MeleeWeapon extends Weapon {
	private var zed : GameObject;
	private var weaponAnimator : Animator;
	var reach : int;
	var power : int;
	
	function MeleeWeapon(reach : int, 
			power : int,
			id : String) {
			
		this.reach = reach;
		this.power = power;
		this.id = id;
		zed = GameObject.Find("zed");
		weaponAnimator = zed.transform.GetChild(0).GetComponent(Animator);
	}
	
	// @Override
	function strike() {
		//Debug.Log("attack with melee weapon. power = " + power);
		weaponAnimator.Play("Cleave");
	}
	
	// @Override
	function secondaryStrike() {
		//Debug.Log("attack with melee weapon. power = " + power);
		weaponAnimator.Play("Stab");
	}
	
	// @Override
	function getClipSize() : int {
		return 0; // 0 is melee
	}
}