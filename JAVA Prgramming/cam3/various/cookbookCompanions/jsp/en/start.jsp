<%@ include file="header.inc" %>

<%@ page import = "de.jugs.cookbook.jsp.StartButler" %>
<% StartButler butler = (StartButler)jspSession.getButler(StartButler.class); %>

<%@ include file="afterbf.inc" %>

<html>
<head>
   <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
   <meta name="Author" content="Christoph Müller">
   <meta name="GENERATOR" content="Mozilla/4.5 [de] (WinNT; I) [Netscape]">
   <title>Cookbook</title>
<link REL ="stylesheet" TYPE="text/css" HREF="default.css" TITLE="Style">
</head>
<body>
<script LANGUAGE="JavaScript">
<!--
function runSample() {
  myWindef = open('http://cs4.inf.uni-hohenheim.de/cookbook/servlet/de.jugs.cookbook.Main', 'cookbook', 'resizable=yes,scrollbars=yes,width=600,height=600,status=yes,location=no,menubar=no,toolbar=no');
  myWindef.focus();
}
//-->
</script>

<h1>
Welcome to Cookbook</h1>

<div align=right><font size=+0><a href="../de/start.jsp">Diese Seite in
Deutsch</a></font></div>

<table CELLSPACING=0 CELLPADDING=4 COLS=1 WIDTH="100%" >
<tr>
<td class="subtitle">Sample Application for JavaServerPages and Cameleon
OSP</td>
</tr>
</table>

<p><img SRC="..\..\images\toaster.jpg" BORDER=0 height=135 width=153 align=RIGHT>This
sample shows how to combine internet pages with databases administrations
in proffesional and nevertheless simple way.
<p>For plasticity we want to exchange recipes worldwide. You may:
<blockquote><font size=+1><a href="<%=response.encodeRedirectURL("cbsearch.jsp")%>">Search a recipe</a></font>
<p><font size=+1><a href="<%=response.encodeRedirectURL("cbprop.jsp")%>">Enter a recipe</a></font></blockquote>

<br>&nbsp;
<table CELLSPACING=0 CELLPADDING=2 COLS=1 WIDTH="400" BGCOLOR="#FFB200" >
<tr>
<td>Where to use this technology?</td>
</tr>
</table>

<p>You may use it anywhere to make Web pages dynamic. This variant is applicable
well for individually styled web applications. It's bases on JavaServerPages
technology and on the <a href="http://www.must.de/Jacomp.htm">Open Source
Framework Cameleon OSP</a>.
<br>&nbsp;
<br>&nbsp;
<table CELLSPACING=0 CELLPADDING=2 COLS=1 WIDTH="400" BGCOLOR="#FFF078" >
<tr>
<td>And if functionality is more important than design?</td>
</tr>
</table>

<p>There is another variant available. It's more rational further reaching
controlled and to be build by Java programmers without any knowledge about
JSP and HTML.

<center><form><input TYPE="button" VALUE="Sample Application" onClick="runSample()"></form></center>

</body>
</html>

