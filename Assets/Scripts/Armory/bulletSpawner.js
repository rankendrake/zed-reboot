#pragma strict

var bulletPrefab : GameObject;
var frequency : float;
private var clip : WeaponClip;

@HideInInspector
var timeOfLastShot : float;

function Start() {
	clip = transform.GetComponent(WeaponClip);
}

function Update() {
	if (Input.GetMouseButton(0) && ((Time.time - timeOfLastShot) * frequency) > 1) {
		if (clip.wasteBullet()) {
		    var newBullet : GameObject = Instantiate(bulletPrefab, transform.position, transform.rotation);
		    newBullet.tag = "bullet";
		    timeOfLastShot = Time.time;
		}
	}
}