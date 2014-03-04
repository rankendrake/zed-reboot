#pragma strict

var BulletDestroyerScript : BulletDestroyer;
var attr : WepAttributes;

@HideInInspector
var animator : Animator;

function Start() {
	animator = gameObject.GetComponent(Animator);
	attr = GetComponent("WepAttributes") as WepAttributes;
}

function OnTriggerEnter2D(otherCollider : Collider2D) {
	if (otherCollider.gameObject.tag.Equals("bullet")) {
		otherCollider.gameObject.tag = "doomed";
		
		gameObject.GetComponent(ZombieHealthController).reduceHealth(attr.GetDmg());
	}
}