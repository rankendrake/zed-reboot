#pragma strict
var upperBody : GameObject;
var zedResources : ZedResources;

var maxSpeed : float;
var acceleration : float;
var deceleration : float;
var angularSpeed : float;
var upperBodyAngularSpeed : float;
var zedAnimator : Animator;
var animatorSpeedFactor : float;
var map : GameObject;

private var actualSpeed : float;
private var targetSpeed : float;

private var actualAngle : float;
private var targetAngle : float;

private var upperBodyTargetAngle : float;
private var upperBodyActualAngle : float;

private var accelerating : boolean;

private var _transform : Transform;

function Start() {
	// caching the Transform
	_transform = transform;
}

function Update () {
	updateMovingState();
	rotateUpperBody();
	updateTransform();
	notifyAnimator();
}

private function updateMovingState() {	
	var axes : Vector2 = new Vector2(Input.GetAxis("Horizontal"), Input.GetAxis("Vertical"));
		
	targetSpeed = maxSpeed*Mathf.Min(axes.magnitude, 1.0);
	targetAngle = Mathf.Rad2Deg*Mathf.Atan2(axes.y, axes.x);
	
	var currentAcceleration : float = acceleration*Time.deltaTime;
	
	// modification by perks
	var activeMovementPerks : List.<MovementPerk> = zedResources.activePerks.getMovementPerks();
	for (var perk : MovementPerk in activeMovementPerks) {
		targetSpeed = targetSpeed * perk.getSpeedMultiplier();
		currentAcceleration = currentAcceleration * perk.getAccelerationMultiplier();
	}

	// Slow down if no keys pressed
	if (Mathf.Approximately(targetSpeed, 0)) {
		var currentDeceleration : float = deceleration*Time.deltaTime;
		if (Mathf.Abs(actualSpeed) > currentDeceleration) {
			actualSpeed -= currentDeceleration;
		} else {
			actualSpeed = 0;
		}
		
	// Accelerate
	} else {	
		var angleDifference = ZedUtils.getAngularDistance(actualAngle, targetAngle);
		actualAngle = ZedUtils.linearlyAdjustAngle(actualAngle, targetAngle, angularSpeed*Time.deltaTime);

		 
		var speedDifference = targetSpeed - actualSpeed;
		if (Mathf.Abs(speedDifference) > currentAcceleration) {
			actualSpeed += currentAcceleration*Mathf.Sign(speedDifference) ;
		} else {
			actualSpeed = targetSpeed;
		}
	}
}

function rotateUpperBody() {
	// getting the mouse position relative to the world
	var mouseScreenPosition : Vector3 = Input.mousePosition;
	mouseScreenPosition.z = transform.position.z - Camera.main.transform.position.z;
	var mouseWorldPosition : Vector3 = Camera.main.ScreenToWorldPoint(mouseScreenPosition);
	
	var positionDifference : Vector3 = mouseWorldPosition - transform.position;
	
	upperBodyTargetAngle = Mathf.Rad2Deg*Mathf.Atan2(positionDifference.y, positionDifference.x);
	upperBodyActualAngle = ZedUtils.proportionallyAdjustAngle(upperBodyActualAngle,
			upperBodyTargetAngle, upperBodyAngularSpeed*Time.deltaTime);
	
	upperBody.transform.eulerAngles = new Vector3(0, 0, upperBodyActualAngle+90);
}

function getUpperBodyAngle() {
	return upperBodyActualAngle;
}

private function updateTransform() {
	_transform.rotation.eulerAngles = new Vector3(0, 0, actualAngle);
	var currentSpeed = Time.deltaTime*actualSpeed;
	_transform.position += _transform.right*currentSpeed;
}

private function notifyAnimator(){
	zedAnimator.speed = animatorSpeedFactor*actualSpeed;
	zedAnimator.SetFloat("speed", actualSpeed);
}

function getDirection() : Vector2 {
	return new Vector2(Mathf.Cos(Mathf.Deg2Rad*actualAngle), 
			Mathf.Sin(Mathf.Deg2Rad*actualAngle));
}

function getAngle() : float {
	return actualAngle;
}

function getPosition() : Vector3 {
	return _transform.position;
}