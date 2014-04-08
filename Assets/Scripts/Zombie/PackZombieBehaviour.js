#pragma strict

enum PackZombieState {Wandering,Following,Attacking};

var speed : float;
var speedDeviation : float;
var angularSpeed : float;
var centralizationOfDeviation : int;
var strikeRange : float;

var leaderDetectionRange : float = 3.0;
var reachedNextPosition : float = 3.0;
var targetVisualRange : float = 3.0;

var nextPosition : Vector3;
var currentState : PackZombieState;
var positionDifference : Vector3;

var positionRelativeToLeader : Vector2;
var maxDistanceFromLeader : float = 3.0;
var leaderSpeedupFactor : float = 2.0;

private var direction : float;
var target : GameObject;
var leader : GameObject;
private var zombieResources : ZombieResources;

var lastPollingTime : float;
var timeBetweenPolls : float = 5.0;

private var zombieStrike : ZombieStrike;
var mapBounds : Bounds;

function Start() {
	plotRandomPosition();
	zombieStrike = gameObject.GetComponent(ZombieStrike) as ZombieStrike;
	var positionDifference : Vector3 = nextPosition - transform.position;
	direction = Mathf.Rad2Deg*Mathf.Atan2(positionDifference.y, positionDifference.x);
	zombieResources = gameObject.GetComponent(ZombieResources);
	mapBounds = GameObject.Find("environment").GetComponent(SpriteRenderer).bounds;
	var speedDeviationFraction : float = speedDeviation / centralizationOfDeviation;
	for (var i = 0; i < centralizationOfDeviation; i++) {
		speed += Random.Range(-speedDeviationFraction, speedDeviationFraction);
	}
	currentState = PackZombieState.Wandering;
	positionRelativeToLeader = Random.insideUnitCircle * maxDistanceFromLeader;
}

function Update() {
	// Additional behaviour dependent on currentState.
	switch (currentState) {
	case PackZombieState.Wandering : 
	moveTowards(nextPosition);
	// If Pack Zombie has reached the next position, plot another random position.
		if(Vector3.Magnitude(positionDifference) < reachedNextPosition) {
			plotRandomPosition();
		}
	// Leader is set by LeaderDetector script.
		if(leader != null && leader.GetComponent(ZombieResources).isAlive()) {
			currentState = PackZombieState.Following;
			speed = leader.GetComponent(LeaderZombieBehaviour).speed * 1.2;
		}
	// TODO: Target will soon be set by ZombieTargetSelector. For now, LeaderDetector takes up that role,
	// 		using the same collider that is used to detect leaders.
		if(target != null) {
			currentState = PackZombieState.Attacking;
		}
		break;
		// If following, adopt a position around the leader, and stay close to the leader.
	case PackZombieState.Following :
		nextPosition = leader.transform.position + positionRelativeToLeader;
		// Once Pack Zombie has assumed his position near the leader, he will maintain formation with the leader.
		if(Vector3.Magnitude(leader.transform.position - transform.position) < reachedNextPosition) {
			matchLeaderMovement();
		}
		else
			moveTowards(nextPosition);
		// If the leader is attacking a target, they will enter attack mode and also attack the target.
		// Pack Zombies entering attack mode by this means will receive a speed boost, presumably from
		// leader motivation.
		if(leader.GetComponent(LeaderZombieBehaviour).currentState == LeaderZombieState.Attacking) {
			currentState = PackZombieState.Attacking;
			speed *= leaderSpeedupFactor;
			target = leader.GetComponent(LeaderZombieBehaviour).getTarget();
		}
		// If the leader dies, the pack zombie begins to wander again, having lost their leader.
		// The leader is set to null, and currentState returns to Wandering.
		if(!leader.GetComponent(ZombieResources).isAlive()) {
			currentState = PackZombieState.Wandering;
			leader = null;
		}
		break;
		// Attacking state is maintained until the target dies, until the Pack Zombie dies.
		// He will kill the target or die trying.
	case PackZombieState.Attacking : 
		// Set nextPosition to the target's position.
		nextPosition = target.transform.position;
		moveTowards(nextPosition);
		// If within range, attack target.
		if(Vector3.Magnitude(transform.position - target.transform.position) < strikeRange) {
			rigidbody2D.velocity = new Vector2(0,0);
			zombieStrike.hitTarget(target);
		}
		// If the target isn't Zed, then it's probably a turret.
/*		if(!target.CompareTag("Player")) {
			if(target.GetComponent(TurretResources.isDead())) {
				target = null;
				currentState = PackZombieState.Wandering;
			}
		}*/
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

function setLeader(newLeader : GameObject) {
	leader = newLeader;
}

function getTarget() {
	return target;
}

function matchLeaderMovement() {
	transform.eulerAngles = leader.transform.eulerAngles;
	rigidbody2D.velocity = leader.rigidbody2D.velocity;
}

function plotRandomPosition() {
	var nextX = Random.Range(mapBounds.min.x,mapBounds.max.x);
	var nextY = Random.Range(mapBounds.min.y,mapBounds.max.y);
	nextPosition = Vector3(nextX,nextY);
}