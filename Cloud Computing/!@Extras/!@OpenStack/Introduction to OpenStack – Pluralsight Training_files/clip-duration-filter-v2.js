pluralsightModule.filter("clipDuration", function () {
    return function (input) {
        if (!input) return '';

        var parts = input.split(':');

        if (parts.length < 3) {
            return input;
        }

        var hours = parseInt(parts[0]);

        if (hours != 0) {
            return hours + ":" + parts[1] + ":" + parts[2];
        }

        return parseInt(parts[1]) + ":" + parts[2];
    };
});