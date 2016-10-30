function Setting(key, default_value, dynamic){
    this.key = key;
    this.value = default_value;
    this.default_value = default_value;
    this.dynamic = dynamic;
}

function SettingsManager(){   
    var self = this;
    this.settings = {};
    for ( var key in DEFAULT_SETTINGS_STATIC ){
        self.set(key, DEFAULT_SETTINGS_STATIC[key], false)
    }
    for ( var key in DEFAULT_SETTINGS_DYNAMIC ){
        self.set(key, DEFAULT_SETTINGS_DYNAMIC[key], true)
    }
}

SettingsManager.prototype.set = function(key, value, dynamic){
    this.settings[key] = new Setting(key, value, dynamic);
}

SettingsManager.prototype.get = function(key){
    return this.settings[key].value;
}

SettingsManager.prototype.update = function(key, value){
    this.settings[key].value = value;
}

SettingsManager.prototype.reset = function(key){
    return this.settings[key].value = this.settings[key].default_value;
}

SettingsManager.prototype.list = function(){
    var list = {};
    for (var key in this.settings){
        list[key] = this.settings[key].value;
    }
    return list;
}

SettingsManager.prototype.listDynamic = function(){
    var list = {};
    for (var key in this.settings){
        if (this.settings[key].dynamic)
            list[key] = this.settings[key].value;
    }
    return list;
}