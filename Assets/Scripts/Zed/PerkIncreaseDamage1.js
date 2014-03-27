#pragma strict

var zed : GameObject;
var factor : float = 2;
var skillPointCost : int = 1;
var weaponArsenal : WeaponArsenal;

function Start () {
weaponArsenal = GameObject.Find("environment").GetComponent("Weapon Arsenal") as WeaponArsenal;
setPerk();
}

function setPerk () {

// If zed already has this perk, don't do anything and return a false to
// indicate that zed already has the perk. If not, add the perk and set
// its effect on zed.

if(gameObject == GameObject.Find("zed")) {
	var zedWeapons : Weapon[] = gameObject.GetComponent(ZedResources).weapons;
	for (var weapon in zedWeapons) {
		weapon.increaseFirePower(factor);
		}
	}
}