#pragma strict

/* 
*  Behaviour class for Leader Zombies.
*
*  Leader Zombies, following Finite State Machine style, have 2 states:
*  Searching, Attacking.
*
*  Searching State:
*  Leaders will path towards a point approximating Zed’s position in simulation
*  of picking up his scent. This point is updated at regular intervals.
*
*  State Change Condition:
*  Target comes within targetVisualRange: Enter Attacking Mode.
*
*  Attacking State:
*  Leaders will path towards the target and attack it once within range.
*
*  State Change Condition:
*  Distance from target exceeds 1.5x targetVisualRange: Enter Searching Mode.
*
*
*  Note: Leader Zombies can behave autonomously from Pack Zombies, and do not
*  actively track the number of Pack Zombies currently following it. This can
*  be extended upon in future implementation.
*
*/




class LeaderZombieBehaviour extends ZombieBehaviour {

enum LeaderZombieState {Searching,Attacking};

// Standard / spawning variables
var speed : float;
private var speedDeviation : float;
var angularSpeed : float;
private var centralizationOfDeviation : int;
var strikeRange : float;
private var chanceToSpawnAsInterceptor : float = 1;
private var isInterceptor : boolean;

private var nextPosition : Vector3;
private var positionDifference : Vector3;

private var lastPositionPollingTime : float;
var timeBetweenPositionPolls : float;

private var direction : float;
private var target : GameObject;
private var zed : GameObject;

private var zombieResources : ZombieResources;
private var zombieStrike : ZombieStrike;
private var zombieMovement2 : ZombieMovement2;

var reachedNextPosition : float;
var targetVisualRange : float;
var scentAccuracy : float;

var currentState : LeaderZombieState;

function Start() {
	zed = GameObject.Find("zed");
	zombieStrike = transform.GetComponent(ZombieStrike) as ZombieStrike;
	zombieMovement2 = transform.GetComponent(ZombieMovement2) as ZombieMovement2;
	zombieMovement2.updateTargetSpeed(speed);
	var zedPosition : Vector3 = zed.transform.position;
	getTargetAngle(zedPosition);
	zombieResources = gameObject.GetComponent(ZombieResources);
	plotNewPosition();
	var speedDeviationFraction : float = speedDeviation / centralizationOfDeviation;
	for (var i = 0; i < centralizationOfDeviation; i++) {
		speed += Random.Range(-speedDeviationFraction, speedDeviationFraction);
	}
	isInterceptor = Random.value < chanceToSpawnAsInterceptor;
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
		var distanceFromZed = zed.transform.position - transform.position;
		distanceFromZed.z = 0;
		if(target != null) {
			Debug.Log("Leader attacking!");
			nextPosition = target.transform.position;
			currentState = LeaderZombieState.Attacking;
		}
		break;
	case LeaderZombieState.Attacking : 
		// If attacking, continuously move towards target.
		nextPosition = target.transform.position;
		zombieMovement2.updateTargetSpeed(speed);
		zombieMovement2.updateTargetAngle(getTargetAngle(nextPosition));
		if(Vector3.Magnitude(positionDifference) < strikeRange) {
			zombieStrike.hitTarget(target);
		}
		else {
			if(Vector3.Magnitude(positionDifference) > 1.5 * targetVisualRange) {
				target = null;
				plotNewPosition();
				currentState = LeaderZombieState.Searching;
			}
		}
		break;
	default: break;
	}
}

function getTargetVisualRange() {
	return targetVisualRange;
}

function updateZombieAngle() {
		zombieMovement2.updateTargetAngle(getTargetAngle(nextPosition));
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
function plotNewPosition() {
	nextPosition = zed.transform.position + Random.insideUnitCircle * scentAccuracy;
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