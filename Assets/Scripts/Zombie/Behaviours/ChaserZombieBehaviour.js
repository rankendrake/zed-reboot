#pragma strict

/* Simple zombie behaviour.
*  Just path towards zed, and attack zed.
*  Future implementation should have Chaser Zombies selecting their targets
*  based on their proximity.
*/

class ChaserZombieBehaviour extends ZombieBehaviour {

// Standard/Spawning variables
var speed : float;
private var speedDeviation : float;
var angularSpeed : float;
private var centralizationOfDeviation : int;
var strikeRange : float;
private var direction : float;
private var chanceToSpawnAsInterceptor : float = 0.25;
private var isInterceptor : boolean;

// Target-related data
private var target : GameObject;
var targetVisualRange : float;

// Position-related data
var nextPosition : Vector3;
var positionDifference : Vector3;
var reachedNextPosition : float;

// Zombie data
private var zombieResources : ZombieResources;
private var zombieStrike : ZombieStrike;
private var zombieMovement2 : ZombieMovement2;
// Mapbounds
private var mapBounds : Bounds;

function Start() {
	setTarget(GameObject.Find("zed"));
	zombieStrike = gameObject.GetComponent(ZombieStrike) as ZombieStrike;
	zombieMovement2 = gameObject.GetComponent(ZombieMovement2) as ZombieMovement2;
	zombieResources = gameObject.GetComponent(ZombieResources) as ZombieResources;
	getTargetAngle(nextPosition);
	if(centralizationOfDeviation > 0) {
		var speedDeviationFraction : float = speedDeviation / centralizationOfDeviation;
		for (var i = 0; i < centralizationOfDeviation; i++) {
			speed += Random.Range(-speedDeviationFraction, speedDeviationFraction);
		}
	}
	isInterceptor = Random.value < chanceToSpawnAsInterceptor;
	zombieMovement2.updateTargetSpeed(speed);
}

function Update() {
	positionDifference = nextPosition - transform.position;
	positionDifference += target.rigidbody2D.velocity;
		// Set nextPosition to the target's position.
		nextPosition = target.transform.position;
		zombieMovement2.updateTargetAngle(getTargetAngle(nextPosition));
		zombieMovement2.updateTargetSpeed(speed);
		// If within range, attack target.
		if(Vector3.Magnitude(transform.position - target.transform.position) < strikeRange) {
			zombieStrike.hitTarget(target);
		}
		// If the target isn't Zed, then it's probably a turret.
/*		if(!target.CompareTag("Player")) {
			if(target.GetComponent(TurretResources.isDead())) {
				target = null;
				currentState = PackZombieState.Wandering;
			}
		}*/
}

function getTargetAngle(destination : Vector3) {
	positionDifference = destination - transform.position;
	var targetDifference = positionDifference;
	if(isInterceptor) {
		if(target != null && target.GetComponent(ZedMovement) != null && Vector3.Magnitude(positionDifference) < 0.5*targetVisualRange) {
			targetDifference = positionDifference + (target.GetComponent(ZedMovement).getCurrentVelocity());
		}
	}
	return Mathf.Rad2Deg*Mathf.Atan2(targetDifference.y, targetDifference.x)-90;
}

function getTargetVisualRange() {
	return targetVisualRange;
}

function getTarget() {
	return target;
}

function setTarget(target : GameObject) {
	this.target = target;
}
}