function Vector(x, y){
    this.x = x;
    this.y = y;
}

function vector_difference(va, vb){
    return new Vector(va.x-vb.x,va.y-vb.y);
}