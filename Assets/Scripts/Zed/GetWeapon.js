#pragma strict

var assaultRiflePrefab : GameObject;
var shotgunPrefab : GameObject;
var laserPrefab : GameObject;

private var gun : GameObject;

function Update () {
	if (Input.GetKeyDown ("k")) {
		removePreviousWeapons();
		gun = Instantiate(assaultRiflePrefab, transform.position, transform.rotation);	
		gun.transform.parent = transform;
	}
	if (Input.GetKeyDown ("p")) {
		removePreviousWeapons();
		gun = Instantiate(shotgunPrefab, transform.position, transform.rotation);	
		gun.transform.parent = transform;
	}
	if (Input.GetKeyDown ("l")) {
		toggleLaserSight();
	}
}

function removePreviousWeapons() {
	if (transform.childCount > 0) {
		for (var children : Object in transform) {
			var child : Transform = children as Transform;
		    Destroy(child.gameObject);
		}
	}
}

function toggleLaserSight() {
	var laser : GameObject = GameObject.Find(gun.name + "/LaserSight");
	
	if (laser == null) {
		laser = Instantiate(laserPrefab, transform.position, transform.rotation);
		laser.transform.parent = gun.transform;
	} else {
		Destroy(laser);
	}
}

function getId() : String {
	if (gun == null) {
		return "";
	} else {
		var name : String = gun.name;
		if (name.Equals("AssaultRifle(Clone)")) {
			return "assault rifle";
		} else if (name.Equals("Shotgun(Clone)")) {
			return "shotgun";
		} else {
			Debug.LogError("Gun name unknown in getGunId() @ GetWeapon.js");
			return "";
		}
	}
}