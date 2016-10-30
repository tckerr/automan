function CameraInputState(){
    this.right = false;
    this.left = false;
    this.down = false;
    this.up = false;
}

function InputState(){
    this.camera = new CameraInputState();
}

