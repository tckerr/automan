function GameData(){
    this.frame = 0;
}

function GameManager($canvas){

    this.game_data = new GameData();
    this.input_queue = [];

    this.input_controller = new InputController($(document));
    this.viewport = new Viewport(this.getCameraInputState());
    this.game_canvas = new GameCanvas($canvas, this.getCanvasClickDelegate(this.input_queue));
    this.grid = new GameGrid(this.viewport, this.game_canvas.canvas);   
    
}

GameManager.prototype.getCanvasClickDelegate = function(input_queue){
    var delegate = function(pos){
        this.push({type: 'interact', data: pos })
    };
    return delegate.bind(input_queue);
}

GameManager.prototype.getCameraInputState = function(){
    return this.input_controller.input_state.camera;
}

GameManager.prototype.gameLoop = function(){
    var camera_input_state = this.getCameraInputState();
    this.viewport = new Viewport(camera_input_state, this.viewport);
    this.processFrame(
        this.grid,
        this.viewport,
        this.game_canvas,
        this.game_data,
        this.input_queue);
}

GameManager.prototype.processFrame = function(grid, viewport, game_canvas, game_data, input_queue){
    game_data.frame++; 
    game_canvas.setDimensions();
    grid.generateNeededBlocksFromView(viewport);
    this.handleInputs(input_queue, viewport, grid);    
    this.render(viewport, game_canvas, grid);
}

GameManager.prototype.handleInputs = function(input_queue, viewport, grid){
    while(input = this.input_queue.shift()){
        switch(input.type){
            case "interact":
                this.handleClick(input, viewport, grid);
                break;
        }
    }
}

GameManager.prototype.handleClick = function(click, viewport, grid){
    var block = grid.getBlockAtPixelCoordinates(click.data.x, click.data.y, viewport);
    
    if (SETTINGS.get("HIGHLIGHT_BLOCK_ON_CLICK"))
    block.toggleHighlight();
}

GameManager.prototype.render = function(viewport, game_canvas, grid){
    game_canvas.render(viewport, grid)
}