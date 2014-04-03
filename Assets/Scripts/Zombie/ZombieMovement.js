#pragma strict

var speed : float;
var speedDeviation : float;
var angularSpeed : float;
var centralizationOfDeviation : int;
var strikeRange : float;

private var direction : float;
private var zed : Transform;
private var zombieResources : ZombieResources;

var zombieStrike : ZombieStrike;

function Start() {
	zed = GameObject.Find("zed").transform;
	zombieStrike = gameObject.GetComponent(ZombieStrike) as ZombieStrike;
	var zedPosition : Vector3 = zed.position;
	var positionDifference : Vector3 = zedPosition - transform.position;
	direction = Mathf.Rad2Deg*Mathf.Atan2(positionDifference.y, positionDifference.x);
	
	zombieResources = gameObject.GetComponent(ZombieResources);
	
	var speedDeviationFraction : float = speedDeviation / centralizationOfDeviation;
	for (var i = 0; i < centralizationOfDeviation; i++) {
		speed += Random.Range(-speedDeviationFraction, speedDeviationFraction);
	}
}

function Update() {
	var zedPosition : Vector3 = zed.position;

	var positionDifference : Vector3 = zedPosition - transform.position;
	positionDifference.z += 1;
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
	if (Vector3.Magnitude(positionDifference) < strikeRange) {
		rigidbody2D.velocity = Vector2.zero;
		zombieStrike.hitZed();
	}
	else {
		rigidbody2D.velocity = new Vector2(
			speed*Mathf.Cos(Mathf.Deg2Rad*direction), 
			speed*Mathf.Sin(Mathf.Deg2Rad*direction));
	}
}