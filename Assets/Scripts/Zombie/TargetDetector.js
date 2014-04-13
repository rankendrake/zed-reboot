#pragma strict

var circleCollider : CircleCollider2D;
var zombieBehaviour : ZombieBehaviour;


function Start() {
	circleCollider = transform.GetComponent(CircleCollider2D);
	zombieBehaviour = transform.parent.GetComponent(ZombieBehaviour);
	circleCollider.radius = zombieBehaviour.getTargetVisualRange();
	transform.position = transform.parent.position;
	transform.rotation = transform.parent.rotation;
}

function Update() {
	transform.position = transform.parent.position;
	transform.rotation = transform.parent.rotation;
}

function OnTriggerEnter2D(otherCollider : Collider2D) {
	if(zombieBehaviour.getTarget() == null) {
		if(otherCollider.gameObject.name.CompareTo("zed") == 0) {
			zombieBehaviour.setTarget(otherCollider.gameObject);
		}
		if(otherCollider.gameObject.CompareTag("turret")) {
			zombieBehaviour.setTarget(otherCollider.gameObject);
		}
	}
}