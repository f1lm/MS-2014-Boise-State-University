/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  Javascript language file to output a standard navigation "div" to all pages.  Allows the author to
 *   remove this javascript code from html files which have navigation panels on every page to avoid
 *   uneccessary code duplication.
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

function outputNavigation()   {
   document.write( "<div class='classnav'>" );
   document.write( "<center><b class='title'>Navigation</b></center>" );
   document.write( "<center><hr class='colorrule1' /></center>" );
   document.write( "<ul><li class='deco'><a href='index.html'    >Home</a></li>" );
   document.write( "<li class='deco'><a href='classnotes.html'   >Class Schedule</a></li>" );
   document.write( "<li class='deco'><a href='coursdocs.html'    >Course Docs</a></li>" );
   document.write( "<li class='deco'><a href='codingstds.html'   >Coding Stds</a></li>" );
   document.write( "<li class='deco'><a href='assignment.html'   >Assignments</a></li>" );
   document.write( "<li class='deco'><a href='analysispg.html'   >Analysis</a></li>" );
   document.write( "<li class='deco'><a href='umlnotes.html'     >UML Notes</a></li>" );
   document.write( "<li class='deco'><a href='bibliography.html' >Bibliography</a></li>" );
   document.write( "<li class='deco'><a href='acronyms.html'     >Acronyms</a></li>" );
   document.write( "<li class='deco'><a href='http://www.lmu.edu'>LMU Main</a></li>" );
   document.write( "</ul>" );
   document.write( "</div>" );
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  Toggles the visibility or invisibility of an element with a given URL ID.  This function uses the
 *   "getElementById() method to obtain a reference to the document, then toggles its visibility.  The
 *   intended use is for css classes so that groups of links can be expanded by clicking on them.
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
 function toggleVisibility( urlID )   {
    var target = document.getElementById( urlID );
    if( target.visible )   {
       target.visible       = false;
       target.style.display = 'none';
    }
    else
    {
       target.visible       = true;
       target.style.display = 'block';
    }
 }

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  Outputs a nice subsection header break "div" start.  The user must remember to insert a call to the
 *   next function as well, to insert the "end div".  Currently only textlevel 1 and 3 are supported.
 *   Textlevel 1 is indented around the left navigation pane, and textlevel 3 goes all the way to the
 *   left margin of the page.
 *
 *  WARNING: the horizontal rule tags use a color which looks nice but won't validate!!!
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
 function outputSectionHeader( titlestring, textlevel )   {
    if( textlevel == 1 )   {
       document.write( "<div class='abouttext1'><br />" );
       document.write( "<b class='title'>" + titlestring + "</b>" );
       document.write( "<hr class='colorrule1' align='left' />" );
       document.write( "</div>" );
       document.write( "<div class='abouttext1'>" );
    }
    else if( textlevel == 3 )   {
       document.write( "<div class='abouttext3'><br />" );
       document.write( "<b class='title'>" + titlestring + "</b>" );
       document.write( "<hr class='colorrule3' align='left' />" );
       document.write( "</div>" );
       document.write( "<div class='abouttext3'>" );
    }
 }

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  Outputs a closing "div" tag, along with two breaks, to gracefully end a div block.  Not really
 *   necessary, but it's nice for closure if you want it.  Can be used to close a div when you want
 *   to move a section over toward the left marging on the page (under the navigation panel div).
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
 function endDiv()   {
    document.write( "</div>" );
 }

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  Outputs an opening "div" tag, to start a new div block.  Can be used with the "endDiv()" function to
 *   move the text back to the margin on the page (under the navigation panel div).  Especially useful
 *   for times when the section header is not desired but a left-justified margin *is* desired.
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
 function leftDiv()   {
    document.write( "</div><br />" );
    document.write( "<div class='abouttext3'>" );
 }

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  Outputs tiny text at the bottom of the page.  Convenient way to update the latest version date so
 *   all the pages that use it look the same.
 *
 *  WARNING: the "datestring" argument must be in the format "yyyy-mm-dd hh:mm" for everything to work.
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
 function lastTouch( datestring )   {
    copyleft = "Copyright &copy; 2005-" + datestring.substring( 0, 4 );
    copyleft = copyleft + ", B.J. Johnson and Loyola Marymount University";
    document.write( "<hr class='colorrule2'>" );
    document.write( "<div class='tiny'>" );
    document.write( copyleft + "<br />" );
    document.write( "Last updated Thursday, " + datestring + "<br />" );
    document.write( "Not optimized for any particular browser.<br />" );
    document.write( "Readers should infer that the use of feminine pronouns applies to both genders." );
    document.write( "</div>" );
 }
