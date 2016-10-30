function Viewport(camera_input_state, existing_viewport){
    var current_point = existing_viewport ? new Vector(existing_viewport.x, existing_viewport.y) : this.getDefaultVector();   
    var delta_vector = this.getDeltaVector(camera_input_state, current_point)
    var absolute_delta = this.getModifiedDeltaVector(delta_vector);

    this.x = current_point.x + absolute_delta.x;
    this.y = current_point.y + absolute_delta.y;
}

Viewport.prototype.getDefaultVector = function(){
    return new Vector(0,0);
}

Viewport.prototype.getDeltaVector = function(camera_input_state){
    var vector = new Vector(0,0);
    if( camera_input_state.up )
        vector.y -= 1;
    if( camera_input_state.down )
        vector.y += 1;
    if( camera_input_state.left )
        vector.x -= 1;
    if( camera_input_state.right )
        vector.x += 1;
    return vector;
}

Viewport.prototype.getModifiedDeltaVector = function(delta_vector){
    var delta_vector_inner = delta_vector;
    var traversal_px = SETTINGS.get("CAMERA_PX_TRAVERSAL");
    delta_vector_inner.x *= traversal_px;
    delta_vector_inner.y *= traversal_px;
    return delta_vector_inner;
}