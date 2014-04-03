#pragma strict

function Start () {
}

function OnTriggerEnter2D(otherCollider : Collider2D) {
	Debug.Log("Collides!");
	if(otherCollider.gameObject.name.Equals("LeaderZombie")) {
		if(transform.parent.GetComponent(PackZombieBehaviour).currentLeader == null)
			transform.parent.GetComponent(PackZombieBehaviour).currentLeader = otherCollider.gameObject;
	}
}