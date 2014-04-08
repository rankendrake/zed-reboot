#pragma strict

enum LeaderZombieState {Searching,Attacking};

var speed : float;
var speedDeviation : float;
var angularSpeed : float;
var centralizationOfDeviation : int;
var strikeRange : float;

var scentAccuracy : float = 1.0;
var reachedNextPosition : float = 0.12;
var zedVisualRange : float = 4.0;

var nextPosition : Vector3;
var currentState : LeaderZombieState;
var positionDifference : Vector3;

var lastPositionPollingTime : float;
var timeBetweenPositionPolls : float = 5.0;

private var direction : float;
private var target : GameObject;
private var zombieResources : ZombieResources;

var zombieStrike : ZombieStrike;

function Start() {
	target = GameObject.Find("zed");
	zombieStrike = gameObject.GetComponent(ZombieStrike) as ZombieStrike;
	var zedPosition : Vector3 = target.transform.position;
	var positionDifference : Vector3 = zedPosition - transform.position;
	direction = Mathf.Rad2Deg*Mathf.Atan2(positionDifference.y, positionDifference.x);
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
		// If still searching, walk towards plotted point near Zed. If zombie reaches that point, plot a new point.
		moveTowards(nextPosition);
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
		moveTowards(target.transform.position);
		if(Vector3.Magnitude(positionDifference) < strikeRange) {
			rigidbody2D.velocity = new Vector2(0,0);
			zombieStrike.hitTarget(target);
		}
		else if(Vector3.Magnitude(positionDifference) > 1.5 * zedVisualRange) {
			plotNewPosition();
			currentState = LeaderZombieState.Searching;
		}
		break;
	default: break;
	}
}

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
	
	transform.eulerAngles = new Vector3(0, 0, direction);

	rigidbody2D.velocity = new Vector2(
		speed*Mathf.Cos(Mathf.Deg2Rad*direction), 
		speed*Mathf.Sin(Mathf.Deg2Rad*direction));
}

function plotNewPosition() {
	nextPosition = target.transform.position + Random.insideUnitCircle * scentAccuracy;
	lastPositionPollingTime = Time.time;
}

function getTarget() {
	return target;
}
