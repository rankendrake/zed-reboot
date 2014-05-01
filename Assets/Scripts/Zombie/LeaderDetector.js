#pragma strict

private var packZombieBehaviour : PackZombieBehaviour;
var circleCollider : CircleCollider2D;

/* Currently, only Pack Zombies implement this.
*  Script for detecting and assigning leaders within range of the Pack Zombie’s leader detection radius
*  to the Pack Zombie.
*/

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
	if(packZombieBehaviour.leader == null) {
		// If the other game object has a leader zombie behaviour, then it's a leader zombie.
		if(otherCollider.gameObject.GetComponent(LeaderZombieBehaviour) != null) {
			packZombieBehaviour.setLeader(otherCollider.gameObject);
		}
	}
}