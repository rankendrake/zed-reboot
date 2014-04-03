#pragma strict

enum PackZombieMode{Wandering, Following, Attacking};
var currentBehaviour : PackZombieMode;

var speedDeviation : float;
var centralizationOfDeviation : int;

var closeEnough : float = 0.10;
var strikeRange : float = closeEnough;

var nextPosition : Vector3;
var positionDifference : Vector3;

var visualZedRange : float;

var currentLeader : GameObject;
var rangeAroundLeader : float;
var positionRelativeToLeader : Vector2;

private var direction : float;
var speed : float;
var angularSpeed : float;

var leaderSpeedup : float = 2;

var zed : GameObject;
var displacementFromZed : Vector2;

var zombieStrike : ZombieStrike;
var zombieResources : ZombieResources;

var mapBounds : Bounds;

function Start () {
	positionRelativeToLeader = Random.insideUnitCircle * rangeAroundLeader;
	mapBounds = GameObject.Find("environment").GetComponent(SpriteRenderer).bounds;
	zed = GameObject.Find("zed");
	zombieStrike = gameObject.GetComponent(ZombieStrike) as ZombieStrike;
	currentBehaviour = PackZombieMode.Wandering;
	nextPosition = Vector3(Random.Range(mapBounds.min.x, mapBounds.max.x),Random.Range(mapBounds.min.y,  mapBounds.max.y));
	var positionDifference : Vector3 = nextPosition - transform.position;
	direction = Mathf.Rad2Deg*Mathf.Atan2(positionDifference.y, positionDifference.x);
	
	zombieResources = gameObject.GetComponent(ZombieResources);
	var speedDeviationFraction : float = speedDeviation / centralizationOfDeviation;
	for (var i = 0; i < centralizationOfDeviation; i++) {
		speed += Random.Range(-speedDeviationFraction, speedDeviationFraction);
	}
	displacementFromZed = zed.transform.position - transform.position;
	zombieStrike = gameObject.GetComponent(ZombieStrike) as ZombieStrike;
}

function Update () {
	displacementFromZed = zed.transform.position - transform.position;
	switch (currentBehaviour) {
		case PackZombieMode.Wandering : 
			nextPosition.z = zed.transform.position.z;
			moveTowards(nextPosition, false);
			// If PackZombie moves within visual range of Zed, switch to attack mode.
			if(Vector2.SqrMagnitude(displacementFromZed) < visualZedRange*visualZedRange) {
				currentBehaviour = PackZombieMode.Attacking;
				nextPosition = zed.transform.position;
			}
			// If PackZombie moves within the intended random position, plot another position to move to.
			if(Vector3.Magnitude(positionDifference) < closeEnough) {
				nextPosition = Vector3(Random.Range(mapBounds.min.x, mapBounds.max.x),Random.Range(mapBounds.min.y,  mapBounds.max.y));
			}
			// If PackZombie finds a leader, follow him.
			if(currentLeader != null) {
			currentBehaviour = PackZombieMode.Following;
			}
		break;
		case PackZombieMode.Following : 
		// Adopt a position relative to the leader, and stick to it.
			nextPosition = currentLeader.transform.position + positionRelativeToLeader;
			moveTowards(nextPosition, false);
		// If the leader dies, resume wandering around the map.
			if(currentLeader.name.Equals("deadZombie")) {
				currentBehaviour = PackZombieMode.Wandering;
				currentLeader = null;
			}
			// If the leader zombie enters attack mode, follow suit, and receive a speed bonus.
			if(currentLeader.GetComponent(LeaderZombieBehaviour).currentBehaviour == LeaderZombieMode.Attacking) {
				currentBehaviour = PackZombieMode.Attacking;
				speed *= leaderSpeedup;
			}
			break;
		case PackZombieMode.Attacking : 
			moveTowards(zed.transform.position, true);
			
			break;
		
		default : break;
	}
}

function moveTowards(destination : Vector3, chasing : boolean) {
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
	
	direction += angularSpeed*Time.deltaTime*angleDifference;
	transform.eulerAngles = new Vector3(0, 0, direction);
	
	// If zombie is within attacking range of Zed, face Zed, stop, and hit Zed.
	if(Vector3.Magnitude(positionDifference) < closeEnough && chasing) {
		rigidbody2D.velocity = Vector2.zero;
		zombieStrike.hitZed();
	}
	
	rigidbody2D.velocity = new Vector2(
		speed*Mathf.Cos(Mathf.Deg2Rad*direction), 
		speed*Mathf.Sin(Mathf.Deg2Rad*direction));
}