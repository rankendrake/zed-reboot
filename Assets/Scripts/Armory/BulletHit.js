#pragma strict

var BulletDestroyerScript : BulletDestroyer;

@HideInInspector
var animator : Animator;

function Start() {
	animator = gameObject.GetComponent(Animator);
}

function OnTriggerEnter2D(otherCollider : Collider2D) {
	if (otherCollider.gameObject.tag.Equals("bullet")) {
		otherCollider.gameObject.tag = "doomed";
		
		gameObject.GetComponent(ZombieHealthController).reduceHealth(20);
	}
}