function InputController($binding_element){
    this.$binding_element = $binding_element;
    this.input_state = new InputState();

    this.bindKeyboard();
}

InputController.prototype.bindKeyboard = function(){ 
    this._bindCamera("keydown", true, this.$binding_element);
    this._bindCamera("keyup", false, this.$binding_element);
}
 
InputController.prototype._bindCamera = function(event, state, $binding_element){
    var camera = this.input_state.camera;
    $binding_element.on(event, function(e){
        switch(e.keyCode){
            case BINDINGS.CAMERA_UP_KEYCODE:
                camera.up = state;
                break;
            case BINDINGS.CAMERA_LEFT_KEYCODE:
                camera.left = state;
                break;
            case BINDINGS.CAMERA_DOWN_KEYCODE:
                camera.down = state;
                break;
            case BINDINGS.CAMERA_RIGHT_KEYCODE:
                camera.right = state;
                break;
        }
    });
}