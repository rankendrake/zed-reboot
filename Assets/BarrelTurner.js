#pragma strict

private var angle : float;
private var direction : int;
private var zombieTargeted : boolean;
private var lastShotTime : float;

var bulletPrefab : GameObject;
var angularSpeed : float;
var barrelLength : float;
var firePower : float;
var bulletSpeed : float;
var rateOfFire : float;
var firingSound : AudioClip;

function Start () {
	direction = 1;
}

function Update () {
	var fwd : Vector3 = transform.TransformDirection(Vector3.right);
	var hits : RaycastHit2D[] = Physics2D.RaycastAll(transform.position + fwd*barrelLength, fwd);

	if (hits.Length == 0 || !hits[0].transform.gameObject.CompareTag("zombie")) {
		if (zombieTargeted) {
			if (Random.Range(0, 1) == 1) direction *= -1;
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
	if (Time.time > lastShotTime + 1/rateOfFire ) {
			
		var newBullet : GameObject = Instantiate(bulletPrefab, 
				transform.position + direction*barrelLength, 
				Quaternion.identity);
		newBullet.transform.eulerAngles.z = transform.eulerAngles.z;
		
		newBullet.GetComponent(BulletProperties).setPower(firePower);
		newBullet.GetComponent(BulletMovement).setSpeed(bulletSpeed);
		
		AudioSource.PlayClipAtPoint(firingSound, transform.position);

		lastShotTime = Time.time;
	}
}