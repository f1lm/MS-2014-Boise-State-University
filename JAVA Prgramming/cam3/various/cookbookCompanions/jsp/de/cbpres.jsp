<%@ include file="header.inc" %>

<%@ page import = "de.jugs.cookbook.jsp.CbpresButler" %>
<% CbpresButler butler = (CbpresButler)jspSession.getButler(CbpresButler.class); %>

<%@ include file="afterbf.inc" %>

<html>
<head>
   <title>Rezept-Details</title>
   <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
   <meta name="Author" content="Christoph Müller">
   <%@ include file="headtags.inc" %>
</head>
<body>

<h1>
Rezept-Details</h1>

<table CELLSPACING=0 CELLPADDING=4 COLS=1 WIDTH="100%" >
<tr>
<td class="subtitle">Das geh&ouml;rt alles dazu</td>
</tr>
</table>

<p>
<form method="POST">
<table COLS=2 WIDTH="100%" >
<tr>
<td valign=top>Rezept-Bezeichung:</td><td><%=butler.getRezeptBez()%></td>
</tr><tr>
<td valign=top>Rezept-Typ:&nbsp;</td><td><%=butler.getTyp()%> <%=butler.getDiabetiker()%></td>
</tr><tr>
<td valign=top>Zutaten:</td><td><%=butler.getZutaten()%></td>
</tr><tr>
<td valign=top>Zubereitung:</td><td><%=butler.getZubereit()%></td>
</tr><tr>
<td valign=top>Quelle:</td><td><%=butler.getQuelle()%></td>
</tr><tr>
<td valign=top>Vom:</td><td><%=butler.getVom()%></td>
</tr>
</table>

<%=butler.getSampleImage()%>

<p><%=butler.backButton%>
</form>
</body>
</html>