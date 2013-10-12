
public var smooth: int; // Determines how quickly object moves towards position
public var minDist:float = 1;
public var speed: float = 60;

public var collisionDetect : boolean = false;
private var targetPosition: Vector3;
private var dist:float;


//increase speed over time to make a fun game !!

//create a booster value


// plus on reste apuyé plus ça va vite ! Fire un starter au début du mouse boutton appuyé et l'enlever au mouse relaché




function Update() {


if(!collisionDetect) {
	//mouse pressed
	if (Input.GetMouseButton(0) ) {
		var playerPlane = new Plane(Vector3.up, transform.position);
		var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		var hitdist = 0.0;
		
		if (playerPlane.Raycast(ray, hitdist)) {
		
			//if too near, do nothing
			dist = Vector3.Distance(ray.GetPoint(hitdist), transform.position);
			if(dist < minDist) {
				return false;
			}

			var targetPoint = ray.GetPoint(hitdist);
			targetPosition = ray.GetPoint(hitdist);
			targetPosition.y = 0;
			var targetRotation = Quaternion.LookRotation(targetPoint - transform.position);
			transform.rotation = targetRotation;
		}
	}
	if (Input.GetMouseButtonDown(0) ) {
		//debut compteur vitesse
	} else if (Input.GetMouseButtonUp(0) ) {
		//fin compteur vitesse
	}

	
	//convert distance from single to float

	
	var dir: Vector3 = targetPosition - transform.position;
	var dist: float = dir.magnitude;
	var move: float = speed * Time.deltaTime;
	
	
	if (dist > move ) {
		transform.position += dir.normalized * move;
	} else {
		transform.position = targetPosition;
	}
	
	
		transform.position = Vector3.Lerp (transform.position, targetPosition, Time.deltaTime * speed);  
		//transform.position += (targetPosition - transform.position).normalized * speed * Time.deltaTime;



	//faire en sorte que quand le clic est maintenu, plus la distance est proch plus le camion ralenti (que quand le clic est maintenau ! )
	

	} // fin pas collision
	else {
		Debug.Log('collision');
	}
}

function OnCollisionEnter(collision : Collision) {
		// Debug-draw all contact points and normals
		
		if(collision.gameObject.name == "mur") {
			//collisionDetect = true;
		}
	Debug.Log(collision.gameObject.name);
	
}




//faire trigger pour detection de murs !

