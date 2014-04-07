#pragma strict

enum PackZombieState {Wandering,Following,Attacking};

var speed : float;
var speedDeviation : float;
var angularSpeed : float;
var centralizationOfDeviation : int;
var strikeRange : float;

var leaderDetectionRange : float = 5.0;
var reachedNextPosition : float = 0.25;
var targetVisualRange : float = 3.0;

var nextPosition : Vector3;
var currentState : PackZombieState;
var positionDifference : Vector3;

var positionRelativeToLeader : Vector3;
var maxDistanceFromLeader : float;

private var direction : float;
private var target : Transform;
private var leader : GameObject;
private var zombieResources : ZombieResources;

private var zombieStrike : ZombieStrike;
var mapBounds : Bounds;

function Start() {
	zombieStrike = gameObject.GetComponent(ZombieStrike) as ZombieStrike;
	var positionDifference : Vector3 = target.position - transform.position;
	direction = Mathf.Rad2Deg*Mathf.Atan2(positionDifference.y, positionDifference.x);
	zombieResources = gameObject.GetComponent(ZombieResources);
	plotRandomPosition();
	mapBounds = GameObject.Find("environment").GetComponent(SpriteRenderer).bounds;
	var speedDeviationFraction : float = speedDeviation / centralizationOfDeviation;
	for (var i = 0; i < centralizationOfDeviation; i++) {
		speed += Random.Range(-speedDeviationFraction, speedDeviationFraction);
	}
	currentState = PackZombieState.Wandering;
}

function Update() {
	switch (currentState) {
	case PackZombieState.Wandering : 
		
		moveTowards(nextPosition);
		if(Vector3.Magnitude(positionDifference) < reachedNextPosition) {
			plotRandomPosition();
		}
		var distanceFromTarget = target.position - transform.position;
		distanceFromTarget.z = 0;
		if(leader != null && !leader.CompareTag("deadZombie")) {
			currentState = PackZombieState.Following;
		}
		if(target != null) {
			nextPosition = target.position;
			currentState = PackZombieState.Attacking;
		}
		break;
	case PackZombieState.Following :
		break;
	case PackZombieState.Attacking : 
		// If attacking, continuously move towards target.
		moveTowards(target.position);
		if(Vector3.Magnitude(positionDifference) < strikeRange) {
			rigidbody2D.velocity = new Vector2(0,0);
			zombieStrike.hitTarget(target.gameObject);
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

function plotRandomPosition() {
//	nextPosition = target.position;
}