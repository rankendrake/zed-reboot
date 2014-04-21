/*
 * Holds within general functions for mainly maths calculations for all scripts.
 */

#pragma strict

class ZedUtils {

	static function proportionallyAdjustAngle(actual : float, 
			target : float, weight : float) : float {
		actual = actual % 360;
		target = target % 360;
		
		var difference : float = target - actual;
		if (difference > 180) difference -= 360;
		if (difference <= -180) difference += 360;
		
		return actual + weight*difference;
	}

	static function linearlyAdjustAngle(actual : float, 
			target : float, adjustmentAmount : float) : float {
		actual = actual % 360;
		target = target % 360;
		
		var difference : float = target - actual;
		if (difference > 180) difference -= 360;
		if (difference <= -180) difference += 360;
		
		if (Mathf.Abs(difference) < adjustmentAmount) {
			return (target % 360);
		} else {
			return ((actual + adjustmentAmount*Mathf.Sign(difference)) % 360);
		}
	}
	
	/*
	 * Returns shortest angle difference considering 360 deg = 0 deg.
	 * Result in the range (-180, 180]
	 */
	static function getAngularDistance(from : float, to : float) : float {
		from = from % 360;
		to = to % 360;
		
		var difference : float = to - from;
		if (difference > 180) difference -= 360;
		if (difference <= -180) difference += 360;
		
		return difference;
	}

	/**
	 *	Uses positions to calculate angle between
	 */
	 static function getAngle(from : Vector3, to : Vector3) : float {
	 	return Mathf.Rad2Deg*Mathf.Atan2(to.y - from.y, to.x - from.x);
	 }

	/**
	 *	Rotates a vector by Euler angles
	 */
	static function rotateVector(v : Vector2, a : float) : Vector2 {
		var out : Vector2 = new Vector2();
		var aRad : float = Mathf.Deg2Rad*a;
		out.x = v.x*Mathf.Cos(aRad) - v.y*Mathf.Sin(aRad);
		out.y = v.x*Mathf.Sin(aRad) + v.y*Mathf.Cos(aRad);
		return out;
	}
}