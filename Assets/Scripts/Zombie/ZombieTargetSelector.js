#pragma strict

var zed : GameObject;
var turrets : GameObject[];
var target : GameObject;
var squareDistance : float;

function Start() {
	zed = GameObject.Find("zed");
	turrets = GameObject.FindGameObjectsWithTag("turret");
}

function findClosestTarget() {
	turrets = GameObject.FindGameObjectsWithTag("turret");
	for (var turret in turrets) {
		if(squareDistance == null) {
			squareDistance = Vector3.SqrMagnitude(transform.position - turret.transform.position);
			target = turret;
		}
		else if(squareDistance > Vector3.SqrMagnitude(transform.position - turret.transform.position)) {
			squareDistance = Vector3.SqrMagnitude(transform.position - turret.transform.position);
			target = turret;
		}
	}
	if(squareDistance > Vector3.SqrMagnitude(zed.transform.position - transform.position)) {
		target = zed;
	}
	return target;
}

function targetIsWithinRange(range : float) {
	if(target == null || squareDistance == null) {
		target = findClosestTarget();
	}
	return squareDistance < (range * range);
}