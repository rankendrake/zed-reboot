#pragma strict

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
		// If within range, attack target.
		if(Vector3.Magnitude(transform.position - target.transform.position) < strikeRange) {
			zombieMovement2.updateTargetSpeed(0.0);
			zombieStrike.hitTarget(target);
		}
		else zombieMovement2.updateTargetSpeed(speed);
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
/*
function moveTowards(destination : Vector3) {
	positionDifference = destination - transform.position;
	positionDifference.z = 0;
	var targetDirection : float = Mathf.Rad2Deg*Mathf.Atan2(positionDifference.y, positionDifference.x);
	
	var angleDifference : float = (targetDirection - direction);
	if (angleDifference > 180) {
		angleDifference -= 360;
	}
	if (angleDifference < -180) {
		angleDifference += 360;
	}
	
	direction += angularSpeed*speed*Time.deltaTime*angleDifference;
	
	transform.eulerAngles = new Vector3(0, 0, direction-90);

	rigidbody2D.velocity = new Vector2(
		speed*Mathf.Cos(Mathf.Deg2Rad*direction), 
		speed*Mathf.Sin(Mathf.Deg2Rad*direction));
}
*/

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