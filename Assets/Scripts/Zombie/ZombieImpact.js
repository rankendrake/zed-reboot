#pragma strict
import System.Collections.Generic;

private var zombieResources : ZombieResources;
private var zombieMovement : ZombieMovement;

function Start() {
	zombieResources = GetComponent(ZombieResources);
	zombieMovement = GetComponent(ZombieMovement);
}

// Has the potential of calculating the actual damage
// done using armor, resistances etc
function damage(power : float) {
	zombieResources.reduceHealth(power);
} 

/*
 * Handles the impact of a bullet
 * velocity		Velocity of bullet in order to calculate push back
 * hitBodyParts	List of hit body parts (child-objects 
 *				of zombie-GameObject)
 * 
 */
function impact(power : float, velocity : Vector2, hitBodyParts : List.<GameObject>) {
	// to do...
	damage(power);
}