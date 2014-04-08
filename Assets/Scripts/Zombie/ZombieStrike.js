#pragma strict

var zombieProperties : ZombieProperties;
var timeOfLastHit : float;
var zedResources : ZedResources;

function Start () {
	zombieProperties = transform.GetComponent(ZombieProperties) as ZombieProperties;
	zedResources = GameObject.Find("zed").GetComponent(ZedResources) as ZedResources;
}

// hitZed function deprecated, replace with hitTarget.

function hitZed() {
	if(Time.time - zombieProperties.getTimeBetweenHits() > timeOfLastHit) {
		zedResources.reduceHealth(zombieProperties.getAttackDamage());
		timeOfLastHit = Time.time;
	}
}

function hitTarget(target : GameObject) {
	if(Time.time - zombieProperties.getTimeBetweenHits() > timeOfLastHit) {
		if(target.CompareTag("zed")) {
			zedResources.reduceHealth(zombieProperties.getAttackDamage());
			timeOfLastHit = Time.time;
		}
//		else {
//			target.turretResources.reduceHealth(zombieProperties.getAttackDamage());
//		}
	}
}