view = views.Map.extend();

view.prototype.events = {
    'click .josm-remote a': 'josmRemote'
};

view.prototype.initialize = function() {
    _(this).bindAll(
        'render',
        'attach',
        'mapZoom',
        'fullscreen',
        'josmRemote'
    );
    this.model.bind('saved', this.attach);
    this.model.bind('poll', this.attach);
    this.render().attach();
};

// Set zoom display.
view.prototype.mapZoom = function(e) {
    this.$('.zoom-display .zoom').text(this.map.getZoom());
    if (this.map.getZoom() > 13) {
        $('.josm-remote a').removeClass('disabled');
    } else {
        $('.josm-remote a').addClass('disabled');
    }
};

view.prototype.josmRemote = function(e) {
    var extent = this.map.getExtent();

    $('#linkloader').attr('src',
        'http://127.0.0.1:8111/load_and_zoom' +
        '?left=' + extent.west +
        '&right=' + extent.east +
        '&top=' + extent.north +
        '&bottom=' + extent.south
    );

    return false;
}
