#pragma strict

var backgroundSpriteRenderer : SpriteRenderer;
static var zombieZCoordinate : float;
static var mapBounds : Bounds;
static var topBound : float;
static var bottomBound : float;
static var leftBound : float;
static var rightBound : float;

static final var SWORD_INDEX : int = 0;
static final var SHOTGUN_INDEX : int = 1;
static final var ASSAULT_RIFLE_INDEX : int = 2;
static final var PISTOL_INDEX : int = 3;


function Awake () {
	mapBounds = backgroundSpriteRenderer.bounds;
	topBound = mapBounds.max.y;
	bottomBound = mapBounds.min.y;
	leftBound = mapBounds.min.x;
	rightBound = mapBounds.max.x;
}

function Update () {
	if(Time.deltaTime > 0.0) {
		Screen.showCursor = false;
	}
	else {
		Screen.showCursor = true;
	}
	if(GameObject.Find("zed").GetComponent(ZedResources).getHealth() == 0) {
		Screen.showCursor = true;
	}
}