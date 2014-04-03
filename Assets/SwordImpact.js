﻿#pragma strict

var power : float; // temporary variable, should be taken from MeleeWeapon somehow?
var length : float;

function Start() {
}

function Update () {
   var angle : float = transform.eulerAngles.z;
   var direction : Vector2 = new Vector2(Mathf.Cos(Mathf.Deg2Rad * angle), Mathf.Sin(Mathf.Deg2Rad * angle));
   //Debug.Log(transform.position.ToString());
//   var anotherdirection : Vector3 = Vector3.zero;
//   anotherdirection.z = -1;
   // transform.position + direction * 100000
   var from : Vector3 = new Vector3(0.5, 0.5, -2);
   var to : Vector3 = new Vector3(-0.5, -0.2, -2);
   Debug.DrawLine(transform.position, transform.position + direction * length, Color.green, 0.1, false);
   var hit : RaycastHit2D[] = Physics2D.RaycastAll(transform.position, direction, length);
   if (hit.Length != 0) {
   		Debug.Log(hit[0].collider.transform.gameObject.name); 
   }
   
   for (var h : RaycastHit2D in hit) {
      if (h.rigidbody != null && h.transform.gameObject.CompareTag("zombie")) {
         h.transform.gameObject.GetComponent(ZombieImpact).damage(power);
      }
   }
 }