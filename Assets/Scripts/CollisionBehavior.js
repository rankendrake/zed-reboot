#pragma strict

var parentTransform : Transform;

var pushResponse : float = 1;
var pushStrength : float = 1;

var pushPerpendicular : boolean;

private var addedVelocity : Vector2;
private var _transform : Transform;

private var insideCounter : int;

function Awake() {
	_transform = transform;
}


function Update() {
	parentTransform.position += pushResponse*Time.deltaTime*(new Vector3(addedVelocity.x, addedVelocity.y, 0));
	addedVelocity = new Vector2(0,0);	
}


function OnTriggerStay2D(other : Collider2D) {
	if (other.gameObject.CompareTag("collisionDetector")) {
		insideCounter++;
		//	if (other.gameObject.CompareTag("collisionDetector")) {
		var otherCollisionBehavior = other.GetComponent(CollisionBehavior);
		
		if (otherCollisionBehavior == null) {
			Debug.LogError(other.transform.root.name + " has physics collider child without CollisionBehavior-Script attached!");
			return;
		}
		var positionDifference : Vector3 = otherCollisionBehavior.getPosition() - _transform.position;
		positionDifference.z = 0;
		positionDifference = positionDifference.normalized;
		var currentPushStrength = pushStrength;
		var pushImpulse : Vector2;
		if (!pushPerpendicular) {		
			pushImpulse = currentPushStrength*(new Vector2(positionDifference.x, positionDifference.y));
		} else {
			var pushDirection : float = Mathf.Sign(Vector3.Cross(parentTransform.right, positionDifference).z);
			pushImpulse = currentPushStrength*pushDirection*parentTransform.up;
		}
		otherCollisionBehavior.physicalPush(pushImpulse);		
	}
}

function physicalPush(impulse : Vector2) {
	addedVelocity += impulse;
}

function getPosition() : Vector3 {
	return _transform.position;
}