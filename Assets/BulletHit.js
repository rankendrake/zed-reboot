#pragma strict

var BulletDestroyerScript : BulletDestroyer;

function OnTriggerEnter2D(otherCollider : Collider2D) {
	if (otherCollider.gameObject.tag.Equals("bullet")) {
		otherCollider.gameObject.tag = "doomed";
	}
}