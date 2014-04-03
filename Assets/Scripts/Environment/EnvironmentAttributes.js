#pragma strict

var backgroundSpriteRenderer : SpriteRenderer;
static var mapBounds : Bounds;

function Start () {
	mapBounds = backgroundSpriteRenderer.bounds;
}

