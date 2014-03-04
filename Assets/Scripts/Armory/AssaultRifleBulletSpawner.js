#pragma strict

var bulletPrefab : GameObject;
var attr : WepAttributes;

@HideInInspector
var timeOfLastShot : float;

function Start(){
attr = GetComponent("WepAttributes") as WepAttributes;
}

function Update () {
	if (Input.GetMouseButton(0) && (Time.time - timeOfLastShot) * attr.GetFreq() > 1) {
		for (var i = 0; i < attr.GetNumPellets(); i++) {
			var newBullet : GameObject = Instantiate(bulletPrefab, transform.position, transform.rotation);
			newBullet.transform.rotation.eulerAngles.z += (Random.value - 0.5)*attr.GetSpread();
			newBullet.tag = "bullet";
			newBullet.GetComponent(EnemyImpact).Dmg = attr.GetDmg();
			newBullet.GetComponent(bulletMover).speed = attr.GetSpd();
		}
		
	    timeOfLastShot = Time.time;
	}
}