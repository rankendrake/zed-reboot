#pragma strict

function Update () {
   var angle : float = transform.eulerAngles.z;
   var laserSightDirection : Vector2 = new Vector2(Mathf.Cos(Mathf.Deg2Rad * angle), Mathf.Sin(Mathf.Deg2Rad * angle));

   var hit : RaycastHit2D = Physics2D.Raycast(transform.position, laserSightDirection);
   if (hit.rigidbody != null) {
   		Debug.DrawLine(transform.position, hit.point, Color.red);
   } else {
		var mouseScreenPosition : Vector3 = Input.mousePosition;
		mouseScreenPosition.z = transform.position.z - Camera.main.transform.position.z;
		var mouseWorldPosition : Vector3 = Camera.main.ScreenToWorldPoint(mouseScreenPosition);
   		Debug.DrawLine(transform.position, mouseWorldPosition, Color.red);
   }
}