#pragma strict
/*
 * Defines all categories and perks that can be purchased in the game
 */

import System.Collections.Generic;

final var CATEGORY_COUNT : int = 3;
final var MOVEMENT : int = 0;
final var RATE_OF_FIRE : int = 1;
final var FIRE_POWER : int = 2;

private var perkTree : List.<Perk>[]; // array of Lists
private var unlockLevel : int[]; 	// to what level perks in each 
									// category are unlocked

var movementPerkTextureA : Texture2D;
var movementPerkTextureB : Texture2D;

function Start() {
	createPerkStock();
	unlockFirstLevel();		
}

function createPerkStock() {
	perkTree = new List.<Perk>[CATEGORY_COUNT];
	unlockLevel = new int[CATEGORY_COUNT];
	
	for (var i : int = 0; i < CATEGORY_COUNT; i++) {
		perkTree[i] = new List.<Perk>();
	}
	
	perkTree[MOVEMENT].Add(
			new MovementPerk.Builder()
					.name("Run training I")
					.perkIcon(movementPerkTextureA)
					.skillPointCost(12)
					.speedMultiplier(1.2)
					.accelerationMultiplier(1.1)
					.build());
					
	perkTree[MOVEMENT].Add(
			new MovementPerk.Builder()
					.name("Run training II")
					.skillPointCost(15)
					.speedMultiplier(1.2)
					.accelerationMultiplier(1.1)
					.build());
					
	perkTree[MOVEMENT].Add(
			new MovementPerk.Builder()
					.name("")
					.perkIcon(movementPerkTextureA)
					.skillPointCost(15)
					.speedMultiplier(1.2)
					.accelerationMultiplier(1.1)
					.build());
				
	perkTree[RATE_OF_FIRE].Add(
			new WeaponPerk.Builder()
					.name("Rate of fire improvement I")
					.skillPointCost(10)
					.rateOfFireMultiplier(1.2)
					.build());
					
	perkTree[RATE_OF_FIRE].Add(
			new WeaponPerk.Builder()
					.name("Rate of fire improvement II")
					.skillPointCost(20)
					.rateOfFireMultiplier(1.4)
					.build());
					
	perkTree[FIRE_POWER].Add(
			new WeaponPerk.Builder()
					.name("fire power I")
					.skillPointCost(10)
					.firePowerMultiplier(1.2)
					.build());	
					
	perkTree[FIRE_POWER].Add(
			new WeaponPerk.Builder()
					.name("fire power II")
					.skillPointCost(10)
					.firePowerMultiplier(1.2)
					.build());	
					
	perkTree[FIRE_POWER].Add(
			new WeaponPerk.Builder()
					.name("fire power III")
					.skillPointCost(10)
					.firePowerMultiplier(1.2)
					.build());		
}

function getPerk(category : int, index : int) {
	return perkTree[category][index];
}

function getCategorySize(category : int) {
	return perkTree[category].Count;
}

function unlockFirstLevel() {
	for (var i : int = 0; i < CATEGORY_COUNT; i++) {
		unlockLevel[i] = 0;
	}
}

function isUnlocked(categoryIndex : int, perkIndex : int) : boolean {
	return (unlockLevel[categoryIndex] >= perkIndex);
}

function isActive(categoryIndex : int, perkIndex : int) : boolean {
	return (unlockLevel[categoryIndex] > perkIndex);
}

function unlock(categoryIndex : int) {
	unlockLevel[categoryIndex]++;
}