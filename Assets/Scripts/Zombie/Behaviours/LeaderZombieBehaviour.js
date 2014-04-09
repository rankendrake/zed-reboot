#pragma strict

class LeaderZombieBehaviour extends ZombieBehaviour {

enum LeaderZombieState {Searching,Attacking};

// Standard data
var speed : float;
private var speedDeviation : float;
var angularSpeed : float;
private var centralizationOfDeviation : int;
var strikeRange : float;

private var nextPosition : Vector3;
private var positionDifference : Vector3;

private var lastPositionPollingTime : float;
var timeBetweenPositionPolls : float;

private var direction : float;
private var target : GameObject;

private var zombieResources : ZombieResources;
private var zombieStrike : ZombieStrike;
private var zombieMovement2 : ZombieMovement2;

var reachedNextPosition : float;
var zedVisualRange : float;
var scentAccuracy : float;

var currentState : LeaderZombieState;

function Start() {
	target = GameObject.Find("zed");
	zombieStrike = transform.GetComponent(ZombieStrike) as ZombieStrike;
	zombieMovement2 = transform.GetComponent(ZombieMovement2) as ZombieMovement2;
	zombieMovement2.updateTargetSpeed(speed);
	var zedPosition : Vector3 = target.transform.position;
	getTargetAngle(zedPosition);
	zombieResources = gameObject.GetComponent(ZombieResources);
	plotNewPosition();
	var speedDeviationFraction : float = speedDeviation / centralizationOfDeviation;
	for (var i = 0; i < centralizationOfDeviation; i++) {
		speed += Random.Range(-speedDeviationFraction, speedDeviationFraction);
	}

}

function Update() {
	switch (currentState) {
	case LeaderZombieState.Searching : 
		zombieMovement2.updateTargetAngle(getTargetAngle(nextPosition));
		// If still searching, walk towards plotted point near Zed. If zombie reaches that point, plot a new point.
		if(Vector3.Magnitude(positionDifference) < reachedNextPosition ||
			Time.time > lastPositionPollingTime + timeBetweenPositionPolls) {
			plotNewPosition();
		}
		var distanceFromZed = target.transform.position - transform.position;
		distanceFromZed.z = 0;
		if(Vector3.Magnitude(distanceFromZed) < zedVisualRange) {
			nextPosition = target.transform.position;
			currentState = LeaderZombieState.Attacking;
		}
		break;
	case LeaderZombieState.Attacking : 
		// If attacking, continuously move towards Zed.
		nextPosition = target.transform.position;
		zombieMovement2.updateTargetAngle(getTargetAngle(nextPosition));
		if(Vector3.Magnitude(positionDifference) < strikeRange) {
			zombieMovement2.updateTargetSpeed(0.0);
			zombieStrike.hitTarget(target);
		}
		else {
			zombieMovement2.updateTargetSpeed(speed);
			if(Vector3.Magnitude(positionDifference) > 1.5 * zedVisualRange) {
				plotNewPosition();
				currentState = LeaderZombieState.Searching;
			}
		}
		break;
	default: break;
	}
}

function updateZombieAngle() {
		zombieMovement2.updateTargetAngle(getTargetAngle(nextPosition));
}

function getTargetAngle(destination : Vector3) {
	positionDifference = destination - transform.position;
	return (Mathf.Rad2Deg*Mathf.Atan2(positionDifference.y, positionDifference.x)-90);
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
function plotNewPosition() {
	nextPosition = target.transform.position + Random.insideUnitCircle * scentAccuracy;
	lastPositionPollingTime = Time.time;
}

function isAttacking() {
	return currentState == LeaderZombieState.Attacking;
}

function setTarget(target : GameObject) {
	this.target = target;
}

function getTarget() {
	return target;
}
}