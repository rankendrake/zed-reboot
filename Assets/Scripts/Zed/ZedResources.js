#pragma strict

private var experience : int;
var health : float;
private var level : int;

var weapons : Weapon[];
var currentWeaponIndex : int;  // index in weapons-array

var weaponArsenal : WeaponArsenal;
var timeOfLastDamage : float;
var damageSoundTime : float;

var damageSound : AudioSource;
/*
	var weaponScript : Weapon;
	weaponScript = currentWeapon.GetComponent(Weapon);
	
	weaponScript.rateOfFire
	*/
	
/*
 *	HEALTH
 */

function Start() {
	// initializes weapons-array
	weapons = weaponArsenal.initializeArsenal();
	currentWeaponIndex = 0;
	health = 100;
	timeOfLastDamage = Time.time;
	damageSoundTime = 0.6;
}

function Update() {
	if (Time.time > weapons[currentWeaponIndex].getReloadEndTime()) {
		if (Input.GetKeyDown("1")) {
			currentWeaponIndex = 0;
		} else if (Input.GetKeyDown("2")) {
			currentWeaponIndex = 1;
		} else if (Input.GetKeyDown("3")) {
			currentWeaponIndex = 2;
		} else if (Input.GetKeyDown("4")) {
			currentWeaponIndex = 3;
		}
	}
}

function reduceHealth(reductionAmount : float) {
	health -= reductionAmount;			
	if (health < 0) {
		health = 0;
	}
	if(Time.time > timeOfLastDamage + damageSoundTime) {
		damageSound.Play();
		timeOfLastDamage = Time.time;
	}
}

/*
 *	EXPERIENCE & LEVEL
 */
 
function handleZombieKilled(zombieDifficultyLevel : int) {
	if (zombieDifficultyLevel == 1) {
		gainExperience(1);
	}
}

function gainExperience(amount : int) {
	experience += amount;
	updateLevel();
}

function updateLevel() {
	level = Mathf.FloorToInt(Mathf.Log(experience));
}

function getLevel() {
	return level;
}

function getExperience() {
	return experience;
}

function getHealth() {
	return health;
}