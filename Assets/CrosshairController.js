#pragma strict

function Start () {
	Screen.showCursor = false;
}

function LateUpdate () {
//	var crosshairPosition : Vector3 = Input.mousePosition;
//	crosshairPosition.x -= Screen.width/2;
//	crosshairPosition.y -= Screen.height/2;
//	
//	var camPosition : Vector3 = Camera.main.transform.position;
//	camPosition.z = 0;
//	transform.position = (camPosition + crosshairPosition / 100) ;
	
	var mouseScreenPosition : Vector3 = Input.mousePosition;
	mouseScreenPosition.z = transform.position.z - Camera.main.transform.position.z;
	var mouseWorldPosition : Vector3 = Camera.main.ScreenToWorldPoint(mouseScreenPosition);
	transform.position = mouseWorldPosition;
	transform.position.z = 0; 
	
}