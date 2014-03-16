#pragma strict

class Weapon extends UnityEngine.Object {
	var id : String;

	function strike() {
		Debug.Log("General weapon strike");
	}
	
	function getClipSize() : int {
		return 0; // null is melee
	}
	
	function getId() : String {
		return id;
	}
	
	function getJustReloaded() : boolean {
		return false;
	}
	
	function falsifyJustReloaded() {}
	
	function getBullets() : int {
		return 0;
	}
	
	function getBulletsInClip() : int {
		return 0;
	}
	
	function getReloadEndTime() : float {
		return 0;
	}
}