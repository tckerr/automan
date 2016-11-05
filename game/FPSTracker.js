function FPSTracker(game_data){
    this.game_data = game_data;
    this.last_frame_count = 0;
    this.fps = 0;
    this.last_tick_count = 0;
    this.tps = 0;
    this.last_date = new Date(); 

    var bound = this.logStatus.bind(this);
    window.setInterval(bound, SETTINGS.get("FPS_TRACKER_REFRESH_INTERVAL_MS"));
}

FPSTracker.prototype.logStatus = function(){ 
    var current_date = new Date();  
    var date_diff = current_date - this.last_date;
    this.last_date = current_date;
    var diff_seconds = date_diff/1000;
    
    // track fps
    var frames_generated = this.game_data.frame - this.last_frame_count;
    var expected_frames_generated = Math.floor(diff_seconds * SETTINGS.get("MAX_FPS"));
    var frames_diff = frames_generated - expected_frames_generated;
    if(SETTINGS.get("LOG_FPS")){
        if(frames_diff >= SETTINGS.get("FPS_TRACKER_FRAME_DIF_WARNING_THRESHOLD") && frames_generated < expected_frames_generated)
            console.warn("Frames generated:", frames_generated, "(-",frames_diff,") | Expected:", expected_frames_generated);
        else 
            console.log("Frames generated:", frames_generated);
    }    
    this.last_frame_count = this.game_data.frame;
    this.fps = Math.floor(frames_generated * 1000 / date_diff);

    //tick counter TODO: improve
    var ticks_generated = this.game_data.tick - this.last_tick_count;
    this.last_tick_count = this.game_data.tick;
    this.tps = Math.floor(ticks_generated * 1000 / date_diff)
}