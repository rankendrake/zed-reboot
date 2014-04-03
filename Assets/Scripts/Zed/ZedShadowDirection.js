#pragma strict

var _transform : Transform;

function Start() {
	_transform = transform;
}

function Update () {
	_transform.eulerAngles.z = 0;
}