#pragma strict

var pushImpulse : float;
var maxNumberHandledColliders : int;

private var collidingObjects : GameObject[];
private var collidingMovementComponents : ZombieMovement[];
private var currentNumberHandledColliders : int;

private var _transform : Transform;

function Awake() {
	_transform = transform;
	collidingObjects = new GameObject[maxNumberHandledColliders];
	collidingMovementComponents = new ZombieMovement[maxNumberHandledColliders];
}


function FixedUpdate () {
	//transform.localPosition = new Vector3(0,0,-1);
	
	if (currentNumberHandledColliders > 0) {
		for (var i : int; i < currentNumberHandledColliders; i++) {
			var difference : Vector3 = collidingObjects[i].transform.position - _transform.position;
			difference.z = 0;
			collidingMovementComponents[i].physicalPush(pushImpulse*(new Vector2(difference.x, difference.y)).normalized);
		}
	}
}


function OnTriggerEnter2D(other : Collider2D) {
	var otherRootObject = other.transform.root.gameObject;
	// ignore collisions with own colliders
	if (otherRootObject == transform.root.gameObject) {
		return;
	}
	
	if (other.gameObject.CompareTag("collisionDetector") && (otherRootObject.CompareTag("zombie"))) {
		if (currentNumberHandledColliders < maxNumberHandledColliders) {
			collidingObjects[currentNumberHandledColliders] = otherRootObject;
			collidingMovementComponents[currentNumberHandledColliders] = otherRootObject.GetComponent(ZombieMovement);
			currentNumberHandledColliders++;
		}
	}	
}

function OnTriggerExit2D(other : Collider2D) {
	var otherRootObject = other.transform.root.gameObject;
	// look for matches	
	for (var i : int; i < currentNumberHandledColliders; i++) {
		if (otherRootObject == collidingObjects[i]) {
			for (var j : int = i; j < currentNumberHandledColliders-1; j++) {
				collidingObjects[j] = collidingObjects[j+1];
				collidingMovementComponents[j] = collidingMovementComponents[j+1];
			}
			collidingObjects[currentNumberHandledColliders-1] = null;
			collidingMovementComponents[currentNumberHandledColliders-1] = null;
			currentNumberHandledColliders--;
			break;			
		}
	}
}