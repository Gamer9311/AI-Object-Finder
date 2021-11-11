status = "";
objects = [];

function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects....";
    object = document.getElementById("object").value;
    console.log(object);
    objectDetector.detect(video, gotResult);
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
}

function gotResult(error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw()
{
    image(video, 0, 0, 480 ,380);

    if (status != "")
    {
        objectDetector.detect(video, gotResult);

        for (no = 0; no < objects.length; no++)
        {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects = " + objects.length;

            fill('#446CCF');
            percent = floor(objects[no].confidence * 100);
            text(objects[no].label + " " + percent + "%", objects[no].x + 15, objects[no].y + 15);
            noFill();
            stroke('#446CCF');
            rect(objects[no].x, objects[no].y, objects[no].width, objects[no].height);

            if (objects[no].label == object)
            {
                document.getElementById("status").innerHTML = object + " Found";

                video.stop();
                objectDetector.detect(gotResult);

                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(object + " Found");
                synth.speak(utterThis);
            }
            else
            {
                document.getElementById("status").innerHTML = object + " Not Found";
            }
        }
    }
}
