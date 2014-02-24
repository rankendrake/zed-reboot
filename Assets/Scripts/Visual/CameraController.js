#pragma strict

var target : Transform;
var weight : float;

function Update () {
	var zedPosition : Vector3 = target.position;
	var camPosition : Vector3 = transform.position;
	var weightedDelta : Vector3 = weight*(zedPosition - camPosition);
	weightedDelta.z = 0; // so that sorting layers work correctly
	transform.position += weightedDelta;
}