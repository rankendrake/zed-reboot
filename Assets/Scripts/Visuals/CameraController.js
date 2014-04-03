#pragma strict

var target : Transform;
var mapBounds : Transform;

private var leftBound : float;
private var rightBound : float;
private var topBound : float;
private var bottomBound : float;

private var cameraSpeedX : float;
private var cameraSpeedY : float;
var cameraAcceleration : float;
var cameraDampingFactor : float;
var mouseInfluenceWeight : float;

function Start(){
	// the ±0.1  is approx Zed's body width
	rightBound = mapBounds.position.x - mapBounds.localScale.x/2 + (Camera.main.orthographicSize * Camera.main.aspect) - 0.1;
	leftBound = mapBounds.position.x + mapBounds.localScale.x/2 - (Camera.main.orthographicSize * Camera.main.aspect) + 0.1;
	bottomBound = mapBounds.position.y + mapBounds.localScale.y/2 - Camera.main.orthographicSize + 0.1;
	topBound = mapBounds.position.y - mapBounds.localScale.y/2 + Camera.main.orthographicSize - 0.1;
}

function Update () {
	var zedPosition : Vector3 = target.position;
	var camPosition : Vector3 = transform.position;
	
	
	var mouseScreenPosition : Vector3 = Input.mousePosition;
	mouseScreenPosition.z = -transform.position.z;
	var mouseWorldPosition : Vector3 = Camera.main.ScreenToWorldPoint(mouseScreenPosition);	
	
	
	var targetPosition : Vector3 = (1 - mouseInfluenceWeight)*zedPosition + mouseInfluenceWeight*mouseWorldPosition;
	
	if (targetPosition.x < leftBound) targetPosition.x = leftBound;
	if (targetPosition.x > rightBound) targetPosition.x = rightBound;
	if (targetPosition.y > topBound) targetPosition.y = topBound;
	if (targetPosition.y < bottomBound) targetPosition.y = bottomBound;
	
	

	
	var delta : Vector3 = (targetPosition - camPosition);
	cameraSpeedX += cameraAcceleration * delta.x;
	cameraSpeedY += cameraAcceleration * delta.y;
	
	cameraSpeedX *= cameraDampingFactor;
	cameraSpeedY *= cameraDampingFactor;

	transform.position += (new Vector3(cameraSpeedX*Time.deltaTime, cameraSpeedY*Time.deltaTime, 0));
				

}