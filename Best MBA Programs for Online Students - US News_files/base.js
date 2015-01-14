var base_url = '/static',
    EXCLUSIONS = ['jobs.usnews.com', 'usnews.qa.indeed.net', 'usnews.indeed.com']; //Exclusions from the default for jobs-by-indeed
if (EXCLUSIONS.join(':').indexOf(window.location.hostname) !== -1) {
  base_url = "http://static.usnews.com";
}
base_url =(("https:" === window.location.protocol) ? "https://secure.usnews.com/static" : base_url);
/* whitehouse tracker and store hack */
if ((window.location.pathname.split('/')[1] === 'whitehouse')
    || (window.location.pathname.split('/')[1] === 'usnews'
        && window.location.pathname.split('/')[2] === 'store')) {
    document.write('<script type="text/javascript" src="' + base_url + '/scripts/jquery/jquery-1.4.4.min.js"></script>');
} else {
    document.write('<script type="text/javascript" src="' + base_url + '/scripts/jquery/jquery-1.9.1-migrate-1.2.1.min.js"></script>');
}
document.write('<script type="text/javascript" src="' + base_url + '/scripts/jquery/usn-4.0.js"></script>');
