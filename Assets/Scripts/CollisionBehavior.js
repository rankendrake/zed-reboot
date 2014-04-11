#pragma strict


var pushResponse : float = 1;
var parentTransform : Transform;
var pushStrength : float = 1;
var pushIncreaseFactor : float = 2;
var colliderLeaveRadius : float = 1;

var pushPerpendicular : boolean;

private var addedVelocity : Vector2;
private var _transform : Transform;

var maximumHandledObjects : int;
private var overlappingObjects : CollisionBehavior[]; 
private var overlappingObjectsCount : int;
private var overlapStartTimes : float[];

function Awake() {
	_transform = transform;
	overlappingObjects = new CollisionBehavior[maximumHandledObjects];
	overlapStartTimes = new float[maximumHandledObjects];
}

function FixedUpdate () {
	_transform = parentTransform;
	
	// handle pushes on self
	parentTransform.position += pushResponse*Time.fixedDeltaTime*(new Vector3(addedVelocity.x, addedVelocity.y, 0));
	addedVelocity = new Vector2(0,0);	
	
	
	// give push to all others
	for (var i : int = 0; i < overlappingObjectsCount; i++) {	
		if (overlappingObjects[i] != null) {	
			var positionDifference : Vector3 = overlappingObjects[i].getPosition() - _transform.position;
			positionDifference.z = 0;
			if (positionDifference.magnitude > (colliderLeaveRadius + overlappingObjects[i].getColliderLeaveRadius())) {
				removeOverlappingObject(i);
			} else {	
				positionDifference = positionDifference.normalized;
				var overlapTime : float = Time.time - overlapStartTimes[i];
				var currentPushStrength = pushStrength*(1 - Mathf.Exp(-pushIncreaseFactor*overlapTime));
				var pushImpulse : Vector2;
				if (!pushPerpendicular) {		
					pushImpulse = currentPushStrength*(new Vector2(positionDifference.x, positionDifference.y));
				} else {
					var pushDirection : float = Mathf.Sign(Vector3.Cross(parentTransform.right, positionDifference).z);
					pushImpulse = currentPushStrength*pushDirection*parentTransform.up;
				}
				overlappingObjects[i].physicalPush(pushImpulse);
			}
		} else {
			removeOverlappingObject(i);
		}
	}	
}

function OnTriggerEnter2D(other : Collider2D) {
	if (other.gameObject.CompareTag("collisionDetector")) {
		var otherCollisionBehavior = other.GetComponent(CollisionBehavior);
		
		if (otherCollisionBehavior == null) {
			Debug.LogError(other.transform.root.name + " has physics collider child without CollisionBehavior-Script attached!");
			return;
		}
		if (overlappingObjectsCount < maximumHandledObjects) {
			overlappingObjects[overlappingObjectsCount] = otherCollisionBehavior;
			overlapStartTimes[overlappingObjectsCount] = Time.time;
			overlappingObjectsCount++;			
		}
	}
}
	

function OnTriggerExit2D(other : Collider2D) {
	if (other.gameObject.CompareTag("collisionDetector")) {
		var otherCollisionBehavior = other.GetComponent(CollisionBehavior);		
		if (otherCollisionBehavior == null) {
			Debug.LogError(other.transform.root.name + " has physics collider child without CollisionBehavior-Script attached!");
			return;
		}
		
		for (var i : int = 0; i < overlappingObjectsCount; i++) {
			if (overlappingObjects[i] == otherCollisionBehavior) {
				removeOverlappingObject(i);
			}
		}
	}
}

function removeOverlappingObject(index : int) {
	for (var j : int = index; j < overlappingObjectsCount-1; j++) {
		overlappingObjects[j] = overlappingObjects[j+1];
		overlapStartTimes[j] = overlapStartTimes[j+1];
	}
	overlappingObjects[overlappingObjectsCount-1] = null;
	overlapStartTimes[overlappingObjectsCount-1] = 0;
	overlappingObjectsCount--;
}

function physicalPush(impulse : Vector2) {
	addedVelocity += impulse;
}

function getPosition() : Vector3 {
	return _transform.position;
}

function getColliderLeaveRadius() : float {
	return colliderLeaveRadius;
}