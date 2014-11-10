<%@ page import = "de.jugs.cookbook.jsp.JspSession" %>
<jsp:useBean id="jspSession" class = "de.jugs.cookbook.jsp.JspSession" scope="session"/>
<% jspSession.takeNote(request); %>