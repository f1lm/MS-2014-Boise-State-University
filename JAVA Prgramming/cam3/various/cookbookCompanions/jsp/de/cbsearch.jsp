<%@ include file="header.inc" %>

<%@ page import = "de.jugs.cookbook.jsp.CbsearchButler" %>
<% CbsearchButler butler = (CbsearchButler)jspSession.getButler(CbsearchButler.class); %>

<%@ include file="afterbf.inc" %>

<html>
<head>
   <title>Rezept-Suche</title>
   <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
   <meta name="Author" content="Christoph Müller">
   <%@ include file="headtags.inc" %>
</head>
<body>

<h1>
Rezept-Suche</h1>

<table CELLSPACING=0 CELLPADDING=4 COLS=1 WIDTH="100%" >
<tr>
<td class="subtitle">Finden Sie das gew&uuml;nschte Rezept</td>
</tr>
</table>

<p>Gesucht werden kann in einem Feld und in mehreren Feldern in Kombination.
Bei der Suche in mehreren Feldern werden nur Rezepte angezeigt, die allen
Bedingungen gen&uuml;gen (Und-Verkn&uuml;pfung).
<p>
<form method="POST">
<table COLS=2 WIDTH="100%" >
<tr>
<!--   -->
<td>Rezept-Typ:&nbsp;</td><td><%=butler.typ%></td>
</tr><tr>
<td>Rezept-Bezeichung:</td><td><%=butler.rezeptBez%></td>
</tr><tr>
<td>Zutaten:</td><td><%=butler.zutaten%></td>
</tr>
</table>

<p><%=butler.searchButton%> <%=butler.backButton%>
</form>
</body>
</html>