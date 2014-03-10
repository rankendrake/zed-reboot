#pragma strict

var bulletPrefab : GameObject;
var frequency : float;
private var clip : WeaponClip;
private var reloadTime : float;
private var reloadStartTime : float;

@HideInInspector
var timeOfLastShot : float;

function Start() {
	clip = transform.GetComponent(WeaponClip);
	reloadTime = transform.parent.GetComponent(ZedAttributes).getReloadTime();
}

function Update() {
	if (Input.GetMouseButton(0) && 
			((Time.time - timeOfLastShot)*frequency) > 1 && 
			(reloadStartTime + reloadTime < Time.time)) {
		if (clip.wasteBullet()) {
		    var newBullet : GameObject = Instantiate(bulletPrefab, transform.position, transform.rotation);
		    newBullet.tag = "bullet";
		    timeOfLastShot = Time.time;
		}
	}
}

function reloadDelay() {
	reloadStartTime = Time.time;
}