#pragma strict

class BossZombieBehaviour extends ZombieBehaviour {

enum BossZombieState {Attacking, Summon, AfterSummon};

// Standard/Spawning variables
var speed : float;
var angularSpeed : float;
var strikeRange : float;
private var direction : float;

// Target-related data
private var target : GameObject;

// Position-related data
var nextPosition : Vector3;
var positionDifference : Vector3;
var reachedNextPosition : float;

// Current State
var currentState : BossZombieState;

// Zombie data
private var zombieResources : ZombieResources;
private var zombieStrike : ZombieStrike;
private var zombieMovement2 : ZombieMovement2;

// Zombie-minion spawning data
var zombieSpawnEngine : ZombieSpawnEngine;
var zombiePrefab : GameObject;
var quantitySpawned : int = 4;
var zombieSpawningDuration : float = 3.0;
var timeSpentAttacking : float = 10.0;
var phaseChangedTime : float;

function Start () {
	zombieSpawnEngine = GameObject.Find("environment").GetComponent(ZombieSpawnEngine) as ZombieSpawnEngine;
	setTarget(GameObject.Find("zed"));
	zombieStrike = gameObject.GetComponent(ZombieStrike) as ZombieStrike;
	zombieMovement2 = gameObject.GetComponent(ZombieMovement2) as ZombieMovement2;
	zombieResources = gameObject.GetComponent(ZombieResources) as ZombieResources;
	getTargetAngle(nextPosition);
	zombieMovement2.updateTargetSpeed(speed);
	phaseChangedTime = Time.time;
	currentState = BossZombieState.Attacking;
}

function Update () {
	positionDifference = nextPosition - transform.position;
	switch(currentState) {
		case BossZombieState.Attacking :
		// Set nextPosition to the target's position.
			nextPosition = target.transform.position;
			zombieMovement2.updateTargetSpeed(speed);
			zombieMovement2.updateTargetAngle(getTargetAngle(nextPosition));
		// If within range, attack target.
			if(Vector3.Magnitude(transform.position - target.transform.position) < strikeRange) {
				zombieStrike.hitTarget(target);
			}
			if(Time.time > phaseChangedTime + timeSpentAttacking) {
				currentState = BossZombieState.Summon;
				phaseChangedTime = Time.time;
			}
			break;
		case BossZombieState.Summon :
			zombieMovement2.updateTargetSpeed(0);
			zombieSpawnEngine.spawnContinuous(zombiePrefab,Time.time,zombieSpawningDuration,quantitySpawned,transform.position,Vector2(1,1));
			currentState = BossZombieState.AfterSummon;
			break;
		case BossZombieState.AfterSummon :
			if(Time.time > phaseChangedTime + zombieSpawningDuration) {
				currentState = BossZombieState.Attacking;
				phaseChangedTime = Time.time;
				break;
			}
		}
	}
	
function getTargetAngle(destination : Vector3) {
	positionDifference = destination - transform.position;
	var targetDifference = positionDifference;
	return Mathf.Rad2Deg*Mathf.Atan2(targetDifference.y, targetDifference.x)-90;
}

function setTarget(target : GameObject) {
	this.target = target;
}

}