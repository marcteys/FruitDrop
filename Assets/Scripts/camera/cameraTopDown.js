#pragma strict

var height = 20.0;

var distance = 15.0;

var target : Transform;

 

function Update () {

transform.position = target.position;

        transform.position.y += height;

        transform.position.z -= distance;

        transform.LookAt(target.position);

}