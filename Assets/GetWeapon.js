#pragma strict

var assaultRiflePrefab : GameObject;
var shotgunPrefab : GameObject;

function Update () {
	var gun : GameObject;
	if (Input.GetKeyDown ("k")) {
		removePreviousWeapons();
		gun = Instantiate(assaultRiflePrefab, transform.position, transform.rotation);	
		gun.transform.parent = transform;
	}
	if (Input.GetKeyDown ("p")) {
		removePreviousWeapons();
		gun = Instantiate(shotgunPrefab, transform.position, transform.rotation);	
		gun.transform.parent = transform;
	}
}

function removePreviousWeapons() {
	if (transform.childCount > 0) {
		for (var children : Object in transform) {
			var child : Transform = children as Transform;
		    Destroy(child.gameObject);
		}
	}
}