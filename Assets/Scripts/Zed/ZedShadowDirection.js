#pragma strict

var _transform : Transform;

function Awake() {
	_transform = transform;
}

function Update () {
	_transform.eulerAngles.z = 0;
}