/*
 * Defines the behaviour of the ScannerTurret barrel.
 */

#pragma strict

private var angle : float;
private var direction : int; // which way is the barrel currently turning - 0: clockwise, 1: ccw
private var zombieTargeted : boolean;
private var lastShotTime : float;

var bulletPrefab : GameObject;
var angularSpeed : float;
var barrelLength : float;

// Firing properties
var firePower : float;
var bulletSpeed : float;
var rateOfFire : float;
var bulletsSpawned : int; // for burst fire
var bulletSpawningPositionDelta : Vector2;

var firingSound : AudioClip;

function Start () {
	direction = 1;
}

function Update () {
	var fwd : Vector3 = transform.TransformDirection(Vector3.right);
	var hits : RaycastHit2D[] = Physics2D.RaycastAll(transform.position + fwd*barrelLength, fwd);

	if (hits.Length == 0 || !hits[0].transform.gameObject.CompareTag("zombie")) {
		// if a zombie is in line of sight, change direction of the barrel turning with 0.5 probability
		if (zombieTargeted) {
			if (Random.Range(0, 2) == 1) direction *= -1;
			zombieTargeted = false;
		}
		transform.eulerAngles.z += direction*angularSpeed*Time.deltaTime;
	} else {
		zombieTargeted = true;
		fire(fwd);
	}

	Debug.DrawLine(transform.position + fwd*barrelLength, transform.position + fwd * 100, Color.blue, 0.1, false);
}

function fire(direction : Vector3) {
	// currently frame dependent (high rateOfFire + low FPS = less bullets)
	if (Time.time > lastShotTime + 1/rateOfFire ) {
		for (var b : int = 0; b < bulletsSpawned; b++) {
			var newBullet : GameObject = Instantiate(bulletPrefab, 
					transform.position + direction*barrelLength, 
					Quaternion.identity);
			newBullet.transform.eulerAngles.z = transform.eulerAngles.z;

			var delta : Vector2 = ZedUtils.rotateVector(bulletSpawningPositionDelta, Random.Range(0, 360));
			newBullet.transform.position += delta;
			
			newBullet.GetComponent(BulletProperties).setPower(firePower);
			newBullet.GetComponent(BulletMovement).setSpeed(bulletSpeed);
			
			AudioSource.PlayClipAtPoint(firingSound, transform.position);

			lastShotTime = Time.time;
		}
	}
}