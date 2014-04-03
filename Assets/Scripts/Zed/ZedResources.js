#pragma strict
import System.Collections.Generic;

private var experience : int;
private var health : float;
private var level : int;
private var skillPoints : int = 0;


var weapons : Weapon[];
var currentWeaponIndex : int;  // index in weapons-array

var weaponArsenal : WeaponArsenal;
var perkStock : PerkStock;

var activePerks : PerkList;
/*
 *	HEALTH
 */

function Start() {
	// initializes weapons-array
	weapons = weaponArsenal.initializeArsenal();
	currentWeaponIndex = 0;
	health = 100;
	
	activePerks = new PerkList();
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
}

function addPerk(perk : Perk) {
	activePerks.addPerk(perk);
}

/*
 *	EXPERIENCE & LEVEL
 */ 
function handleZombieKilled(zombieDifficultyLevel : int) {
	if (zombieDifficultyLevel == 1) {
		gainExperience(1);	
	} else {
		gainExperience(zombieDifficultyLevel);
	}
}

function gainExperience(amount : int) {
	experience += amount;
	updateLevel();
}

function changeSkillPoints(difference : int) {
	skillPoints += difference;
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

function getSkillPoints() {
	return skillPoints;
}