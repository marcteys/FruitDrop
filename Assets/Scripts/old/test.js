var dir : Vector3;
var hit : RaycastHit ;
var rot = 0;
var k : Vector3;
var speed : float = 10.0;
var gravity : float = 5.0;
 
 
private var yourCharacterController : CharacterController;
private var destinationdistance;
function Start() {
  yourCharacterController = GetComponent(CharacterController);
}
 
function FixedUpdate()
{       
	

if (Input.GetMouseButton(0))
    {
        var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
        Physics.Raycast(Camera.main.transform.position,ray.direction,hit,1000);
		hit.point.y = transform.position.y;
        dir = hit.point - transform.position;
 
        var angle = Vector3.Angle(dir, transform.forward);
        var k = Vector3.Cross(transform.forward, dir);
        k.Normalize();
 
        rot = k[1]*(angle*2.5);
 
        transform.Rotate(Vector3.up*rot*Time.deltaTime*5);
        yourCharacterController.Move(dir.normalized * Time.deltaTime * speed);
    //    print ("Transform Pos" + transform.position + "Dir" + dir.normalized + "Hitpoint" + hit.point);
 
    }
else
    {
        // if not at clicked location continue moving there
        if (transform.position != hit.point )
        {
            dir = hit.point - transform.position;
 
 			//destinationDistance = Vector3.Distance(hit.point, transform.position);

			Debug.Log(destinationdistance);


            angle = Vector3.Angle(dir, transform.forward);
            k = Vector3.Cross(transform.forward, dir);
            k.Normalize();
 
            rot = k[1]*(angle*2.5);
 
            transform.Rotate(Vector3.up*rot*Time.deltaTime*5);
            yourCharacterController.Move(dir.normalized * Time.deltaTime * speed);
         //   print ("Transform Pos" + transform.position + "Dir" + dir.normalized + "Hitpoint" + hit.point);
 
        }
    }
} 
 
function OnControllerColliderHit(collision: ControllerColliderHit) {
    if (collision.transform.tag != "ground") {
        transform.position.y -= gravity * Time.deltaTime;
    }
}