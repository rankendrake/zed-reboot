#pragma strict

/*
*  Zombie strike class to manage zombie melee attack.
*/

private var zombieResources : ZombieResources;
private var zombieProperties : ZombieProperties;
private var timeOfLastHit : float;
private var zedResources : ZedResources;
private var zombieMovement : ZombieMovement2;

var animator : Animator;

function Awake() {
	zombieProperties = GetComponent(ZombieProperties);
	zombieResources = GetComponent(ZombieResources);
	zombieMovement = GetComponent(ZombieMovement2);
	animator = GetComponent(Animator);
}

function Start () {
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
	zombieMovement.bulletSlowdown(100);
	if(Time.time - zombieProperties.getTimeBetweenHits() > timeOfLastHit) {
		if(target.CompareTag("zed")) {
			//zedResources.reduceHealth(zombieProperties.getAttackDamage());
			timeOfLastHit = Time.time;
			zombieResources.armWeapon.strike();									
			animator.SetTrigger("attack");
		}
//		else {
//			target.turretResources.reduceHealth(zombieProperties.getAttackDamage());
//		}
	}
}


function Update() {
	if (zombieResources.armWeapon.isStriking()) {
		zombieResources.armWeapon.executeStrike();
	}
}