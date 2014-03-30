#pragma strict

function Start() {
	var anim : Animator = GetComponent(Animator);
	anim.SetLayerWeight(1, 1);
}