#pragma strict

class MeleeWeapon extends Weapon {
	private var weaponAnimator : Animator;
	var power : int;
	
	private var zedTransform : Transform;
	private var zedMovement : ZedMovement;
	
	
	private var strikeStartTime : float;
	
	private var swordAngleData : float[]; // 3xn array: 
									 // first column: time
									 // second column: angle
									 // third column: length
	private var swordAngleDataPointCount : int;
	
	function MeleeWeapon(
			power : int,
			id : String,
			zed : GameObject) {

		this.power = power;
		this.id = id;
		this.zed = zed;	
		zedMovement = zed.GetComponent(ZedMovement);
		if (zedMovement == null) {
			Debug.Log("Error in MeleeWeapon-Constructor. ZedMovement-script not found!");
		}			
		
		zedTransform = zed.transform;
	}

	// @Override
	function strike() : boolean {
		strikeStartTime = Time.time;
		return true;
	}

	// @Override
	function secondaryStrike() {
		//Debug.Log("attack with melee weapon. power = " + power);

	}

	// @Override
	function getClipSize() : int {
		return 0; // 0 is melee
	}
	
	function initSwordAngleData(data : float[]) {
		swordAngleData = data;
		if ((swordAngleData.Length % 3) != 0) {
			Debug.Log("Error in Sword.initSwordAngleData: numer of array entries must be multiple of 3!");
		}
		swordAngleDataPointCount = swordAngleData.Length/3;
	}
	
	function executeStrike() {
		var currentStrikeTime = Time.time - strikeStartTime;
		
		// find current length and angle
		if (swordAngleData == null) {
			Debug.Log("error in Sword.executeStirke(): no sword angle data found!"); 
			return;
		}
		var angleDataIndex : int = 0;
		var differenceAfter : float;
		var frameTime : float;
		var currentAngle : float;
		var currentLength : float ;
		for (var i : int = 0; i < swordAngleDataPointCount; i++) {
			if (currentStrikeTime > swordAngleData[3*i]) {
				angleDataIndex = i;
			} else break;
		}
		if (angleDataIndex < swordAngleDataPointCount - 1) {
			differenceAfter = currentStrikeTime - swordAngleData[3*angleDataIndex];
			frameTime = swordAngleData[3*(angleDataIndex + 1)] - swordAngleData[3*angleDataIndex];
			var weight : float = differenceAfter/frameTime;
			Debug.Log(weight);
			currentAngle = zedMovement.getUpperBodyAngle() 
					+ (1 - weight)*swordAngleData[3*angleDataIndex + 1]
					+ (weight)*swordAngleData[3*angleDataIndex + 4];
			currentLength = (1 - weight)*swordAngleData[3*angleDataIndex + 2]
					+ (weight)*swordAngleData[3*angleDataIndex + 5];
		} else {
			currentAngle  = zedMovement.getUpperBodyAngle() + swordAngleData[3*angleDataIndex + 1];
			currentLength = swordAngleData[3*angleDataIndex + 2];
		}
	
		var currentDirection : Vector2 = new Vector2(Mathf.Cos(Mathf.Deg2Rad*currentAngle),
				Mathf.Sin(Mathf.Deg2Rad*currentAngle));
			
		Debug.DrawLine(zedTransform.position, zedTransform.position + currentDirection*currentLength, Color.cyan);	
		var hit : RaycastHit2D[] = Physics2D.RaycastAll(zedTransform.position, currentDirection, currentLength);

	
		for (var h : RaycastHit2D in hit) {
			if (h.rigidbody != null && h.transform.gameObject.CompareTag("zombie")) {
				h.transform.gameObject.GetComponent(ZombieImpact).swordImpact(power);
			}
		}			
	} 
}