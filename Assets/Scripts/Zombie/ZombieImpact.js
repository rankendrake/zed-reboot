#pragma strict
import System.Collections.Generic;

private var zombieResources : ZombieResources;
private var zombieMovement : ZombieMovement;
private var zedStrike : ZedStrike;

function Awake() {
	zombieResources = GetComponent(ZombieResources);
	zombieMovement = GetComponent(ZombieMovement);
	zedStrike = zombieResources.zedResources.gameObject.GetComponent(ZedStrike);
	if (zedStrike == null) {
		Debug.Log("zedStrike is null in ZombieImpact, finding new zedStrike");
		zedStrike = GameObject.Find("zed").GetComponent(ZedStrike);
	}
}

// Has the potential of calculating the actual damage
// done using armor, resistances etc
function damage(impactObject : GameObject, power : float) {
	if (impactObject != null) {
		if (impactObject.CompareTag("zed")) {
			zedStrike.incrementBulletsHit();
		}
	}

	zombieResources.reduceHealth(power);
} 

/*
 * Handles the impact of a bullet
 * velocity		Velocity of bullet in order to calculate push back
 * hitBodyParts	List of hit body parts (child-objects 
 *				of zombie-GameObject)
 * 
 */
function impact(impactObject : GameObject, power : float, velocity : Vector2, hitBodyParts : List.<GameObject>) {
	// to do...
	damage(impactObject, power);
}