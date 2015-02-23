<%@ include file="header.inc" %>

<%@ page import = "de.jugs.cookbook.jsp.CblistButler" %>
<% CblistButler butler = (CblistButler)jspSession.getButler(CblistButler.class); %>

<%@ include file="afterbf.inc" %>

<html>
<head>
   <title>Gefundene Rezepte</title>
   <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
   <meta name="Author" content="Christoph Müller">
   <%@ include file="headtags.inc" %>
</head>
<body>

<h1>
Gefundene Rezepte</h1>

<table CELLSPACING=0 CELLPADDING=4 COLS=1 WIDTH="100%" >
<tr>
<td class="subtitle">Folgende Rezepte entsprechen Ihrer Auswahl</td>
</tr>
</table>

<p>Klicken Sie auf die Rezept-Bezeichnung, um weitere Details anzuzeigen.
<p>
<form method="POST">

<table COLS=1 WIDTH="100%">
<% while(butler.isFurtherRowToAppend()) { %>
<tr>
<td><%=butler.getRezeptBezWithLink()%></td>
</tr>
<% } %>
</table>

<p><%=butler.backButton%>

</form>
</body>
</html>
