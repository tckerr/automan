class Block{
    constructor(x, y){ 
        this.pos = new Vector(x, y);
        this.highlight = false;
    }

    render(ctx, view){
        //border
        var block_width = SETTINGS.get("BLOCK_WIDTH_PX");
        var block_height = SETTINGS.get("BLOCK_HEIGHT_PX");
        var effective_x = this.pos.x * block_width;
        var effective_y = this.pos.y * block_height;

        ctx.fillStyle = SETTINGS.get("BLOCK_DEFAULT_BORDER_COLOR");
        ctx.fillRect( 
            effective_x - view.x, 
            effective_y - view.y, 
            block_width, 
            block_height);

        ctx.fillStyle = this.highlight ? SETTINGS.get("BLOCK_DEFAULT_FILL_COLOR_HIGHLIGHT") : SETTINGS.get("BLOCK_DEFAULT_FILL_COLOR");
        var border_width = SETTINGS.get("BLOCK_DEFAULT_BORDER_WIDTH");
        ctx.fillRect( 
            effective_x + border_width - view.x, 
            effective_y + border_width - view.y, 
            block_width - border_width * 2, 
            block_height- border_width * 2);
    }

    toggleHighlight(){
        this.highlight = !this.highlight;
    }
}

class Machine extends Block {

}
