var WHITE_LIST_URLS = [
    '#'
]

var WHITE_LIST_DOMAINS = [
    'www.23andme.com',
    '23andme.com'
]

var CATEGORY_MEDIA = "media";
var CATEGORY_BLOG  = "blog";
var CATEGORY_RESOURCE = "resource";
var CATEGORY_UNKNOWN = "unknown";
var CATEGORY_PARTNER = "partner";
var CATEGORY_INVESTOR = "investor";
var CATEGORY_TECH_REQUIREMENT = "tech req";
var CATEGORY_SCIENCE = "science";
var CATEGORY_GENETIC_COUNSELOR = "genetic counselor";
var CATEGORY_CLINIC = "clinic";

// override url categories here if necessary
var URL_CATEGORY_OVERRIDE = {
}

var DOMAIN_CATEGORY_MAP = {
    'abcnews.go.com'        : CATEGORY_MEDIA,
    'code.google.com'       : CATEGORY_TECH_REQUIREMENT,
    'd6.allthingsd.com'     : CATEGORY_MEDIA,
    'dna.ancestry.com'      : CATEGORY_PARTNER,
    'dx.doi.org'            : CATEGORY_SCIENCE,
    'feeds.feedburner.com'  : CATEGORY_TECH_REQUIREMENT,
    'genetests.org'         : CATEGORY_CLINIC,
    'jama.ama-assn.org'     : CATEGORY_SCIENCE,
    'maps.google.com'       : CATEGORY_RESOURCE,
    'mndoci.com'            : CATEGORY_MEDIA,
    'money.cnn.com'         : CATEGORY_MEDIA,
    'online.wsj.com'        : CATEGORY_MEDIA,
    'people.iola.dk'        : CATEGORY_TECH_REQUIREMENT,
    'phx.corporate-ir.net'  : CATEGORY_MEDIA,
    'scholar.google.com'    : CATEGORY_SCIENCE,
    'blog.23andme.com'      : CATEGORY_BLOG,
    'spittoon.23andme.com'  : CATEGORY_BLOG,
    'themoment.blogs.nytimes.com'   : CATEGORY_MEDIA,
    'twitter.com'           : CATEGORY_MEDIA,
    'www.2009seniorgames.org'       : CATEGORY_PARTNER,
    'www.acmg.net'          : CATEGORY_RESOURCE,
    'www.adobe.com'         : CATEGORY_TECH_REQUIREMENT,
    'www.amazon.com'        : CATEGORY_RESOURCE,
    'www.ancestry.com'      : CATEGORY_PARTNER,
    'www.ashg.org'          : CATEGORY_RESOURCE,
    'www.bloomberg.com'     : CATEGORY_MEDIA,
    'www.cbsnews.com'       : CATEGORY_MEDIA,
    'www.cdc.gov'           : CATEGORY_SCIENCE,
    'www.charlierose.com'   : CATEGORY_MEDIA,
    'www.chcf.org'          : CATEGORY_RESOURCE,
    'www.cnbc.com'          : CATEGORY_MEDIA,
    'www.dailystrength.org' : CATEGORY_MEDIA,
    'www.dnapolicy.org'     : CATEGORY_RESOURCE,
    'www.facebook.com'      : CATEGORY_MEDIA,
    'www.fastercures.org'   : CATEGORY_PARTNER,
    'www.forbes.com'        : CATEGORY_MEDIA,
    'www.friendfeed.com'    : CATEGORY_MEDIA,
    'www.genealogy.com'     : CATEGORY_PARTNER,
    'www.gene-watch.org'    : CATEGORY_RESOURCE,
    'www.genome.gov'        : CATEGORY_RESOURCE,
    'www.google.com'        : CATEGORY_INVESTOR,
    'www.handelsblatt.com'  : CATEGORY_MEDIA,
    'www.illumina.com'      : CATEGORY_PARTNER,
    'www.loiclemeur.com'    : CATEGORY_MEDIA,
    'www.michaeljfox.org'   : CATEGORY_PARTNER,
    'www.mondobiotech.com'  : CATEGORY_PARTNER,
    'www.msnbc.msn.com'     : CATEGORY_MEDIA,
    'www.myfamily.com'      : CATEGORY_PARTNER,
    'www.ncbi.nlm.nih.gov'  : CATEGORY_SCIENCE,
    'www.ncsl.org'          : CATEGORY_RESOURCE,
    'www.nea.com'           : CATEGORY_INVESTOR,
    'www.newyorker.com'     : CATEGORY_MEDIA,
    'www.nsga.com'          : CATEGORY_PARTNER,
    'www.nsgc.org'          : CATEGORY_GENETIC_COUNSELOR,
    'www.nytimes.com'       : CATEGORY_MEDIA,
    'www.oprah.com'         : CATEGORY_MEDIA,
    'www.parkinson.org'     : CATEGORY_PARTNER,
    'www.patientslikeme.com': CATEGORY_PARTNER,
    'www.pbase.com'         : CATEGORY_MEDIA,
    'www.pomwonderful.com'  : CATEGORY_PARTNER,
    'www.portfolio.com'     : CATEGORY_MEDIA,
    'www.pph.org'           : CATEGORY_PARTNER,
    'www.reynoldsriskscore.org'     : CATEGORY_SCIENCE,
    'www.rootsweb.com'      : CATEGORY_PARTNER,
    'www.sfgate.com'        : CATEGORY_MEDIA,
    'www.standup2cancer.org': CATEGORY_PARTNER,
    'www.star-telegram.com' : CATEGORY_MEDIA,
    'www.stumbleupon.com'   : CATEGORY_MEDIA,
    'www.techcrunch.com'    : CATEGORY_MEDIA,
    'www.telegraph.co.uk'   : CATEGORY_MEDIA,
    'www.thepi.org'         : CATEGORY_PARTNER,
    'www.time.com'          : CATEGORY_MEDIA,
    'www.weforum.org'       : CATEGORY_MEDIA,
    'www.wired.com'         : CATEGORY_MEDIA,
    'www.youtube.com'       : CATEGORY_MEDIA
}

function contains(iterable, obj) {
    for (var i = 0; i < iterable.length; i++ ) {
        if (iterable[i] == obj) {
            return true;
        }
    }
    return false;
}

function getDomain(url) {
    var url_parts = url.split('/');
    return url_parts[2];
}

function ga_TrackLink(eventObj) {
    try {
        var url = $(this).attr('href').toLowerCase();

        // if the url is in the whitelist, ignore it completely
        if (contains(WHITE_LIST_URLS, url)) {
            return true;
        }

        // check if we have a manual override for a url to be categorized differently
        var category = URL_CATEGORY_OVERRIDE[url];
        if (category) {
            trackGAEvent("Exit", url, category);
            return true;
        }

        // if it's a relative url, we don't track it
        if (url.indexOf('http') != 0) {
            return true;
        }

        var domain = getDomain(url);

        // Skip over internal domains
        if (contains(WHITE_LIST_DOMAINS, domain)) {
            return true;
        }

        // use the domain map to find the proper category
        var category = DOMAIN_CATEGORY_MAP[domain];
        if (!category) {
            category = CATEGORY_UNKNOWN;
        }

        trackGAEvent("Exit", url, category);

    } catch (err) {
        // make sure any errors here don't stop functionality
    }

    return true;
}
