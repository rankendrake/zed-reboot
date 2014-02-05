#pragma strict

var sprites : Sprite[];
var fps : float;

@HideInInspector
var spriteRenderer : SpriteRenderer;

function Start () {
	spriteRenderer = renderer as SpriteRenderer;
}

function Update () {
	var index : int = Time.timeSinceLevelLoad * fps;
	index = index % sprites.Length;
	spriteRenderer.sprite = sprites[index];
}