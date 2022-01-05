song = "";
satisfya = "";

scoreLeftWrist=0;
scoreRighttWrist=0;

leftWristX=0;
leftWristY=0;

rightWristX=0;
leftWristY=0;

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function preload()
{
  song = loadSound("music.mp3");
  satisfya = loadSound("satisfya.mp3");
}

function draw()
{
    image(video,0,0,600,530);

    fill("#37ff00");
    stroke("#ff0000");

    song_harry = song.isPlaying();
    console.log("Harry Potter Theme Song = " + song_harry );

    song_satisfya = satisfya.isPlaying();
    console.log("Satisfya = " + song_satisfya);

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX,leftWristY,20);
        satisfya.stop();
        if(song_satisfya == false)
        {
           satisfya.play();
        }
        else
        {
            document.getElementById("song_id").innerHTML = "Song Name: Satisfya";
        }
    }

    if(scoreRighttWrist > 0.2)
    {
        circle(leftWristX,leftWristY,20);
        song.stop();
        if(song_harry == false)
        {
           song.play();
        }
        else
        {
            document.getElementById("song_id").innerHTML = "Song Name: Harry Potter Theme Song";
        }
    }
}

function modelLoaded()
{
    console.log('PoseNet is Initialized');
}

function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        scoreRightWrist=results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scoreRightWrist);

        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
         
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = "+ rightWristY);

    }
}

 function modelLoaded()      
 {
     console.log('PoseNet is Initialized');
 }
   
    function play()
    {
        song.play();
        song.setVolume(1);
        song.rate(1);
    }