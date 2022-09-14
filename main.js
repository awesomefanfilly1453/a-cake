song1="";
song2="";
leftWrist_x=0;
leftWrist_y=0;
rightWrist_x=0;
rightWrist_y=0;
leftWrist_score=0;
rightWrist_score=0;
song1_status="";
song2_status="";

function preload(){
  song1=loadSound("cake.mp3");  
song2=loadSound("music2.mp3");
}
function setup(){
    canvas=createCanvas(500,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    
    pose=ml5.poseNet(video,ModelLoaded);
pose.on("pose",GotPoses);
}
function play(){
    song.stop();
    song.play();
    song.rate(1);
    song.setVolume(1);
}
function ModelLoaded(){
    console.log("Model Loaded!");
}
function GotPoses(result,error){
if(error){
console.log(error);
}    
if (result.length>0){
    console.log(result);
    leftWrist_score=result[0].pose.keypoints[9].score;
    rightWrist_score=result[0].pose.keypoints[10].score;
    
    leftWrist_x=result[0].pose.leftWrist.x;
      leftWrist_y=result[0].pose.leftWrist.y;
    
    rightWrist_x=result[0].pose.rightWrist.x;
    rightWrist_y=result[0].pose.rightWrist.y;
}
}
function draw(){
image(video,0,0,500,500);

fill("#FF0000");
    stroke("#FF0000");
    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();
    
    if(rightWrist_score >0.2){
        circle(rightWrist_x,rightWrist_y,20);
        song2.stop();
        if (song1_status==false){
            song1.play();
            document.getElementById("song_name").innerHTML="Playing PonyTown 'Cake'";
        }
       }
    if (leftWrist_score>0.2){
        circle(leftWrist_x,leftWrist_y,20);
         song1.stop();
        if (song2_status==false){
            song2.play();
            document.getElementById("song_name").innerHTML="Playing Peter Pan";
        }
        
    
        
    }

}


