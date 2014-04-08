#pragma strict

var packZombieBehaviour : PackZombieBehaviour;
var circleCollider : CircleCollider2D;

function Start() {
	packZombieBehaviour = transform.parent.GetComponent(PackZombieBehaviour) as PackZombieBehaviour;
	circleCollider.radius = packZombieBehaviour.leaderDetectionRange;
	transform.position = transform.parent.position;
}

function Update() {
	transform.position = transform.parent.position;
	transform.rotation = transform.parent.rotation;
}

function OnTriggerEnter2D(otherCollider : Collider2D) {
	if(packZombieBehaviour.leader == null && otherCollider.gameObject.name.CompareTo("LeaderZombie") == 0) {
		packZombieBehaviour.setLeader(otherCollider.gameObject);
	}
	if(packZombieBehaviour.getTarget() == null && otherCollider.gameObject.name.CompareTo("zed") == 0) {
		packZombieBehaviour.target = otherCollider.gameObject;
	}
}