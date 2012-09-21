view = views.Map.extend();

view.prototype.events = _(view.prototype.events || {}).extend({
    'click .josm-remote a': 'josmRemote'
});

view.prototype.initialize = _.wrap(view.prototype.initialize, function(func) {
    _(this).bindAll(
        'mapZoom',
        'josmRemote'
    );
    func.call(this);
    $("<div class='josm-remote'><a href='#' class='disabled button'>Edit in JOSM</a></div>").appendTo(this.map.parent);
    $('<iframe id="linkloader" style="display: none"></iframe>').appendTo(this.map.parent);
    this.map.addCallback('drawn', function(map) {
        if (map.getZoom() > 13) {
            $('.josm-remote a').removeClass('disabled');
        } else {
            $('.josm-remote a').addClass('disabled');
        }
    });
});

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
