pluralsightModule.filter("clipDurationInSeconds", function () {
    return function (input) {
        var parts = input.split(':');
        var duration = 0;
        for (var i = 0; i < parts.length; i++) {
            duration *= 60;
            duration += parseInt(parts[i]);
        }

        return duration;
    };
});