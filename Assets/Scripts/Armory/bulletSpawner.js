#pragma strict

var bulletPrefab : GameObject;
var frequency : float;

@HideInInspector
var timeOfLastShot : float;

function Update () {
	if (Input.GetMouseButton(0) && ((Time.time - timeOfLastShot) * frequency) > 1) {
	    var newBullet : GameObject = Instantiate(bulletPrefab, transform.position, transform.rotation);
	    newBullet.tag = "bullet";
	    timeOfLastShot = Time.time;
	}
}