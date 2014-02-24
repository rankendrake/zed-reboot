#pragma strict

var sprites : Sprite[];
var fps : float;

@HideInInspector
var mover : ZombieMover;

@HideInInspector
var spriteRenderer : SpriteRenderer;

@HideInInspector
var standingFrames : int;

@HideInInspector
var walkingFrames : int;

function Start () {
	spriteRenderer = renderer as SpriteRenderer;
	mover = GetComponent(ZombieMover);
	
	standingFrames = 4;
	walkingFrames = 8;
}

function Update () {
	var index : int = Time.timeSinceLevelLoad * fps;	
	if (mover.standing) {
		index = index % standingFrames;
		spriteRenderer.sprite = sprites[index];
	} else {	
		index = index % walkingFrames;
		spriteRenderer.sprite = sprites[index + standingFrames];
	}
}