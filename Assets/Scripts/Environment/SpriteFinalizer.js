#pragma strict

private var doomedBullets : GameObject[];
private var deadBullets : GameObject[];


function Start () {

}

function Update () {
	doomedBullets = GameObject.FindGameObjectsWithTag("doomedBullet");
	deadBullets = GameObject.FindGameObjectsWithTag("deadBullet");
	
	for (var bullet in doomedBullets) {
		bullet.tag = "deadBullet";
	}
	
	for (var bullet in deadBullets) {
		Destroy(bullet);
	}
}

