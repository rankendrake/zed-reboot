#pragma strict

var zedResources : ZedResources;

var timeOfLastShot : float;
private var totalBulletsSpawned : int;
private var bulletsHit : int;

function Start() {
	zedResources = GameObject.Find("zed").GetComponent(ZedResources);
	totalBulletsSpawned = 0;
	bulletsHit = 0;
}

function Update() {
	
	var currentWeapon : Weapon = zedResources.weapons[zedResources.currentWeaponIndex];

	if(Input.GetKeyDown("r") && currentWeapon.getReloadEndTime() < Time.time) {
		currentWeapon.manualReload();
	}
	// instantiate when trigger pressed and rate of fire
	// according to weapon in zedResources
	else if (Input.GetMouseButton(0) && Time.timeScale != 0) {
		var successfulStrike : boolean = currentWeapon.strike();
		
		if (currentWeapon instanceof ProjectileWeapon) {
			var currentProjectileWeapon : ProjectileWeapon = currentWeapon as ProjectileWeapon;
			if (successfulStrike) {
				totalBulletsSpawned += currentProjectileWeapon.bulletsSpawned;
			}
		}
		
	} 	else if (Input.GetMouseButton(1) && Time.timeScale != 0) {
		currentWeapon.secondaryStrike();
	}
}

function incrementBulletsHit() {
	bulletsHit++;
}

function getPercentageHit() : float {
	if (totalBulletsSpawned == 0) {
		return 0;
	}
	return ((1.0*bulletsHit)/totalBulletsSpawned)*100;
}
