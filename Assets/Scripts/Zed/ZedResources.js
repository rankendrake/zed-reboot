#pragma strict
import System.Collections.Generic;

private var experience : int;
private var health : float;
private var level : int;
private var skillPoints : int = 0;

private var animatorDead : boolean;
private var promptOpened : boolean = false;

var weapons : Weapon[];
var currentWeaponIndex : int;  // index in weapons-array

var weaponArsenal : WeaponArsenal;
var perkStock : PerkStock;

var zedProperties : ZedProperties;
var activePerks : PerkList;

private var currentScatterAngle : float;
private var lastShotScatterAngle : float;

var gruntSound : AudioClip;
var deathSound : AudioClip;

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
	if (!isAlive()) {	// Zed is dying
		if (animatorDead && !promptOpened && gameObject.GetComponent(Animator).GetCurrentAnimatorStateInfo(0).IsName("Base Layer.ZedDead")) {
			GameObject.Find("camera").GetComponent(NamePrompt).openPrompt();
			promptOpened = true;
			Time.timeScale = 0;
		} else {
			gameObject.GetComponent(Animator).SetBool("isDead", true);
			animatorDead = true;
			trimUnnecessaryComponents();
		}
	} else if (Time.time > weapons[currentWeaponIndex].getReloadEndTime()) {
		if (Input.GetKeyDown("1")) {
			currentWeaponIndex = 0;
		} else if (Input.GetKeyDown("2")) {
			currentWeaponIndex = 1;
		} else if (Input.GetKeyDown("3")) {
			currentWeaponIndex = 2;
		} else if (Input.GetKeyDown("4")) {
			currentWeaponIndex = 3;
			reduceHealth(50);
		}
	}
}

function reduceHealth(reductionAmount : float) {
	health -= reductionAmount;			
	if (health <= 0) {
		health = 0;
		AudioSource.PlayClipAtPoint(deathSound,transform.position);
	}
	else
		AudioSource.PlayClipAtPoint(gruntSound,transform.position);
}

function isAlive() : boolean {
	return (health > 0);
}

function addPerk(perk : Perk) {
	activePerks.addPerk(perk);
}

function trimUnnecessaryComponents() {
	var components = gameObject.GetComponents(typeof(Component));
    for (var component : Component in components) {
            if ((component instanceof ZedMovement) ||
            	(component instanceof ZedStrike)) {
                 Destroy(component);
            }
    }
}

/*
 *	EXPERIENCE & LEVEL
 */ 
function handleZombieKilled(zombieDifficultyLevel : int) {
	gainExperience(zombieDifficultyLevel);
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

function getCurrentScatterAngle() : float {
	if (weapons[currentWeaponIndex] instanceof ProjectileWeapon) {
		var weapon : ProjectileWeapon = weapons[currentWeaponIndex] as ProjectileWeapon;
		
		var scatterAngle : float = weapon.getCurrentScatterAngle();
		
		// modification by perks
		var activeWeaponPerks : List.<WeaponPerk> = activePerks.getWeaponPerks();
		for (var perk : WeaponPerk in activeWeaponPerks) {
			scatterAngle = scatterAngle * perk.getScatterMultiplier();
		}
		return scatterAngle;
	} else {
		return 0;
	}
}

//function applyScatter(maxAngle : float, saturationFactor : float) {
//	// to do: perks
//	lastShotScatterAngle = getCurrentScatterAngle();	
//	lastShotScatterAngle += saturationFactor*(maxAngle - lastShotScatterAngle);
//	currentScatterAngle = lastShotScatterAngle;
//}