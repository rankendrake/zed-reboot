#pragma strict

var zedResources : ZedResources;
private var animator : Animator;

var timeOfLastShot : float;
private var totalBulletsSpawned : int;
private var bulletsHit : int;

private final var SWORD : int = EnvironmentAttributes.SWORD_INDEX;
private final var SHOTGUN : int = EnvironmentAttributes.SHOTGUN_INDEX;
private final var ASSAULT_RIFLE : int = EnvironmentAttributes.ASSAULT_RIFLE_INDEX;
private final var PISTOL : int = EnvironmentAttributes.PISTOL_INDEX;

function Awake() {
	totalBulletsSpawned = 0;
	bulletsHit = 0;	
}

function Start() {	
	animator = zedResources.animator;
}

function Update() {
	
	var currentWeapon : Weapon = zedResources.weapons[zedResources.currentWeaponIndex];

	if(Input.GetKeyDown("r") && currentWeapon.getReloadEndTime() < Time.time) {
		currentWeapon.manualReload();
	}
	// instantiate when trigger pressed and rate of fire
	// according to weapon in zedResources
	else if (Input.GetMouseButton(0) && Time.timeScale != 0 ) {
		var animatorStateInfo : AnimatorStateInfo = animator.GetCurrentAnimatorStateInfo(1);
		if (animatorReady(animatorStateInfo, zedResources.currentWeaponIndex)) {
			var successfulStrike : boolean = currentWeapon.strike();
			
			if (currentWeapon instanceof ProjectileWeapon) {
				var currentProjectileWeapon : ProjectileWeapon = currentWeapon as ProjectileWeapon;
				if (successfulStrike) {
					if (zedResources.currentWeaponIndex == SHOTGUN) {
						animator.SetBool("shotgun", true);
					} else {
						animator.SetBool("shotgun", false);
					}
					animator.SetTrigger("projectileStrike");
					totalBulletsSpawned += currentProjectileWeapon.bulletsSpawned;				
				}
			} else if (currentWeapon instanceof MeleeWeapon) {
				animator.SetBool("meleeStrike", true);
			}		
		}
	} 	else if (Input.GetMouseButton(1) && Time.timeScale != 0) {
		currentWeapon.secondaryStrike();
	} else {
		animator.SetBool("meleeStrike", false);
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

function animatorReady(stateInfo : AnimatorStateInfo, currentWeaponIndex : int) : boolean {
	switch (currentWeaponIndex) {
	case SWORD:
		return stateInfo.IsName("SwordRelaxed");
		break;
	case SHOTGUN:
		return stateInfo.IsName("RifleRelaxed");
		break;
	case ASSAULT_RIFLE:
		return stateInfo.IsName("RifleRelaxed");
		break;
	case PISTOL:
		return stateInfo.IsName("PistolRelaxed");
		break;
	}
}
