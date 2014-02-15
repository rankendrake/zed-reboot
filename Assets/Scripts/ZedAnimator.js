#pragma strict

var sprites : Sprite[];
var fps : float;

@HideInInspector
var mover : ZedMover;

@HideInInspector
var spriteRenderer : SpriteRenderer;

function Start () {
	spriteRenderer = renderer as SpriteRenderer;
	mover = GetComponent(ZedMover);
}

function Update () {
	if (mover.standing) {
		spriteRenderer.sprite = sprites[0];
	} else {
		var index : int = Time.timeSinceLevelLoad * fps;
		index = index % sprites.Length;
		spriteRenderer.sprite = sprites[index];
	}
}