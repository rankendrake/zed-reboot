#pragma strict
import System.Collections.Generic;

var slowBloodSpawner : ParticleSystem;
var fastBloodSpawner : ParticleSystem;
var swordBloodSpawner : ParticleSystem;
var zombieResources : ZombieResources;
private var zedStrike : ZedStrike;

var bulletSlowdownPercentage : float = 100;
var impactSound : AudioClip;

function Awake() {
	zedStrike = GameObject.Find("zed").gameObject.GetComponent(ZedStrike);
	if (zedStrike == null) {
		Debug.Log("zedStrike is null in ZombieImpact, finding new zedStrike");
		zedStrike = GameObject.Find("zed").GetComponent(ZedStrike);
	}
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
function impact(impactObject : GameObject, power : float, velocity : Vector2, hitBodyParts : List.<GameObject>) {
	if (impactObject != null) {
		if (impactObject.CompareTag("zed")) {
			zedStrike.incrementBulletsHit();
		}
	}


	damage(power);
	
	//slowBloodSpawner.transform.position = transform.position;
	
	//slowBloodSpawner.time = 0;
	//slowBloodSpawner.Play();
	slowBloodSpawner.Emit(20);
	// Slow the zombie down.
	transform.rigidbody2D.velocity = Vector3.zero;
	
	fastBloodSpawner.transform.eulerAngles.z = Mathf.Rad2Deg*Mathf.Atan2(velocity.y, velocity.x);
	fastBloodSpawner.Emit(15);
//	fastBloodSpawner.time = 0;
//	fastBloodSpawner.Play();
	AudioSource.PlayClipAtPoint(impactSound, transform.position);
//	damage(impactObject, power);
}

/*
 * gives Damage over time
 */
function swordImpact(power : float) {
	//fastBloodSpawner.transform.eulerAngles.z = transform.eulerAngles.z + 90;
	swordBloodSpawner.transform.position = transform.position;
	swordBloodSpawner.Emit(5);
	
	damage(power*Time.deltaTime);
}
