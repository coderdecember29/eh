img = "";
status = "";
objects = [];

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
video.size(380, 380);
video.hide();
    

}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status: detecting objects";
}

function draw(){
    image(video, 0, 0, 640, 420);


    if (status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "status: baby detected";
            document.getElementById("number_of_object").innerHTML = "baby detected" + objects.length;
            fill("#ff0000");
            fill(r,g,b)
            percant = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percant + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y, objects[i].width, objects[i].height);
            if(objects < 1)
            {
            playSound = "police-siren-21498";
            }
        }
    }
    
}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;
    
}

function gotResult(error, results){
    if (error){
        console.log(error);  
    }
    console.log(results);
    objects = results;
}