#pragma strict

var cursorTexture : Texture2D;
var cursorMode : CursorMode = CursorMode.Auto;
var hotSpot : Vector2 = Vector2.zero;

function OnGUI() {
	Cursor.SetCursor(cursorTexture, hotSpot, cursorMode);
}

function OnMouseExit() {
	Cursor.SetCursor(null, Vector2.zero, cursorMode);
}