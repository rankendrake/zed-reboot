#pragma strict

var backgroundSpriteRenderer : SpriteRenderer;
static var mapBounds : Bounds;

function Awake () {
	mapBounds = backgroundSpriteRenderer.bounds;
}