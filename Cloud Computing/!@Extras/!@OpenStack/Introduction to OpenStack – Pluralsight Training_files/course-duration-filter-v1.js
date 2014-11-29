pluralsightModule.filter("courseDuration", function () {
    return function (input) {
        if (input) {
            var parts = input.split(':');
            var hours = parts[0] == 0 ? '' : parseInt(parts[0]) + 'h ';
            var minutes = parseInt(parts[1]) + 'm';
            return hours + minutes;
        }
        return '';
    };
});