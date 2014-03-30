#pragma strict

var zedResources : ZedResources;

var timeOfLastShot : float;

function Start() {
	zedResources = GameObject.Find("zed").GetComponent(ZedResources);
}

function Update() {
	
	var currentWeapon : Weapon = zedResources.weapons[zedResources.currentWeaponIndex];

	if(Input.GetKeyDown("r") && currentWeapon.getReloadEndTime() < Time.time) {
		currentWeapon.manualReload();
	}
	// instantiate when trigger pressed and rate of fire
	// according to weapon in zedResources
	else if (Input.GetMouseButton(0)) {
		currentWeapon.strike();
	}
	
	else if (Input.GetMouseButton(1)) {
		currentWeapon.secondaryStrike();
	}
	
//	if (Input.GetMouseButton(0) && 
//			((Time.time - timeOfLastShot)*weapon.getRateOfFire()) > 1 && 
//			(clip.getReloadStartTime() + reloadTime < Time.time)) {
//		if (clip.wasteBullet()) {
//			fire();
//			sounds.fireSound();
//		    timeOfLastShot = Time.time;
//		}
//	}	
}
