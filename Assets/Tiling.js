#pragma strict
var xScale : float;
var yScale : float;


function Start () {
	transform.renderer.material.mainTextureScale = new Vector2(xScale, yScale );
}
