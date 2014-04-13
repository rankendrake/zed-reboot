#pragma strict
import System.Collections.Generic;

var slowBloodSpawner : ParticleSystem;
var fastBloodSpawner : ParticleSystem;
var zombieResources : ZombieResources;
var zombieMovement : ZombieMovement;
private var zedStrike : ZedStrike;


function Awake() {
	zedStrike = GameObject.Find("zed").gameObject.GetComponent(ZedStrike);
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
	
	slowBloodSpawner.time = 0;
	slowBloodSpawner.Play();
	
	fastBloodSpawner.transform.eulerAngles.z = Mathf.Rad2Deg*Mathf.Atan2(velocity.y, velocity.x);
	fastBloodSpawner.time = 0;
	fastBloodSpawner.Play();
	damage(impactObject, power);
}