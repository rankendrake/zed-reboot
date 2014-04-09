#pragma strict

var circleCollider : CircleCollider2D;
var zombieBehaviour : ZombieBehaviour;


function Start() {
//	zombieBehaviour = transform.parent.GetComponent<ZombieBehaviour>();
	circleCollider.radius = zombieBehaviour.getTargetVisualRange();
}

function Update() {
	transform.position = transform.parent.position;
	transform.rotation = transform.parent.rotation;
}

function OnTriggerEnter2D(otherCollider : Collider2D) {
	if(zombieBehaviour.getTarget() == null && otherCollider.gameObject.name.CompareTo("zed") == 0) {
		zombieBehaviour.setTarget(otherCollider.gameObject);
	}
}