#pragma strict

var zombieProperties : ZombieProperties;
var timeOfLastHit : float;
var zedResources : ZedResources;

function Start () {
	zombieProperties = transform.GetComponent(ZombieProperties) as ZombieProperties;
	zedResources = GameObject.Find("zed").GetComponent(ZedResources) as ZedResources;
}

function hitZed() {
	if(Time.time - zombieProperties.getTimeBetweenHits() > timeOfLastHit) {
		zedResources.reduceHealth(zombieProperties.getAttackDamage());
		timeOfLastHit = Time.time;
	}
}