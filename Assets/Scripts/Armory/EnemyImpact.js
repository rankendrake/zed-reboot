#pragma strict

var BulletDestroyerScript : BulletDestroyer;
var Dmg : float;

@HideInInspector
var animator : Animator;

function Start() {
	animator = gameObject.GetComponent(Animator);
}

function OnTriggerEnter2D(otherCollider : Collider2D) {
	if (otherCollider.gameObject.tag.Equals("zombie")) {
		this.tag = "doomed";
		otherCollider.gameObject.GetComponent(ZombieHealthController).reduceHealth(Dmg);
	}
}