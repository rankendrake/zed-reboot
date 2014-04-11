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
		//zed = GameObject.Find("zed").transform as Transform;
		zed = GameObject.FindGameObjectsWithTag("zed")[0];		
		
		var zedsChildren = zed.GetComponentsInChildren(Transform);
		for (var child : Transform in zedsChildren) {
   			if (child.gameObject.CompareTag("sword")) {
				weaponAnimator = child.gameObject.GetComponent(Animator);
			}
		}		
	}

	// @Override
	function strike() : boolean {
		//Debug.Log("attack with melee weapon. power = " + power);
		weaponAnimator.Play("Cleave");
		return true;
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