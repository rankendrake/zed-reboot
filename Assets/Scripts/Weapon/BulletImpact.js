#pragma strict

private var bulletProperties : BulletProperties;

function Start() {
	bulletProperties = transform.GetComponent(BulletProperties);
}

function OnTriggerEnter2D(otherCollider : Collider2D) {
	if (otherCollider.gameObject.tag.Equals("zombie") && transform.tag == "bullet") {
		//Debug.Log("Collides!");
		transform.tag = "doomedBullet";
	//	transform.position = otherCollider.gameObject.transform.position;
		otherCollider.gameObject.GetComponent(ZombieImpact).damage(bulletProperties.getPower());
	}
}