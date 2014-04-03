#pragma strict

var maxSpeed : float;
var maxAcceleration : float;
var deceleration : float;
var zedAnimator : Animator;
var map : GameObject;

private var moveSpeedX : float;
private var moveSpeedY : float;
private var accelerationX : float;
private var accelerationY : float;
private var standing : boolean;

// The rotation and position are independent of the physics engine
private var rotation : float;
private var position : Vector3;

private var _transform : Transform;

function Start() {
	position = transform.position;
	_transform = transform;
}

function Update () {
	// Deceleration at every frame
 	if (moveSpeedX != 0) {
 	 	if (moveSpeedX < 0) {
 			moveSpeedX += Mathf.Min(Mathf.Abs(moveSpeedX), deceleration); 
	 	} else {
	 		moveSpeedX -= Mathf.Min(Mathf.Abs(moveSpeedX), deceleration);
	 	}	
 	}
 	if (moveSpeedY != 0) {
 	 	if (moveSpeedY < 0) {
 			moveSpeedY += Mathf.Min(Mathf.Abs(moveSpeedY), deceleration); 
	 	} else {
	 		moveSpeedY -= Mathf.Min(Mathf.Abs(moveSpeedY), deceleration);
	 	}	
 	}
	
	// Acceleration according to key pressed
	if (Input.GetKey("w")) {
		accelerationY = maxAcceleration;
		moveSpeedY += accelerationY;
	}
	if (Input.GetKey("a")) {
		accelerationX = -maxAcceleration;
		moveSpeedX += accelerationX;
	}
	if (Input.GetKey("s")) {
		accelerationY = -maxAcceleration;
		moveSpeedY += accelerationY;
	}
	if (Input.GetKey("d")) {
		accelerationX = maxAcceleration;
		moveSpeedX += accelerationX;
	}
	
	var absMoveSpeedX : float = Mathf.Abs(moveSpeedX);
	var absMoveSpeedY : float = Mathf.Abs(moveSpeedY);
	
	// Max speed is not really max speed diagonally
	if (absMoveSpeedX > maxSpeed) {
		moveSpeedX = maxSpeed * Mathf.Sign(moveSpeedX);
	}
	if (absMoveSpeedY > maxSpeed) {
		moveSpeedY = maxSpeed * Mathf.Sign(moveSpeedY);
	}

	//rigidbody2D.velocity = new Vector2(moveSpeedX, moveSpeedY);
	//rigidbody2D.transform.position += new Vector3(moveSpeedX*Time.deltaTime, moveSpeedY*Time.deltaTime, 0);
	var oldPosition : Vector3 = position;
	position += new Vector3(moveSpeedX*Time.deltaTime, moveSpeedY*Time.deltaTime, 0);
	if (map.renderer.bounds.size.x/2 > Mathf.Abs(position.x)) {	
		_transform.position.x = position.x;
	} else {
		position.x = oldPosition.x;
	}
	if (map.renderer.bounds.size.y/2 > Mathf.Abs(position.y)) {	
		_transform.position.y = position.y;
	} else {
		position.y = oldPosition.y;
	}

	zedAnimator.SetFloat("speed", Mathf.Max(absMoveSpeedX, absMoveSpeedY));
	
	
	/*
	 * Rotation
	 */
	 
	// getting the mouse position relative to the world
	var mouseScreenPosition : Vector3 = Input.mousePosition;
	mouseScreenPosition.z = transform.position.z - Camera.main.transform.position.z;
	var mouseWorldPosition : Vector3 = Camera.main.ScreenToWorldPoint(mouseScreenPosition);
	
	var positionDifference : Vector3 = mouseWorldPosition - transform.position;
	rotation = Mathf.Rad2Deg*Mathf.Atan2(positionDifference.y, positionDifference.x);
	
	transform.eulerAngles = new Vector3(0, 0, rotation);
}

function getDirection() : Vector2 {
	return new Vector2(Mathf.Cos(Mathf.Deg2Rad*rotation), 
			Mathf.Sin(Mathf.Deg2Rad*rotation));
}

function getPosition() : Vector3 {
	return position;
}