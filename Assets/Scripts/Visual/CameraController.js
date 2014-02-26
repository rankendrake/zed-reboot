#pragma strict

var target : Transform;
var weight : float;
var mapBounds : Transform;

private var leftBound : float;
private var rightBound : float;
private var topBound : float;
private var bottomBound : float;

function Start(){
	mapBounds = GameObject.Find("MapBounds").transform;
	leftBound = mapBounds.position.x - mapBounds.localScale.x/2 + (Camera.main.orthographicSize*0.6);
	rightBound = mapBounds.position.x + mapBounds.localScale.x/2 - (Camera.main.orthographicSize*0.6);
	topBound = mapBounds.position.y + mapBounds.localScale.y/2 - (Camera.main.orthographicSize*0.6);
	bottomBound = mapBounds.position.y - mapBounds.localScale.y/2 + (Camera.main.orthographicSize*0.6);
}

function Update () {
	var zedPosition : Vector3 = target.position;
	var camPosition : Vector3 = transform.position;
	
	var weightedDelta : Vector3 = weight*(zedPosition - camPosition);
	weightedDelta.z = 0; // so that sorting layers work correctly
	if(zedPosition.x > leftBound && zedPosition.x < rightBound)
	{
		transform.position.x += weightedDelta.x;
	}	
	if(zedPosition.y > bottomBound && zedPosition.y < topBound)
	{
		transform.position.y += weightedDelta.y;
	}
}