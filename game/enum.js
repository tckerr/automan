var SETTINGS_STATIC = {

    STARTING_ROW_INDEX: 6,
    STARTING_COLUMN_INDEX: 6,

    CHUNK_SIZE_BLOCKS_X: 80, // in blocks
    CHUNK_SIZE_BLOCKS_Y: 80,

    // BLOCK
    BLOCK_WIDTH_PX: 48,
    BLOCK_HEIGHT_PX: 48,

    MAX_FPS: 500,
    GAME_TICKS_PER_SECOND: 80
}


var BINDINGS = {
    CAMERA_UP_KEYCODE: 87, 
    CAMERA_DOWN_KEYCODE: 83, 
    CAMERA_LEFT_KEYCODE: 65, 
    CAMERA_RIGHT_KEYCODE: 68, 
}


var SETTINGS_DYNAMIC = {

    // DEBUGGING
    HIGHLIGHT_BLOCK_ON_CLICK: false,

    // FPS TRACKER
    LOG_FPS: false,
    FPS_TRACKER_REFRESH_INTERVAL_MS: 1000,
    FPS_TRACKER_FRAME_DIF_WARNING_THRESHOLD: 2,

    // CHUNK LOGGER
    LOG_CHUNK_GENERATION_REQUESTS: true,

    // BLOCK STYLING
    BLOCK_DEFAULT_BORDER_WIDTH: 1,
    BLOCK_DEFAULT_BORDER_COLOR: "#DDD",
    BLOCK_DEFAULT_FILL_COLOR: "#EEE",
    BLOCK_DEFAULT_FILL_COLOR_HIGHLIGHT: "#4CAF50",

    // CAMERA
    CAMERA_PX_TRAVERSAL: 20,

    // CANVAS
    CANVAS_WIDTH: 900,
    CANVAS_HEIGHT: 600,

}