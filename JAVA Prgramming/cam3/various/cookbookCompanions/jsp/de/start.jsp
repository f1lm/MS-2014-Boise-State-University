<%@ include file="header.inc" %>

<%@ page import = "de.jugs.cookbook.jsp.StartButler" %>
<% StartButler butler = (StartButler)jspSession.getButler(StartButler.class); %>

<%@ include file="afterbf.inc" %>

<html>
<head>
   <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
   <meta name="Author" content="Christoph Müller">
   <meta name="GENERATOR" content="Mozilla/4.5 [de] (WinNT; I) [Netscape]">
   <title>Kochbuch Startseite</title>
   <%@ include file="headtags.inc" %>
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
Willkommen beim Kochbuch</h1>

<div align=right><font size=+0><a href="../en/start.jsp">This site in
English</a></font></div>

<table CELLSPACING=0 CELLPADDING=4 COLS=1 WIDTH="100%" >
<tr>
<td class="subtitle">Beispielanwendung mit JavaServerPages und Cameleon
OSP</td>
</tr>
</table>

<p><img SRC="../../images/toaster.jpg" NOSAVE BORDER=0 height=135 width=153 align=RIGHT>Dieses
Beispiel zeigt, wie man mit professioneller Technologie und dennoch einfach
Internetseiten mit Datenbank-Verwaltungen kombinieren kann.
<p>Zur Veranschaulichung wollen wir weltweit Kochrezept austauschen. Sie
k&ouml;nnen:
<blockquote>
<p><font size=+1><a href="<%=response.encodeRedirectURL("cbsearch.jsp")%>">Ein Rezept suchen</a></font>
<p><font size=+1><a href="<%=response.encodeRedirectURL("cbprop.jsp")%>">Ein Rezept eingeben</a></font>
</blockquote>
<br>&nbsp;
<table CELLSPACING=0 CELLPADDING=2 COLS=1 WIDTH="400" BGCOLOR="#FFB200" >
<tr>
<td>Wo ist diese Technik anwendbar?</td>
</tr>
</table>

<p>&Uuml;berall dort, wo Web-Seiten dynamisch werden sollen. Diese Variante
eignet sich sehr gut f&uuml;r indiviuelle, "durchgestylte" Web-Anwendungen.
Zugrunde liegt die Technologie JavaServerPages und das <a href="http://www.must.de/Jacomp.htm">Open
Source Framework Cameleon OSP</a>.
<br>&nbsp;
<br>&nbsp;
<table CELLSPACING=0 CELLPADDING=2 COLS=1 WIDTH="400" BGCOLOR="#FFF078" >
<tr>
<td>Und wenn Funktionalit&auml;t wichtiger als Design ist</td>
</tr>
</table>

<p>Es gibt auch eine n&uuml;chternere Variante, st&auml;rker kontrolliert
und von Java-Programmierern ohne Kenntnisse von HTML und JSP zu erstellen:
<center><form><input TYPE="button" VALUE="Musteranwendung" onClick="runSample()"></form></center>

</body>
</html>
