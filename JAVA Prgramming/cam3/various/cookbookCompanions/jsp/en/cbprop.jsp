<%@ include file="header.inc" %>

<%@ page import = "de.jugs.cookbook.jsp.CbpropButler" %>
<% CbpropButler butler = (CbpropButler)jspSession.getButler(CbpropButler.class); %>

<%@ include file="afterbf.inc" %>

<html>
<head>
   <title>Enter a Recipe</title>
   <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
   <meta name="Author" content="Christoph Müller">
   <%@ include file="headtags.inc" %>
</head>
<body>

<h1>
Enter a Recipe</h1>

<table CELLSPACING=0 CELLPADDING=4 COLS=1 WIDTH="100%" >
<tr>
<td class="subtitle">Things needed to cook it</td>
</tr>
</table>

<p>
<!-- <form method="POST" enctype="multipart/form-data"> --> <!-- usability see de.must.markup.MustMultipartRequest -->
<form method="POST">
<table COLS=2 WIDTH="100%" >
<tr>
<td>Recipe Title:</td><td><%=butler.rezeptBez%></td>
</tr><tr>
<td>Recipe Type:&nbsp;</td><td><%=butler.typ%> <%=butler.diabetiker%></td>
</tr><tr>
<td>Ingredients:</td><td><%=butler.zutaten%></td>
</tr><tr>
<td>Preparation:</td><td><%=butler.zubereit%></td>
</tr><tr>
<td>Source:</td><td><%=butler.quelle%></td>
</tr><tr>
<td>Origine (Date):</td><td><%=butler.vom%></td>
<!-- </tr><tr>
<td>Bild:</td><td><%=butler.imageFile%></td> --> <!-- usability see de.must.markup.MustMultipartRequest -->
</tr>
</table>

<p><%=butler.okButton%> <%=butler.cancelButton%>
</form>
</body>
</html>