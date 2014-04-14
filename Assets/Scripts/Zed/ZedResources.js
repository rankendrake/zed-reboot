#pragma strict
import System.Collections.Generic;

private var experience : int;
private var health : float;
private var level : int;
private var skillPoints : int = 0;

private var animatorDead : boolean;
private var promptOpened : boolean = false;

var animator : Animator;

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
	if (Input.GetKeyDown("x")){
		reduceHealth(50);
	}
	
	if (!isAlive()) {	// Zed is dying
		if (animatorDead && !promptOpened && animator.GetCurrentAnimatorStateInfo(0).IsName("Base Layer.ZedDead")) {
			Camera.main.GetComponent(NamePrompt).openPrompt();
			promptOpened = true;
			Time.timeScale = 0;
		} else {
			animator.SetBool("isDead", true);
			animatorDead = true;
			trimUnnecessaryComponents();
		}
	} else if (Time.time > weapons[currentWeaponIndex].getReloadEndTime()) {
		if (Input.GetKeyDown("1")) {
			currentWeaponIndex = 0;
			animator.SetBool("carrySword", true);
			animator.SetBool("carryRifle", false);
			animator.SetBool("carryPistol", false);
			//AudioSource.PlayClipAtPoint(weapons[currentWeaponIndex].getReloadSound(),transform.position);
		} else if (Input.GetKeyDown("2")) {
			if (currentWeaponIndex == 2) {
				animator.SetTrigger("changeRifles");
			}
			currentWeaponIndex = 1;
			animator.SetBool("carrySword", false);
			animator.SetBool("carryRifle", true);
			animator.SetBool("carryPistol", false);
			AudioSource.PlayClipAtPoint(weapons[currentWeaponIndex].getReloadSound(),transform.position);
		} else if (Input.GetKeyDown("3")) {
			if (currentWeaponIndex == 1) {
				animator.SetTrigger("changeRifles");
			}
			currentWeaponIndex = 2;
			animator.SetBool("carrySword", false);
			animator.SetBool("carryRifle", true);
			animator.SetBool("carryPistol", false);
			AudioSource.PlayClipAtPoint(weapons[currentWeaponIndex].getReloadSound(),transform.position);
		} else if (Input.GetKeyDown("4")) {
			currentWeaponIndex = 3;
			animator.SetBool("carrySword", false);
			animator.SetBool("carryRifle", false);
			animator.SetBool("carryPistol", true);
			AudioSource.PlayClipAtPoint(weapons[currentWeaponIndex].getReloadSound(),transform.position);
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

function swordImpact(power : float) {
	reduceHealth(power*Time.deltaTime);
}