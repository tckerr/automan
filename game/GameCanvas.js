function GameCanvas($canvas, click_delegate){
    this.$canvas = $canvas;
    this.canvas = $canvas[0];
    this.setDimensions();

    this.ctx = this.canvas.getContext("2d"); 

    this.bindEventClientPosDelegate("click", click_delegate);  
}

GameCanvas.prototype.setDimensions = function(){
    this.canvas.width = SETTINGS.get("CANVAS_WIDTH");
    this.canvas.height = SETTINGS.get("CANVAS_HEIGHT");
}

GameCanvas.prototype.render = function(viewport, grid){
    // render blocks
    this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
    var renderableBlocks = grid.getBlocksInView(viewport);

    for (var i = 0; i < renderableBlocks.length; i++) {
        renderableBlocks[i].render(this.ctx, viewport);
    }
}

GameCanvas.prototype.bindEventClientPosDelegate = function(event, delegate){
    var self = this;
    this.$canvas.on(event, function(e){
        var rect = self.canvas.getBoundingClientRect();
        var mouse_pos = new Vector(e.clientX - rect.left, e.clientY - rect.top);
        delegate(mouse_pos);
    })
}