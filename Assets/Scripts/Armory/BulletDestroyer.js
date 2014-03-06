#pragma strict

/*
 * If a bullet gets tagged "doomed",
 * destroy it immediately.
 */

function Update() {
	if (tag == "doomed") {
		Destroy(gameObject);
	}
}