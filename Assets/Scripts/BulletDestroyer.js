#pragma strict

/*
 * If a bullet gets tagged "doomed",
 * destroy it on the next frame.
 */

@HideInInspector
var destroyBullet : boolean;

function Update() {
	if (destroyBullet == true) {
		Destroy(gameObject);
	}
	
	if (tag == "doomed") {
		destroyBullet = true;
	}
}