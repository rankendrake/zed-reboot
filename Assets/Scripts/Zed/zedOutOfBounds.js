#pragma strict

private var leftBound : float;
private var rightBound : float;
private var topBound : float;
private var bottomBound : float;

var mapBounds : Transform;
var mover : ZedMover;

function Start () {
	mover = GetComponent(ZedMover);
	mapBounds = GameObject.Find("MapBounds").transform;
	leftBound = mapBounds.position.x - mapBounds.localScale.x/2;
	rightBound = mapBounds.position.x + mapBounds.localScale.x/2;
	topBound = mapBounds.position.y + mapBounds.localScale.y/2;
	bottomBound = mapBounds.position.y - mapBounds.localScale.y/2;
}

function Update () {
	var x : float = transform.position.x;
	var y : float = transform.position.y;
	if(x < leftBound)
	{
		transform.position.x = leftBound;
		mover.moveSpeedX = 0.0;
	}	
	if(x > rightBound)
	{
		transform.position.x = rightBound;
		mover.moveSpeedX = 0.0;
	}	
	if(y < bottomBound)
	{
		transform.position.y = bottomBound;
		mover.moveSpeedY = 0.0;
	}
	if(y > topBound)
	{
		transform.position.y = topBound;
		mover.moveSpeedY = 0.0;
	}
}