#pragma strict

var backgroundSpriteRenderer : SpriteRenderer;
static var zombieZCoordinate : float;
static var mapBounds : Bounds;
static var topBound : float;
static var bottomBound : float;
static var leftBound : float;
static var rightBound : float;


function Awake () {
	mapBounds = backgroundSpriteRenderer.bounds;
	topBound = mapBounds.max.y;
	bottomBound = mapBounds.min.y;
	leftBound = mapBounds.min.x;
	rightBound = mapBounds.max.x;
}