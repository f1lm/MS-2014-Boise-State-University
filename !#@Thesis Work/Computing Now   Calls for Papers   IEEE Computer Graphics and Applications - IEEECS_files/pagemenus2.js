
var urlMapper = {
	"/web/computingnow/computer":"/web/computingnow/computer",
	"/web/computingnow/computer/about":"/web/computingnow/computer",
	"/web/computingnow/computer/edboard":"/web/computingnow/computer",
	"/web/computingnow/computer/advboard":"/web/computingnow/computer",

	"/web/computingnow/cise":"/web/computingnow/cise",
	"/web/computingnow/cise/about":"/web/computingnow/cise",
	"/web/computingnow/cise/edboard":"/web/computingnow/cise",
	"/web/computingnow/cise/faq":"/web/computingnow/cise",

	"/web/computingnow/annals":"/web/computingnow/annals",
	"/web/computingnow/annals/about":"/web/computingnow/annals",
	"/web/computingnow/annals/edboard":"/web/computingnow/annals",

	"/web/computingnow/cga":"/web/computingnow/cga",
	"/web/computingnow/cga/about":"/web/computingnow/cga",
	"/web/computingnow/cga/edboard":"/web/computingnow/cga",

	"/web/computingnow/intelligentsystems":"/web/computingnow/intelligentsystems",
	"/web/computingnow/intelligentsystems/about":"/web/computingnow/intelligentsystems",
	"/web/computingnow/intelligentsystems/edboard":"/web/computingnow/intelligentsystems",

	"/web/computingnow/internetcomputing":"/web/computingnow/internetcomputing",
	"/web/computingnow/internetcomputing/about":"/web/computingnow/internetcomputing",
	"/web/computingnow/internetcomputing/edboard":"/web/computingnow/internetcomputing",

	"/web/computingnow/micro":"/web/computingnow/micro",
	"/web/computingnow/micro/about":"/web/computingnow/micro",
	"/web/computingnow/micro/edboard":"/web/computingnow/micro",
	"/web/computingnow/micro/advisoryboard":"/web/computingnow/micro",

	"/web/computingnow/multimedia":"/web/computingnow/multimedia",
	"/web/computingnow/multimedia/about":"/web/computingnow/multimedia",
	"/web/computingnow/multimedia/edboard":"/web/computingnow/multimedia",

	"/web/computingnow/pervasivecomputing":"/web/computingnow/pervasivecomputing",
	"/web/computingnow/pervasivecomputing/about":"/web/computingnow/pervasivecomputing",
	"/web/computingnow/pervasivecomputing/edboard":"/web/computingnow/pervasivecomputing",
	"/web/computingnow/pervasivecomputing/faq":"/web/computingnow/pervasivecomputing",

	"/web/computingnow/securityandprivacy":"/web/computingnow/securityandprivacy",
	"/web/computingnow/securityandprivacy/about":"/web/computingnow/securityandprivacy",
	"/web/computingnow/securityandprivacy/edboard":"/web/computingnow/securityandprivacy",

	"/web/computingnow/software":"/web/computingnow/software",
	"/web/computingnow/software/about":"/web/computingnow/software",
	"/web/computingnow/software/edboard":"/web/computingnow/software",
	"/web/computingnow/software/advisoryboard":"/web/computingnow/software",
	"/web/computingnow/software/staff":"/web/computingnow/software",

	"/web/computingnow/itpro":"/web/computingnow/itpro",
	"/web/computingnow/itpro/about":"/web/computingnow/itpro",
	"/web/computingnow/itpro/edboard":"/web/computingnow/itpro",
	"/web/computingnow/itpro/advisoryboard":"/web/computingnow/itpro",

	"/web/computingnow/cloudcomputing":"/web/computingnow/cloudcomputing",
	"/web/computingnow/cloudcomputing/about":"/web/computingnow/cloudcomputing",
	"/web/computingnow/cloudcomputing/edboard":"/web/computingnow/cloudcomputing",

	"/web/computingnow":"/web/computingnow",
	"/web/computingnow/cloud":"/web/computingnow/cloud",
	"/web/computingnow/high-performance":"/web/computingnow/high-performance",
	"/web/computingnow/big-data":"/web/computingnow/big-data",
	"/web/computingnow/mobile":"/web/computingnow/mobile",
	"/web/computingnow/networking":"/web/computingnow/networking",
	"/web/computingnow/security":"/web/computingnow/security",
	"/web/computingnow/software-engineering":"/web/computingnow/software-engineering",
	"/web/computingnow/careers":"/web/computingnow/careers",
	"/web/computingnow/insights":"/web/computingnow/insights",
	"/web/computingnow/hot-topics":"/web/computingnow/hot-topics",
	"/web/computingnow/calendar":"/web/computingnow/calendar"
}

var pageMenuData = {
    "default" : '<ul>' +
				'<li><a href="/web/computingnow">HOME</a></li>' +
				'<li><a href="/web/computingnow/cloud">CLOUD</a></li>' +
				'<li><a href="/web/computingnow/big-data">BIG DATA</a></li>' +
				'<li><a href="/web/computingnow/mobile">MOBILE</a></li>' +
				'<li><a href="/web/computingnow/networking">NETWORKING</a></li>' +
				'<li><a href="/web/computingnow/security">SECURITY</a></li>' +
				'<li><a href="/web/computingnow/software-engineering">SOFTWARE</a></li>' +
				'<li><a href="/web/computingnow/insights">INSIGHTS</a></li>' +
				'<li><a href="/web/computingnow/hot-topics">HOT TOPICS</a></li>' +
				'<li><a href="/web/computingnow/calendar">CALENDAR</a></li>' +
				'</ul>',
    "/web/computingnow/computer" : '<ul>' +
			   '<li><a href="/web/computingnow/computer">COMPUTER HOME</a></li>' +
			   '<li class="has-sub"><a href="/web/computingnow/computer/about">ABOUT</a><ul>' +
				   '<li><a href="/web/computingnow/computer/about">About Computer</a></li>' +
				   '<li><a href="/web/computingnow/computer/edboard">Editorial Board</a></li>' +
				   '<li><a href="/web/computingnow/computer/advboard">Editorial Board Profiles</a></li></ul></li>' +
			   '<li><a href="/csdl/mags/co/index.html">BACK ISSUES</a></li>' +
			   '<li class="has-sub"><a href="/web/computingnow/writeforus">WRITE FOR US</a><ul>' +
				   '<li><a href="/web/peer-review/magazines">Author Guidelines</a></li>' +
				   '<li><a href="/web/computingnow/cfps/co">Call for Papers</a></li>' +
				   '<li><a href="http://www.computer.org/web/computingnow/writeforus">Editorial Calendar</a></li>' +
				   '<li><a href="https://mc.manuscriptcentral.com/cs-ieee">Submit a Paper</a></li></ul></li>' +
				'</ul>',
    "/web/computingnow/cise" : '<ul>' +
			   '<li><a href="/web/computingnow/cise">CISE HOME</a></li>' +
			   '<li class="has-sub"><a href="/web/computingnow/cise/about">ABOUT</a><ul>' +
				   '<li><a href="/web/computingnow/cise/about">About CiSE</a></li>' +
				   '<li><a href="/web/computingnow/cise/edboard">Editorial Board</a></li>' +
				   '<li><a href="/web/computingnow/cise/faq">FAQs</a></li></ul></li>' +
			   '<li><a href="/csdl/mags/cs/index.html">BACK ISSUES</a></li>' +
			   '<li class="has-sub"><a href="/web/computingnow/writeforus">WRITE FOR US</a><ul>' +
				   '<li><a href="/web/peer-review/magazines">Author Guidelines</a></li>' +
				   '<li><a href="/web/computingnow/cfps/cs">Call for Papers</a></li>' +
				   '<li><a href="http://www.computer.org/web/computingnow/writeforus">Editorial Calendar</a></li>' +
				   '<li><a href="https://mc.manuscriptcentral.com/cs-ieee">Submit a Paper</a></li></ul></li>' +
				'</ul>',
    "/web/computingnow/annals" : '<ul>' +
			   '<li><a href="/web/computingnow/annals">ANNALS HOME</a></li>' +
			   '<li class="has-sub"><a href="/web/computingnow/annals/about">ABOUT</a><ul>' +
				   '<li><a href="/web/computingnow/annals/about">About Annals</a></li>' +
				   '<li><a href="/web/computingnow/annals/edboard">Editorial Board</a></li></ul></li>' +
			   '<li><a href="/csdl/mags/an/index.html">BACK ISSUES</a></li>' +
			   '<li class="has-sub"><a href="/web/computingnow/writeforus">WRITE FOR US</a><ul>' +
				   '<li><a href="/web/peer-review/magazines">Author Guidelines</a></li>' +
				   '<li><a href="/web/computingnow/cfps/an">Call for Papers</a></li>' +
				   '<li><a href="http://www.computer.org/web/computingnow/writeforus">Editorial Calendar</a></li>' +
				   '<li><a href="https://mc.manuscriptcentral.com/annals-cs">Submit a Paper</a></li></ul></li>' +
				'</ul>',
    "/web/computingnow/cga" : '<ul>' +
			   '<li><a href="/web/computingnow/cga">CG&A HOME</a></li>' +
			   '<li class="has-sub"><a href="/web/computingnow/cga/about">ABOUT</a><ul>' +
				   '<li><a href="/web/computingnow/cga/about">About CG&A</a></li>' +
				   '<li><a href="/web/computingnow/cga/edboard">Editorial Board</a></li></ul></li>' +
			   '<li><a href="/csdl/mags/cg/index.html">BACK ISSUES</a></li>' +
			   '<li class="has-sub"><a href="/web/computingnow/writeforus">WRITE FOR US</a><ul>' +
				   '<li><a href="/web/peer-review/magazines">Author Guidelines</a></li>' +
				   '<li><a href="/web/computingnow/cfps/cg">Call for Papers</a></li>' +
				   '<li><a href="http://www.computer.org/web/computingnow/writeforus">Editorial Calendar</a></li>' +
				   '<li><a href="https://mc.manuscriptcentral.com/cga-cs">Submit a Paper</a></li></ul></li>' +
				'</ul>',
    "/web/computingnow/intelligentsystems" : '<ul>' +
			   '<li><a href="/web/computingnow/intelligentsystems">IS HOME</a></li>' +
			   '<li class="has-sub"><a href="/web/computingnow/intelligentsystems/about">ABOUT</a><ul>' +
				   '<li><a href="/web/computingnow/intelligentsystems/about">About IS</a></li>' +
				   '<li><a href="/web/computingnow/intelligentsystems/edboard">Editorial Board</a></li></ul></li>' +
			   '<li><a href="/csdl/mags/ex/index.html">BACK ISSUES</a></li>' +
			   '<li class="has-sub"><a href="/web/computingnow/writeforus">WRITE FOR US</a><ul>' +
				   '<li><a href="/web/peer-review/magazines">Author Guidelines</a></li>' +
				   '<li><a href="/web/computingnow/cfps/is">Call for Papers</a></li>' +
				   '<li><a href="http://www.computer.org/web/computingnow/writeforus">Editorial Calendar</a></li>' +
				   '<li><a href="https://mc.manuscriptcentral.com/cs-ieee">Submit a Paper</a></li></ul></li>' +
				'</ul>',
    "/web/computingnow/internetcomputing" : '<ul>' +
			   '<li><a href="/web/computingnow/internetcomputing">IC HOME</a></li>' +
			   '<li class="has-sub"><a href="/web/computingnow/internetcomputing/about">ABOUT</a><ul>' +
				   '<li><a href="/web/computingnow/internetcomputing/about">About IC</a></li>' +
				   '<li><a href="/web/computingnow/internetcomputing/edboard">Editorial Board</a></li></ul></li>' +
			   '<li><a href="/csdl/mags/ic/index.html">BACK ISSUES</a></li>' +
			   '<li class="has-sub"><a href="/web/computingnow/writeforus">WRITE FOR US</a><ul>' +
				   '<li><a href="/web/peer-review/magazines">Author Guidelines</a></li>' +
				   '<li><a href="/web/computingnow/cfps/ic">Call for Papers</a></li>' +
				   '<li><a href="http://www.computer.org/web/computingnow/writeforus">Editorial Calendar</a></li>' +
				   '<li><a href="https://mc.manuscriptcentral.com/cs-ieee">Submit a Paper</a></li></ul></li>' +
				'</ul>',
    "/web/computingnow/micro" : '<ul>' +
			   '<li><a href="/web/computingnow/micro">MICRO HOME</a></li>' +
			   '<li class="has-sub"><a href="/web/computingnow/micro/about">ABOUT</a><ul>' +
				   '<li><a href="/web/computingnow/micro/about">About Micro</a></li>' +
				   '<li><a href="/web/computingnow/micro/edboard">Editorial Board</a></li>' +
				   '<li><a href="/web/computingnow/micro/advisoryboard">Advisory Board</a></li></ul></li>' +
			   '<li><a href="/csdl/mags/mi/index.html">BACK ISSUES</a></li>' +
			   '<li class="has-sub"><a href="/web/computingnow/writeforus">WRITE FOR US</a><ul>' +
				   '<li><a href="/web/peer-review/magazines">Author Guidelines</a></li>' +
				   '<li><a href="/web/computingnow/cfps/mi">Call for Papers</a></li>' +
				   '<li><a href="http://www.computer.org/web/computingnow/writeforus">Editorial Calendar</a></li>' +
				   '<li><a href="https://mc.manuscriptcentral.com/micro-cs">Submit a Paper</a></li></ul></li>' +
				'</ul>',
    "/web/computingnow/multimedia" : '<ul>' +
			   '<li><a href="/web/computingnow/multimedia">MM HOME</a></li>' +
			   '<li class="has-sub"><a href="/web/computingnow/multimedia/about">ABOUT</a><ul>' +
				   '<li><a href="/web/computingnow/multimedia/about">About Multimedia</a></li>' +
				   '<li><a href="/web/computingnow/multimedia/edboard">Editorial Board</a></li></ul></li>' +
			   '<li><a href="/csdl/mags/mu/index.html">BACK ISSUES</a></li>' +
			   '<li class="has-sub"><a href="/web/computingnow/writeforus">WRITE FOR US</a><ul>' +
				   '<li><a href="/web/peer-review/magazines">Author Guidelines</a></li>' +
				   '<li><a href="/web/computingnow/cfps/mm">Call for Papers</a></li>' +
				   '<li><a href="http://www.computer.org/web/computingnow/writeforus">Editorial Calendar</a></li>' +
				   '<li><a href="https://mc.manuscriptcentral.com/cs-ieee">Submit a Paper</a></li></ul></li>' +
				'</ul>',
    "/web/computingnow/pervasivecomputing" : '<ul>' +
			  '<li><a href="/web/computingnow/pervasivecomputing">PVC HOME</a></li>' +
			   '<li class="has-sub"><a href="/web/computingnow/pervasivecomputing/about">ABOUT</a><ul>' +
				   '<li><a href="/web/computingnow/pervasivecomputing/about">About Pervasive</a></li>' +
				   '<li><a href="/web/computingnow/pervasivecomputing/edboard">Editorial Board</a></li>' +
				   '<li><a href="/web/computingnow/pervasivecomputing/faq">FAQs</a></li></ul></li>' +
			   '<li><a href="/csdl/mags/pc/index.html">BACK ISSUES</a></li>' +
			   '<li class="has-sub"><a href="/web/computingnow/writeforus">WRITE FOR US</a><ul>' +
				   '<li><a href="/web/peer-review/magazines">Author Guidelines</a></li>' +
				   '<li><a href="/web/computingnow/cfps/pc">Call for Papers</a></li>' +
				   '<li><a href="http://www.computer.org/web/computingnow/writeforus">Editorial Calendar</a></li>' +
				   '<li><a href="https://mc.manuscriptcentral.com/pc-cs">Submit a Paper</a></li></ul></li>' +
				'</ul>',
    "/web/computingnow/securityandprivacy" : '<ul>' +
			   '<li><a href="/web/computingnow/securityandprivacy">S&P HOME</a></li>' +
			   '<li class="has-sub"><a href="/web/computingnow/securityandprivacy/about">ABOUT</a><ul>' +
				   '<li><a href="/web/computingnow/securityandprivacy/about">About S&P</a></li>' +
				   '<li><a href="/web/computingnow/securityandprivacy/edboard">Editorial Board</a></li></ul></li>' +
			   '<li><a href="/csdl/mags/sp/index.html">BACK ISSUES</a></li>' +
			   '<li class="has-sub"><a href="/web/computingnow/writeforus">WRITE FOR US</a><ul>' +
				   '<li><a href="/web/peer-review/magazines">Author Guidelines</a></li>' +
				   '<li><a href="/web/computingnow/cfps/sp">Call for Papers</a></li>' +
				   '<li><a href="http://www.computer.org/web/computingnow/writeforus">Editorial Calendar</a></li>' +
				   '<li><a href="https://mc.manuscriptcentral.com/cs-ieee">Submit a Paper</a></li></ul></li>' +
				'</ul>',
    "/web/computingnow/software" : '<ul>' +
			   '<li><a href="/web/computingnow/software">SW HOME</a></li>' +
			   '<li class="has-sub"><a href="/web/computingnow/software/about">ABOUT</a><ul>' +
				   '<li><a href="/web/computingnow/software/about">About Software</a></li>' +
				   '<li><a href="/web/computingnow/software/edboard">Editorial Board</a></li>' +
				   '<li><a href="/web/computingnow/software/advisoryboard">Advisory Board</a></li>' +
				   '<li><a href="/web/computingnow/software/staff">Staff</a></li></ul></li>' +
			   '<li><a href="/csdl/mags/so/index.html">BACK ISSUES</a></li>' +
			   '<li class="has-sub"><a href="/web/computingnow/writeforus">WRITE FOR US</a><ul>' +
				   '<li><a href="/web/peer-review/magazines">Author Guidelines</a></li>' +
				   '<li><a href="/web/computingnow/cfps/sw">Call for Papers</a></li>' +
				   '<li><a href="http://www.computer.org/web/computingnow/writeforus">Editorial Calendar</a></li>' +
				   '<li><a href="https://mc.manuscriptcentral.com/cs-ieee">Submit a Paper</a></li></ul></li>' +
				'</ul>',
    "/web/computingnow/itpro" : '<ul>' +
			   '<li><a href="/web/computingnow/itpro">IT PRO HOME</a></li>' +
			   '<li class="has-sub"><a href="/web/computingnow/itpro/about">ABOUT</a><ul>' +
				   '<li><a href="/web/computingnow/itpro/about">About IT Pro</a></li>' +
				   '<li><a href="/web/computingnow/itpro/edboard">Editorial Board</a></li>' +
				   '<li><a href="/web/computingnow/itpro/advisoryboard">Advisory Board</a></li></ul></li>' +
			   '<li><a href="/csdl/mags/it/index.html">BACK ISSUES</a></li>' +
			   '<li class="has-sub"><a href="/web/computingnow/writeforus">WRITE FOR US</a><ul>' +
				   '<li><a href="/web/peer-review/magazines">Author Guidelines</a></li>' +
				   '<li><a href="/web/computingnow/cfps/it">Call for Papers</a></li>' +
				   '<li><a href="http://www.computer.org/web/computingnow/writeforus">Editorial Calendar</a></li>' +
				   '<li><a href="https://mc.manuscriptcentral.com/itpro-cs">Submit a Paper</a></li></ul></li>' +
				'</ul>',
    "/web/computingnow/cloudcomputing" : '<ul>' +
			   '<li><a href="/web/computingnow/cloudcomputing">CLOUD HOME</a></li>' +
			   '<li class="has-sub"><a href="/web/computingnow/cloudcomputing/about">ABOUT</a><ul>' +
				   '<li><a href="/web/computingnow/cloudcomputing/about">About Cloud</a></li>' +
				   '<li><a href="/web/computingnow/cloudcomputing/edboard">Editorial Board</a></li></ul></li>' +
			   '<li><a href="/csdl/mags/cd/index.html">BACK ISSUES</a></li>' +
			   '<li class="has-sub"><a href="/web/computingnow/writeforus">WRITE FOR US</a><ul>' +
				   '<li><a href="/web/peer-review/magazines">Author Guidelines</a></li>' +
				   '<li><a href="/web/computingnow/cfps/cc">Call for Papers</a></li>' +
				   '<li><a href="http://www.computer.org/web/computingnow/writeforus">Editorial Calendar</a></li>' +
				   '<li><a href="https://mc.manuscriptcentral.com/ccm-cs">Submit a Paper</a></li></ul></li>' +
				'</ul>'
};
