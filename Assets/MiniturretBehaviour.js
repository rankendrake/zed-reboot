#pragma strict

private var angle : float;
private var lastShotTime : float;

var bulletPrefab : GameObject;

var bulletSpawnOffsets : Vector2[];
var firePower : float;
var bulletSpeed : float;
var rateOfFire : float;
var firingSound : AudioClip;

var scanDelay : float;
private var nextScanTime : float;
var scanRadius : float;
var scanIntervalDegree : float;
var angularWeight : float;
var actualAngle : float;
var targetAngle : float;
var maxStep : float;

var acceleration : float;
private var currentAcceleration : float;
var deceleration : float;
var maxAcceleration : float;
private var actualSpeed : float;
var maxSpeed : float;
var movingTime : float;
private var movingEndTime : float;
var stopMovingAngleThreshold : float;

var theoreticalDirection : Vector3;

private var zombieAveragePosition : Vector3;

function Start () {
	nextScanTime = Time.time;
	theoreticalDirection = transform.right;
	movingEndTime = 0;
	actualSpeed = 0;
}

function Update () {
	if (Time.time >= nextScanTime) {
		zombieAveragePosition = getAveragePositionOfZombies();
		movingEndTime = Time.time + movingTime;
		nextScanTime = Time.time + scanDelay;
	}

	targetAngle = ZedUtils.getAngle(transform.position, zombieAveragePosition); 

	actualAngle = ZedUtils.proportionallyAdjustAngle(actualAngle, targetAngle, angularWeight);
	transform.eulerAngles.z = actualAngle;
	Debug.DrawRay(transform.position, transform.right, Color.yellow);

	if (Time.time < movingEndTime) {
		if (Mathf.Abs(ZedUtils.getAngularDistance(transform.eulerAngles.z, targetAngle)) > stopMovingAngleThreshold) {
			accelerate();
		}
		fire(transform.right);
	} else {
		decelerate();
	}

	var currentSpeed = Time.deltaTime*actualSpeed;
	transform.position += transform.right*currentSpeed;
}

function accelerate() {
	var currentAcceleration : float = acceleration*Time.deltaTime;
	var speedDifference = maxSpeed - actualSpeed;
	if (Mathf.Abs(speedDifference) > currentAcceleration) {
		actualSpeed += currentAcceleration*Mathf.Sign(speedDifference) ;
	} else {
		actualSpeed = maxSpeed;
	}
}

function decelerate() {
	var currentDeceleration : float = deceleration*Time.deltaTime;
	if (Mathf.Abs(actualSpeed) > currentDeceleration) {
		actualSpeed -= currentDeceleration;
	} else {
		actualSpeed = 0;
	}
}

function fire(direction : Vector3) {
	if (Time.time > lastShotTime + 1/rateOfFire ) {
		for (var i : int = 0; i < 2; i++) {
			// var instantiationPosition : Vector2 = transform.position + bulletSpawnOffsets[i];
			var instantiationPosition : Vector2 = transform.position + ZedUtils.rotateVector(bulletSpawnOffsets[i], transform.eulerAngles.z);
			

			var newBullet : GameObject = Instantiate(bulletPrefab, 
					instantiationPosition,
					Quaternion.identity);
			newBullet.transform.eulerAngles.z = transform.eulerAngles.z;
		
			newBullet.GetComponent(BulletProperties).setPower(firePower);
			newBullet.GetComponent(BulletMovement).setSpeed(bulletSpeed);
		
			AudioSource.PlayClipAtPoint(firingSound, instantiationPosition);
		}
		lastShotTime = Time.time;
	}
}

function getAveragePositionOfZombies() : Vector3 {
	var direction : Vector3 = transform.TransformDirection(Vector3.right);
	var hits : List.<RaycastHit2D> = new List.<RaycastHit2D>();
	var degree : float = 0;

	// Scan and store found unique zombies
	while (degree <= 360) {
		var dir : Vector3 = Quaternion.Euler(0, 0, degree) * direction;

		// Cast ray
		var currentHits : RaycastHit2D[] = Physics2D.RaycastAll(transform.position, dir, scanRadius);

		// Add new zombies to list
		for (var hit : RaycastHit2D in currentHits) {
			if (hit.transform.gameObject.CompareTag("zombie")) {
				var alreadyExists : boolean = false;
				for (var existingHit : RaycastHit2D in hits) {
					if (hit == existingHit) {
						alreadyExists = true;
					}
				}
				if (!alreadyExists) {
					hits.Add(hit);
				}
			}
		}
		degree += scanIntervalDegree;
	}

	// Calculate zombie average position
	var zombieAveragePosition : Vector3 = Vector3.zero;
	for (var hit : RaycastHit2D in hits) {
		zombieAveragePosition += hit.transform.position;
	}
	if (hits.Count > 1) {
		zombieAveragePosition /= hits.Count;
	}

	return zombieAveragePosition;
}