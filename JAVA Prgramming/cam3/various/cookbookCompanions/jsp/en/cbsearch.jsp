<%@ include file="header.inc" %>

<%@ page import = "de.jugs.cookbook.jsp.CbsearchButler" %>
<% CbsearchButler butler = (CbsearchButler)jspSession.getButler(CbsearchButler.class); %>

<%@ include file="afterbf.inc" %>

<html>
<head>
   <title>Recipe search</title>
   <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
   <meta name="Author" content="Christoph Müller">
   <%@ include file="headtags.inc" %>
</head>
<body>

<h1>
Recipe search</h1>

<table CELLSPACING=0 CELLPADDING=4 COLS=1 WIDTH="100%" >
<tr>
<td class="subtitle">Find a desired Recipe</td>
</tr>
</table>

<p>You may search using one or more fields. Searching in several fields
finds recipes which meet all criteria.
<p><form method="POST">
<table COLS=2 WIDTH="100%" >
<tr>
<td>Recipe Type:&nbsp;</td>

<td><%=butler.typ%></td>
</tr>

<tr>
<td>Recipe Title:</td>

<td><%=butler.rezeptBez%></td>
</tr>

<tr>
<td>Ingredients:</td>

<td><%=butler.zutaten%></td>
</tr>
</table>

<p><%=butler.searchButton%> <%=butler.backButton%>
</form>
</body>
</html>