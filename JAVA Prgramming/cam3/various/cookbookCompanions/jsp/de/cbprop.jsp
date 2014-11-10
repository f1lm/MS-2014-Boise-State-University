<%@ include file="header.inc" %>

<%@ page import = "de.jugs.cookbook.jsp.CbpropButler" %>
<% CbpropButler butler = (CbpropButler)jspSession.getButler(CbpropButler.class); %>

<%@ include file="afterbf.inc" %>

<html>
<head>
   <title>Rezept-Eingabe</title>
   <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
   <meta name="Author" content="Christoph Müller">
   <%@ include file="headtags.inc" %>
</head>
<body>

<h1>
Rezept-Eingabe</h1>

<table CELLSPACING=0 CELLPADDING=4 COLS=1 WIDTH="100%" >
<tr>
<td class="subtitle">Das geh&ouml;rt alles dazu</td>
</tr>
</table>

<p>
<!-- <form method="POST" enctype="multipart/form-data"> --> <!-- usability see de.must.markup.MustMultipartRequest -->
<form method="POST">
<table COLS=2 WIDTH="100%" >
<tr>
<td>Rezept-Bezeichung:</td><td><%=butler.rezeptBez%></td>
</tr><tr>
<td>Rezept-Typ:&nbsp;</td><td><%=butler.typ%> <%=butler.diabetiker%></td>
</tr><tr>
<td>Zutaten:</td><td><%=butler.zutaten%></td>
</tr><tr>
<td>Zubereitung:</td><td><%=butler.zubereit%></td>
</tr><tr>
<td>Quelle:</td><td><%=butler.quelle%></td>
</tr><tr>
<td>Vom:</td><td><%=butler.vom%></td>
<!-- </tr><tr>
<td>Bild:</td><td><%=butler.imageFile%></td> --> <!-- usability see de.must.markup.MustMultipartRequest -->
</tr>
</table>

<p><%=butler.okButton%> <%=butler.cancelButton%>
</form>
</body>
</html>