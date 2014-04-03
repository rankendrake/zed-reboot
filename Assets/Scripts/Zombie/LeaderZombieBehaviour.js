#pragma strict

enum LeaderZombieMode{Searching, Attacking};
var currentBehaviour : LeaderZombieMode;

var speedDeviation : float;
var centralizationOfDeviation : int;

var closeEnough : float = 0.10;
var strikeRange : float = closeEnough;

var nextPosition : Vector3;
var scentAccuracy : float;

var visualRange : float;

var positionDifference : Vector3;

private var direction : float;
var speed : float;
var angularSpeed : float;

var zed : GameObject;
var displacementFromZed : Vector2;

var zombieStrike : ZombieStrike;
var zombieResources : ZombieResources;

function Start () {
	zed = GameObject.Find("zed");
	currentBehaviour = LeaderZombieMode.Searching;
	nextPosition = zed.transform.position + (Random.insideUnitSphere * scentAccuracy);
	zombieStrike = gameObject.GetComponent(ZombieStrike) as ZombieStrike;
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
		case LeaderZombieMode.Searching :
			moveTowards(nextPosition, false);
			// If Leader moves within visual range of Zed, switch to attack mode.
			if(Vector2.SqrMagnitude(displacementFromZed) < visualRange*visualRange) {
				currentBehaviour = LeaderZombieMode.Attacking;
				nextPosition = zed.transform.position;
			}
		break;
		case LeaderZombieMode.Attacking :
			// If attacking, chase Zed.
			moveTowards(zed.transform.position, true);
			// If leader cannot see Zed, resume Searching.
			if(Vector2.SqrMagnitude(displacementFromZed) > visualRange*visualRange*1.5) {
				currentBehaviour = LeaderZombieMode.Searching;
				nextPosition = zed.transform.position + (Random.insideUnitSphere * scentAccuracy);
				nextPosition.z = transform.position.z;
			}
		
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
	if(Vector3.Magnitude(positionDifference) < closeEnough) {
		if(!chasing) {
			nextPosition = zed.transform.position + (Random.insideUnitSphere * scentAccuracy);
			nextPosition.z = zed.transform.position.z;
		}
		else {
			rigidbody2D.velocity = Vector2.zero;
			zombieStrike.hitZed();
		}
	}
	
	rigidbody2D.velocity = new Vector2(
		speed*Mathf.Cos(Mathf.Deg2Rad*direction), 
		speed*Mathf.Sin(Mathf.Deg2Rad*direction));
}