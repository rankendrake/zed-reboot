#pragma strict

var BulletDestroyerScript : BulletDestroyer;
var attr : WeaponAttributes;

@HideInInspector
var animator : Animator;

function Start() {
	animator = gameObject.GetComponent(Animator);
	attr = GetComponent("WeaponAttributes") as WeaponAttributes;
}

function OnTriggerEnter2D(otherCollider : Collider2D) {
	if (otherCollider.gameObject.tag.Equals("bullet")) {
		otherCollider.gameObject.tag = "doomed";
		
		gameObject.GetComponent(ZombieHealthController).reduceHealth(attr.getDamage());
	}
}