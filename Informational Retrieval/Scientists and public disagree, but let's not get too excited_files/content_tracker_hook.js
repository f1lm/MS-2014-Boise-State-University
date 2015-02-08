(function() {

  var insert_script_tag = function insert_script_tag(script_src) {
    var new_script = document.createElement('script');
    new_script.async = true;
    new_script.src = script_src;

    var first_script = document.getElementsByTagName('script')[0];
    first_script.parentNode.insertBefore(new_script, first_script);
  };

  var insert_counter_tag = function insert_counter_tag(script_path) {
    insert_script_tag(
      script_path + '?from=' + escape(document.location.host) + '&referrer=' + escape(document.referrer)
    );
  };

  var script_path_for = function script_path_for(script_attribute) {
    return document.getElementById('theconversation_tracker_hook').getAttribute(script_attribute);
  };

  insert_counter_tag(script_path_for('data-counter') ||
    // Pieces republished before 'data-counter' was added need a workaround.
    script_path_for('data-tracker').replace(/^\/\/(.*)\/tracker$/, 'https://counter.$1/count')
  );
})();
