#pragma strict

// desired moving state 
// set by AI
private var targetAngle : float; // [deg]
private var targetSpeed : float; // [units/sec]

private var actualAngle : float; // [deg]
private var actualSpeed : float; // [units/sec]

private var upperBodyAngle : float; // [deg]

var turningSpeed : float; // [deg/sec]
var upperBodyTurningSpeed : float; // [deg/sec]
var walkingSpeed : float; // [units/sec]
var walkingAcceleration : float; // approx. [units/sec^2]
var walkingResistance : float;   // approx. [units/sec^2]

var reactionTime : float; // sec
var headReactionTime : float; // sec
var reactionTimerAccuracy : int; // number of intermediate steps

private var animator : Animator;
var animatorSpeedFactor = 1.0; // animator.speed/actualSpeed


var spriteContainer : GameObject;
/*
var armLeft : Transform;
var armRight : Transform;
var head: Transform;
var torso: Transform;

private var delayedTargetAngle : ReactionTimer;
private var delayedHeadAngle : ReactionTimer;
*/
function Start () {
	spriteContainer = gameObject;
	animator = spriteContainer.GetComponent(Animator);
/*
	delayedTargetAngle = new ReactionTimer(reactionTime, reactionTimerAccuracy, 0);
	delayedHeadAngle = new ReactionTimer(headReactionTime, reactionTimerAccuracy, 0);
*/
}

function Update () {
	
	updateActualAngle();
	updateActualSpeed();
	
//	updateBodyPartAngles();
	
	updatePosition();
	
	animator.SetFloat("speed", actualSpeed);
	//animator.speed = animatorSpeedFactor*actualSpeed; 
}

function updateTargetAngle(direction : float) {
/*	// getting the mouse position relative to the world
	var mouseScreenPosition : Vector3 = Input.mousePosition;
	mouseScreenPosition.z = transform.position.z - Camera.main.transform.position.z;
	var mouseWorldPosition : Vector3 = Camera.main.ScreenToWorldPoint(mouseScreenPosition);
	
	var positionDifference : Vector3 = mouseWorldPosition - transform.position;
	targetAngle = Mathf.Rad2Deg*Mathf.Atan2(-positionDifference.x, positionDifference.y);
		
	delayedTargetAngle.putValue(targetAngle);
	delayedHeadAngle.putValue(targetAngle);
	
	targetAngle = delayedTargetAngle.getValue();
	*/
	
	// AI updates the target angle here.
	targetAngle = direction;
}

function updateTargetSpeed(speed : float) {
	// to do: walking, running, rage?	
	targetSpeed = speed;
}

function bulletSlowdown(percentageSlowdown : float) {
	actualSpeed *= (100 - percentageSlowdown)/100;
}

function updateActualAngle() {
	actualAngle = ZedUtils.linearlyAdjustAngle(actualAngle, targetAngle, turningSpeed*Time.deltaTime);
	transform.eulerAngles = new Vector3(0, 0, actualAngle);
}

function updateActualSpeed() {
	if (actualSpeed < targetSpeed) {
		// if walking...
		actualSpeed = Mathf.Min(actualSpeed + walkingAcceleration*Time.deltaTime, targetSpeed);
	} else if (actualSpeed > targetSpeed) {
		actualSpeed = Mathf.Max(actualSpeed - walkingResistance*Time.deltaTime, targetSpeed);
	}
}
/*
function updateBodyPartAngles() {
	upperBodyAngle = ZedUtils.linearlyAdjustAngle(upperBodyAngle, actualAngle, upperBodyTurningSpeed*Time.deltaTime);
	var upperBodyEulerAngles : Vector3 = new Vector3(0, 0, upperBodyAngle);
	
	
	if (armLeft != null) armLeft.eulerAngles = upperBodyEulerAngles;
	if (armRight != null) armRight.eulerAngles = upperBodyEulerAngles;
	if (head != null) {
		head.eulerAngles = new Vector3(0, 0, delayedHeadAngle.getValue());
	}
	if (torso != null) torso.eulerAngles = upperBodyEulerAngles;
}
*/
function updatePosition() {
	transform.Translate(0, actualSpeed*Time.deltaTime, 0);
}

function physicalPush(pushImpulse : Vector2) {
	// freeze position of upper body
	upperBodyAngle = actualAngle;
	
	var actualVelocity : Vector2 = new Vector2(
			-actualSpeed*Mathf.Sin(Mathf.Deg2Rad*actualAngle),
			 actualSpeed*Mathf.Cos(Mathf.Deg2Rad*actualAngle));
	
	// push
	actualVelocity += pushImpulse;

	actualSpeed = Mathf.Sqrt(actualVelocity.x*actualVelocity.x + actualVelocity.y*actualVelocity.y); 
	var newAngle : float = Mathf.Rad2Deg*Mathf.Atan2(-actualVelocity.x, actualVelocity.y);
	if (Mathf.Abs(newAngle - actualAngle) > 90) {
		newAngle = newAngle + 180;
		actualSpeed = -actualSpeed;
	}	
	actualAngle = (newAngle % 360);
}