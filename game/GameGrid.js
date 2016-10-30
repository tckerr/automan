var GameGrid = function(view, canvas){
    this.rows = {};
    this.chunks = [];
    this.blocks = [];
    this.canvas = canvas;
    this.generateNeededBlocksFromView(view);    
}

GameGrid.prototype.getCanvasDimensionsVector = function(){
    return new Vector(this.canvas.width, this.canvas.height);
}

GameGrid.prototype.generateNeededBlocksFromView = function(view){
    var canvasDimensionsVector = this.getCanvasDimensionsVector();
    var centered_view = this.getCenteredView(view, canvasDimensionsVector);
    var coordinates = this.getGridCoordinatesAtPixelCoordinates(centered_view.x, centered_view.y);
    this.generateChunkRadius(coordinates.column, coordinates.row);
}

GameGrid.prototype.getChunkGenerationRadiusX = function(canvas_width){
    var radius_x = this.getViewRadiusX(canvas_width);
    return Math.ceil(radius_x/SETTINGS.get("CHUNK_SIZE_BLOCKS_X"))*2;
}

GameGrid.prototype.getChunkGenerationRadiusY = function(canvas_height){
    var radius_y = this.getViewRadiusY(canvas_height);
    return Math.ceil(radius_y/SETTINGS.get("CHUNK_SIZE_BLOCKS_Y"))*2;
}

GameGrid.prototype.generateChunk = function(y, x){

    if(this.chunks[y]){
        if(this.chunks[y][x])
            return
    } else {
        this.chunks[y] = {};
    }
    this.chunks[y][x] = true;

    if (SETTINGS.get("LOG_CHUNK_GENERATION_REQUESTS"))
        console.info("Request chunk generation at: ("+x+","+y+")");

    var chunk_size_x = SETTINGS.get("CHUNK_SIZE_BLOCKS_X");
    var min_x = x * chunk_size_x;
    var max_x = min_x + chunk_size_x;
    var chunk_size_y = SETTINGS.get("CHUNK_SIZE_BLOCKS_Y");
    var min_y = y * chunk_size_y;
    var max_y = min_y + chunk_size_y;

    for (var j = min_y; j < max_y; j++){
        for (var i = min_x; i < max_x; i++){        
            if (!this.rows[j])
                this.rows[j] = {}
            if (!this.rows[j][i]){
                var block = new Block(i, j)
                this.rows[j][i] = block;
                this.blocks.push(block)
            }
        }
    }
}

GameGrid.prototype.generateChunkRadius = function(x, y){
    
    // get chunk
    var chunk_x = Math.floor(x/SETTINGS.get("CHUNK_SIZE_BLOCKS_X"));
    var chunk_y = Math.floor(y/SETTINGS.get("CHUNK_SIZE_BLOCKS_Y"));

    var canvasDimensionsVector = this.getCanvasDimensionsVector();

    var radius_x = this.getChunkGenerationRadiusX(canvasDimensionsVector.x);
    var radius_y = this.getChunkGenerationRadiusY(canvasDimensionsVector.y);

    var chunk_x_min = chunk_x - radius_x;
    var chunk_x_max = chunk_x + radius_x;
    var chunk_y_min = chunk_y - radius_y;
    var chunk_y_max = chunk_y + radius_y;

    for (var i = chunk_x_min; i < chunk_x_max; i++){
        for (var j = chunk_y_min; j < chunk_y_max; j++){
            this.generateChunk(j, i);
        }
    }
}

GameGrid.prototype.getViewRadiusX = function(canvas_width){
    return Math.ceil((canvas_width/SETTINGS.get("BLOCK_WIDTH_PX"))/2);
}

GameGrid.prototype.getViewRadiusY = function(canvas_height){
    return Math.ceil((canvas_height/SETTINGS.get("BLOCK_HEIGHT_PX"))/2);
}

GameGrid.prototype.getGridCoordinatesAtPixelCoordinates = function(pixel_x, pixel_y){
    return {
        column: Math.floor(pixel_x/SETTINGS.get("BLOCK_WIDTH_PX")),
        row: Math.floor(pixel_y/SETTINGS.get("BLOCK_HEIGHT_PX"))
    }
}

GameGrid.prototype.getBlockAtPixelCoordinates = function(pixel_x, pixel_y, view){
    console.log(pixel_x, pixel_y, view);
    if (view){
        pixel_x += view.x;
        pixel_y += view.y;
    }
    var coordinates = this.getGridCoordinatesAtPixelCoordinates(pixel_x, pixel_y);
    return this.rows[coordinates.row][coordinates.column];
}

GameGrid.prototype.getCenteredView = function(view, canvasDimensionsVector){
    return new Vector(
        view.x + Math.ceil(canvasDimensionsVector.x/2),
        view.y + Math.ceil(canvasDimensionsVector.y/2)
    )
}

GameGrid.prototype.getBlocksInView = function(view){

    var canvasDimensionsVector = this.getCanvasDimensionsVector();
    var centered_view = this.getCenteredView(view, canvasDimensionsVector);

    var rows = [];
    var blocks = [];
    var coordinates = this.getGridCoordinatesAtPixelCoordinates(centered_view.x, centered_view.y);   

    var view_radius_y = this.getViewRadiusY(canvasDimensionsVector.y) + 1;    
    var view_radius_x = this.getViewRadiusX(canvasDimensionsVector.x) + 1;

    // build inital row
    rows.push(this.rows[coordinates.row]);

    // build radiating rows
    for (var row_offset = 0; row_offset < view_radius_y; row_offset++) {
        rows.push(this.rows[coordinates.row + row_offset]);
        rows.push(this.rows[coordinates.row - row_offset]);
    }

    // set current column on all rows
    for (var row_index = 0; row_index < rows.length; row_index++) {
        var row = rows[row_index];        
        blocks.push(row[coordinates.column])
    }

    // set radiating columns for each row
    for (var column_offset = 0; column_offset < view_radius_x; column_offset++) {
        for (var row_index = 0; row_index < rows.length; row_index++) {
            var row = rows[row_index]; 

            blocks.push(row[coordinates.column + column_offset])
            blocks.push(row[coordinates.column - column_offset])
        }
    }
    return blocks;
}