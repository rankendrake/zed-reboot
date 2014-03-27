#pragma strict

class Weapon extends UnityEngine.Object {
	var id : String;

	function increaseFirePower(factor : float) {
	}

	function strike() {
		Debug.Log("General weapon strike");
	}
	
	function addClips(clips : int) {
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
	
	function manualReload() {}
	
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