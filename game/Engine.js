function GameData(){
    this.frame = 0;
    this.tick = 0;
}

function Ticker(){
    this.last = new Date();
}

// generates a game tick and returns true if we're ready for one
Ticker.prototype.generateIfNeeded = function(){
    var now = new Date();
    var interval = 1000/SETTINGS.get('GAME_TICKS_PER_SECOND');
    if (now - this.last >= interval){
        this.last = now;
        return true;
    }
    return false;
}

function Engine($canvas){

    this.game_data = new GameData();
    this.input_queue = [];
    this.ticker = new Ticker();
    this.input_controller = new InputController($(document));
    this.viewport = new Viewport(this.getCameraInputState());
    this.game_canvas = new GameCanvas($canvas, this.getCanvasClickDelegate(this.input_queue));
    this.grid = new GameGrid(this.viewport, this.game_canvas.canvas);   
    
}

Engine.prototype.getCanvasClickDelegate = function(input_queue){
    var delegate = function(pos){
        this.push({type: 'interact', data: pos })
    };
    return delegate.bind(input_queue);
}

Engine.prototype.getCameraInputState = function(){
    return this.input_controller.input_state.camera;
}

Engine.prototype.gameLoop = function(){
    var camera_input_state = this.getCameraInputState();
    this.viewport = new Viewport(camera_input_state, this.viewport);
    this.processFrame(
        this.grid,
        this.viewport,
        this.game_canvas,
        this.game_data,
        this.input_queue);
}

Engine.prototype.processFrame = function(grid, viewport, game_canvas, game_data, input_queue){
    game_data.frame++; 
    game_canvas.setDimensions();
    grid.generateNeededBlocksFromView(viewport);
    //only process game data if we're due for a tick  
    if(this.ticker.generateIfNeeded()){
        game_data.tick++;
        this.handleInputs(input_queue, viewport, grid);  
    }
    this.render(viewport, game_canvas, grid);
}

Engine.prototype.handleInputs = function(input_queue, viewport, grid){
    while(input = this.input_queue.shift()){
        switch(input.type){
            case "interact":
                this.handleClick(input, viewport, grid);
                break;
        }
    }
}

Engine.prototype.handleClick = function(click, viewport, grid){
    var block = grid.getBlockAtPixelCoordinates(click.data.x, click.data.y, viewport);
    
    if (SETTINGS.get("HIGHLIGHT_BLOCK_ON_CLICK"))
        block.toggleHighlight();
}

Engine.prototype.render = function(viewport, game_canvas, grid){
    game_canvas.render(viewport, grid)
}