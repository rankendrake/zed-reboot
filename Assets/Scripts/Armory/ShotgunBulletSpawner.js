#pragma strict

var bulletPrefab : GameObject;
var frequency : float;
var spread : float;

@HideInInspector
var timeOfLastShot : float;

function Update () {
	if (Input.GetMouseButton(0) && ((Time.time - timeOfLastShot) * frequency) > 1) {
		for (var i = 0; i < 5; i++) {
			var newBullet : GameObject = Instantiate(bulletPrefab, transform.position, transform.rotation);
			newBullet.transform.rotation.eulerAngles.z += (Random.value - 0.5)*spread;
			newBullet.tag = "bullet";
		}
		
	    timeOfLastShot = Time.time;
	}
}