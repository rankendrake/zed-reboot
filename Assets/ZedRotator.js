#pragma strict

function Start () {
	
}

function Update () {
	// getting the mouse position relative to the world
	var mouseScreenPosition : Vector3 = Input.mousePosition;
	mouseScreenPosition.z = transform.position.z - Camera.main.transform.position.z;
	var mouseWorldPosition : Vector3 = Camera.main.ScreenToWorldPoint(mouseScreenPosition);
	
	var positionDifference : Vector3 = mouseWorldPosition - transform.position;
	var angle : float = Mathf.Rad2Deg*Mathf.Atan2(positionDifference.y, positionDifference.x);
	
	transform.eulerAngles = new Vector3(0, 0, angle);
}