#pragma strict

var zed : GameObject;
var weight : float;
var map : Transform;

private var zedMovement : ZedMovement;
private var leftBound : float;
private var rightBound : float;
private var topBound : float;
private var bottomBound : float;

function Start() {
	leftBound = map.position.x - map.renderer.bounds.size.x/2 + (Camera.main.orthographicSize * Camera.main.aspect);
	rightBound = map.position.x + map.renderer.bounds.size.x/2 - (Camera.main.orthographicSize * Camera.main.aspect);
	topBound = map.position.y + map.renderer.bounds.size.y/2 - Camera.main.orthographicSize;
	bottomBound = map.position.y - map.renderer.bounds.size.y/2 + Camera.main.orthographicSize;	

	zedMovement = zed.GetComponent(ZedMovement);
}

function Update() {
	var zedPosition : Vector3 = zedMovement.getPosition();
	var camPosition : Vector3 = transform.position;
	
	var targetPosition : Vector3 = zedPosition;
	if (targetPosition.x < leftBound) targetPosition.x = leftBound;
	if (targetPosition.x > rightBound) targetPosition.x = rightBound;
	if (targetPosition.y > topBound) targetPosition.y = topBound;
	if (targetPosition.y < bottomBound) targetPosition.y = bottomBound;
	
	
	var weightedDelta : Vector3 = weight*(targetPosition - camPosition);
	weightedDelta.z = 0;
	transform.position += weightedDelta;
	
	
	
	
//	if(zedPosition.x > leftBound && zedPosition.x < rightBound)
//	{
//		transform.position.x += weightedDelta.x;
//	}	
//	if(zedPosition.y > bottomBound && zedPosition.y < topBound)
//	{
//		transform.position.y += weightedDelta.y;
//	}
}