#pragma strict
var lineRenderer : LineRenderer; 

function Start() {
	lineRenderer = GetComponent(LineRenderer);
}

function Update () {
   var angle : float = transform.eulerAngles.z;
   var laserSightDirection : Vector2 = new Vector2(Mathf.Cos(Mathf.Deg2Rad * angle), Mathf.Sin(Mathf.Deg2Rad * angle));

   var hit : RaycastHit2D = Physics2D.Raycast(transform.position, laserSightDirection);
   if (hit.rigidbody != null) {
   		lineRenderer.SetPosition(0, transform.position);
   		lineRenderer.SetPosition(1, hit.point);
   } else {
		var mouseScreenPosition : Vector3 = Input.mousePosition;
		mouseScreenPosition.z = transform.position.z - Camera.main.transform.position.z;
		var mouseWorldPosition : Vector3 = Camera.main.ScreenToWorldPoint(mouseScreenPosition);
		
		lineRenderer.SetPosition(0, transform.position);
   		lineRenderer.SetPosition(1, mouseWorldPosition);
   }
}