class Block{
    constructor(x, y){
        this.x = x;
        this.y = y;    
        this.highlight = false;
    }

    render(ctx, view){
        //border
        var effective_x = this.x * SETTINGS.BLOCK_WIDTH_PX;
        var effective_y = this.y * SETTINGS.BLOCK_HEIGHT_PX;

        ctx.fillStyle = SETTINGS.BLOCK_DEFAULT_BORDER_COLOR;
        ctx.fillRect( 
            effective_x - view.x, 
            effective_y - view.y, 
            SETTINGS.BLOCK_WIDTH_PX, 
            SETTINGS.BLOCK_HEIGHT_PX);

        ctx.fillStyle = this.highlight ? SETTINGS.BLOCK_DEFAULT_FILL_COLOR_HIGHLIGHT : SETTINGS.BLOCK_DEFAULT_FILL_COLOR;
        ctx.fillRect( 
            effective_x + SETTINGS.BLOCK_DEFAULT_BORDER_WIDTH - view.x, 
            effective_y + SETTINGS.BLOCK_DEFAULT_BORDER_WIDTH - view.y, 
            SETTINGS.BLOCK_WIDTH_PX - SETTINGS.BLOCK_DEFAULT_BORDER_WIDTH * 2, 
            SETTINGS.BLOCK_HEIGHT_PX - SETTINGS.BLOCK_DEFAULT_BORDER_WIDTH * 2);
    }

    toggleHighlight(){
        this.highlight = !this.highlight;
    }
}

class Machine extends Block {

}
