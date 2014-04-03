#pragma strict

enum Mode{Searching, Attacking};
var currentBehaviour : Mode;

var speedDeviation : float;
var centralizationOfDeviation : int;

var closeEnough : float = 0.12;
var strikeRange : float = closeEnough;

var nextPosition : Vector3;
var scentAccuracy : float;

var visualRange : float;

private var direction : float;
private var speed : float;
private var angularSpeed : float;

var zed : GameObject;
var displacementFromZed : Vector2;

var zombieStrike : ZombieStrike;
var zombieResources : ZombieResources;

function Start () {
	currentBehaviour = Mode.Searching;
	nextPosition = zed.transform.position + (Random.insideUnitSphere * scentAccuracy);
	zed = GameObject.Find("zed");
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
		case Mode.Searching :
			moveTowards(nextPosition, false);
			// If Leader moves within visual range of Zed, switch to attack mode.
			if(Vector2.SqrMagnitude(displacementFromZed) < visualRange*visualRange) {
				currentBehaviour = Mode.Attacking;
				nextPosition = zed.transform.position;
			}
		break;
		case Mode.Attacking :
			moveTowards(zed.transform.position, true);
			if(Vector2.SqrMagnitude(displacementFromZed) > visualRange*visualRange) {
				currentBehaviour = Mode.Searching;
				nextPosition = zed.transform.position + (Random.insideUnitSphere * scentAccuracy);
				nextPosition.z = transform.position.z;
			}
		
		break;
		default : break;
	}
}

function moveTowards(destination : Vector3, chasing : boolean) {
	var positionDifference : Vector3 = destination - transform.position;
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