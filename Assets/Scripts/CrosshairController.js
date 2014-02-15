#pragma strict

function Start () {
	Screen.showCursor = false;
}

function LateUpdate () {
	var mouseScreenPosition : Vector3 = Input.mousePosition;
	mouseScreenPosition.z = transform.position.z - Camera.main.transform.position.z;
	var mouseWorldPosition : Vector3 = Camera.main.ScreenToWorldPoint(mouseScreenPosition);
	transform.position = mouseWorldPosition;
	transform.position.z = 0;
}