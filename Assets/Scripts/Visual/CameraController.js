#pragma strict

var target : Transform;
var weight : float;
var mapBounds : Transform;

private var leftBound : float;
private var rightBound : float;
private var topBound : float;
private var bottomBound : float;

function Start(){
	// the ±0.1  is approx Zed's body width
	leftBound = mapBounds.position.x - mapBounds.localScale.x/2 + (Camera.main.orthographicSize * Camera.main.aspect) - 0.1;
	rightBound = mapBounds.position.x + mapBounds.localScale.x/2 - (Camera.main.orthographicSize * Camera.main.aspect) + 0.1;
	topBound = mapBounds.position.y + mapBounds.localScale.y/2 - Camera.main.orthographicSize + 0.1;
	bottomBound = mapBounds.position.y - mapBounds.localScale.y/2 + Camera.main.orthographicSize - 0.1;
}

function Update () {
	var zedPosition : Vector3 = target.position;
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