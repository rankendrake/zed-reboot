#pragma strict

var maxSpeed : float;
var maxAcceleration : float;
var deceleration : float;

@HideInInspector
var moveSpeedX : float;

@HideInInspector
var moveSpeedY : float;

@HideInInspector
var accelerationX : float;

@HideInInspector
var accelerationY : float;


function Start () {	
	
}

function Update () {
	// Deceleration at every frame
 	if (moveSpeedX != 0) {
 	 	if (moveSpeedX < 0) {
 			moveSpeedX += Mathf.Min(Mathf.Abs(moveSpeedX), deceleration*Time.deltaTime); 
	 	} else {
	 		moveSpeedX -= Mathf.Min(Mathf.Abs(moveSpeedX), deceleration*Time.deltaTime);
	 	}	
 	}
 	if (moveSpeedY != 0) {
 	 	if (moveSpeedY < 0) {
 			moveSpeedY += Mathf.Min(Mathf.Abs(moveSpeedY), deceleration*Time.deltaTime); 
	 	} else {
	 		moveSpeedY -= Mathf.Min(Mathf.Abs(moveSpeedY), deceleration*Time.deltaTime);
	 	}	
 	}

	// Acceleration according to key pressed
	if (Input.GetKey("w")) {
		accelerationY = maxAcceleration;
		moveSpeedY += accelerationY*Time.deltaTime;
	}
	if (Input.GetKey("a")) {
		accelerationX = -maxAcceleration;
		moveSpeedX += accelerationX*Time.deltaTime;
	}
	if (Input.GetKey("s")) {
		accelerationY = -maxAcceleration;
		moveSpeedY += accelerationY*Time.deltaTime;
	}
	if (Input.GetKey("d")) {
		accelerationX = maxAcceleration;
		moveSpeedX += accelerationX*Time.deltaTime;
	}
	
	transform.position.x += moveSpeedX*Time.deltaTime;
	transform.position.y += moveSpeedY*Time.deltaTime;
}