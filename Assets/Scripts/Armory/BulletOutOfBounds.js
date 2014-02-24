#pragma strict

private var leftBound : float;
private var rightBound : float;
private var topBound : float;
private var bottomBound : float;

var mapBounds : Transform;

function Start () {
	mapBounds = GameObject.Find("MapBounds").transform;
	leftBound = mapBounds.position.x - mapBounds.localScale.x/2;
	rightBound = mapBounds.position.x + mapBounds.localScale.x/2;
	topBound = mapBounds.position.y + mapBounds.localScale.y/2;
	bottomBound = mapBounds.position.y - mapBounds.localScale.y/2;
}

function Update () {
	var x : float = transform.position.x;
	var y : float = transform.position.y;
	if (x < leftBound || x > rightBound || y > topBound || y < bottomBound) {
		tag = "doomed";
	}
}