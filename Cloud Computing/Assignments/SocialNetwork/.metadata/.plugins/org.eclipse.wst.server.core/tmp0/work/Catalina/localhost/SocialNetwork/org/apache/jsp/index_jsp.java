/*
 * Generated by the Jasper component of Apache Tomcat
 * Version: Apache Tomcat/8.0.12
 * Generated at: 2014-09-22 10:10:46 UTC
 * Note: The last modified time of this file was set to
 *       the last modified time of the source file after
 *       generation to assist with modification tracking.
 */
package org.apache.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class index_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final javax.servlet.jsp.JspFactory _jspxFactory =
          javax.servlet.jsp.JspFactory.getDefaultFactory();

  private static java.util.Map<java.lang.String,java.lang.Long> _jspx_dependants;

  private javax.el.ExpressionFactory _el_expressionfactory;
  private org.apache.tomcat.InstanceManager _jsp_instancemanager;

  public java.util.Map<java.lang.String,java.lang.Long> getDependants() {
    return _jspx_dependants;
  }

  public void _jspInit() {
    _el_expressionfactory = _jspxFactory.getJspApplicationContext(getServletConfig().getServletContext()).getExpressionFactory();
    _jsp_instancemanager = org.apache.jasper.runtime.InstanceManagerFactory.getInstanceManager(getServletConfig());
  }

  public void _jspDestroy() {
  }

  public void _jspService(final javax.servlet.http.HttpServletRequest request, final javax.servlet.http.HttpServletResponse response)
        throws java.io.IOException, javax.servlet.ServletException {

final java.lang.String _jspx_method = request.getMethod();
if (!"GET".equals(_jspx_method) && !"POST".equals(_jspx_method) && !"HEAD".equals(_jspx_method) && !javax.servlet.DispatcherType.ERROR.equals(request.getDispatcherType())) {
response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED, "JSPs only permit GET POST or HEAD");
return;
}

    final javax.servlet.jsp.PageContext pageContext;
    javax.servlet.http.HttpSession session = null;
    final javax.servlet.ServletContext application;
    final javax.servlet.ServletConfig config;
    javax.servlet.jsp.JspWriter out = null;
    final java.lang.Object page = this;
    javax.servlet.jsp.JspWriter _jspx_out = null;
    javax.servlet.jsp.PageContext _jspx_page_context = null;


    try {
      response.setContentType("text/html; charset=ISO-8859-1");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;

      out.write("\n");
      out.write("<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">\n");
      out.write("<html>\n");
      out.write("<head>\n");
      out.write("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=ISO-8859-1\">\n");
      out.write("<title>Social Networking Site by Milson Munakami \"Milstein\"</title>\n");
      out.write("<script type=\"text/javascript\" src=\"js/jquery-1.11.1.min.js\"></script>\n");
      out.write("<script type=\"text/javascript\" src=\"js/jquery.validate.min.js\"></script>\n");
      out.write("<script type=\"text/javascript\" src=\"js/jquery.tipsy.js\"></script>\n");
      out.write("<script type=\"text/javascript\" src=\"js/validateindex.js\"></script>\n");
      out.write("\n");
      out.write("<link rel=\"stylesheet\" href=\"css/style.css\" type=\"text/css\" />\n");
      out.write("<link rel=\"stylesheet\" href=\"css/tipsy.css\" type=\"text/css\" />\n");
      out.write("</head>\n");
      out.write("<body>\n");
      out.write("\t<div class=\"index_container\">\n");
      out.write("\t\t<div>\n");
      out.write("\t\t\t<img src=\"icons/header.jpg\" id=\"header\">\n");
      out.write("\t\t</div>\n");
      out.write("\t\t<div id=\"form_holder\">\n");
      out.write("\t\t\t<div class=\"form_login\">\n");
      out.write("\t\t\t\t<h3>Curious? Sign in fast.</h3>\n");
      out.write("\t\t\t\t<form id=\"signinForm\" action=\"REST/user/login\" method=\"POST\">\n");
      out.write("\t\t\t\t\t<label for=\"signin_email\">Email/ Username :</label>\n");
      out.write("\t\t\t\t\t<div>\n");
      out.write("\t\t\t\t\t\t<input id=\"signin_email\" type=\"text\" name=\"email\" class=\"input\" minlength=\"2\"\n");
      out.write("\t\t\t\t\t\t\trequired>\n");
      out.write("\t\t\t\t\t</div>\n");
      out.write("\t\t\t\t\t<br /> <label for=\"signin_password\">Password :</label>\n");
      out.write("\t\t\t\t\t<div>\n");
      out.write("\t\t\t\t\t\t<input id=\"signin_password\" type=\"password\" name=\"password\"\n");
      out.write("\t\t\t\t\t\t\tclass=\"input\" minlength=\"5\" maxlength=\"12\" required>\n");
      out.write("\t\t\t\t\t</div>\n");
      out.write("\t\t\t\t\t<div>\n");
      out.write("\t\t\t\t\t\t<input type=\"submit\" value=\"Sign In\" class=\"btn signin_btn\">\n");
      out.write("\t\t\t\t\t</div>\n");
      out.write("\t\t\t\t</form>\n");
      out.write("\t\t\t\t");

					String message = request.getParameter("msg");
					if (message != null) {
				
      out.write("\n");
      out.write("\t\t\t\t<br />\n");
      out.write("\t\t\t\t<div class=\"error_msg\" id=\"divemailpwdverify\">Email and\n");
      out.write("\t\t\t\t\tPassword do not match.</div>\n");
      out.write("\t\t\t\t");

					}
				
      out.write("\n");
      out.write("\t\t\t</div>\n");
      out.write("\n");
      out.write("\t\t\t<div class=\"form_signup\">\n");
      out.write("\t\t\t\t<h2>Stay connected</h2>\n");
      out.write("\t\t\t\t<h3>It's free and always will be.</h3>\n");
      out.write("\n");
      out.write("\t\t\t\t<form id=\"signupForm\" action=\"REST/user/Register\" method=\"POST\">\n");
      out.write("\t\t\t\t\t<label for=\"first_name\">First name :</label>\n");
      out.write("\t\t\t\t\t<div>\n");
      out.write("\t\t\t\t\t\t<input id=\"first_name\" type=\"text\" name=\"firstname\" class=\"input\"\n");
      out.write("\t\t\t\t\t\t\tminlength=\"2\" required>\n");
      out.write("\t\t\t\t\t</div>\n");
      out.write("\t\t\t\t\t<label for=\"last_name\">Last name :</label>\n");
      out.write("\t\t\t\t\t<div>\n");
      out.write("\t\t\t\t\t\t<input id=\"last_name\" type=\"text\" name=\"lastname\" class=\"input\"\n");
      out.write("\t\t\t\t\t\t\tminlength=\"2\" required>\n");
      out.write("\t\t\t\t\t</div>\n");
      out.write("\t\t\t\t\t<br /> <label for=\"username\">User name :</label>\n");
      out.write("\t\t\t\t\t<div>\n");
      out.write("\t\t\t\t\t\t<input id=\"username\" type=\"username\" name=\"username\" class=\"input\"\n");
      out.write("\t\t\t\t\t\t\trequired>\n");
      out.write("\t\t\t\t\t</div>\n");
      out.write("\t\t\t\t\t<br /> <label for=\"signup_email\">Email Address :</label>\n");
      out.write("\t\t\t\t\t<div>\n");
      out.write("\t\t\t\t\t\t<input id=\"signup_email\" type=\"email\" name=\"email\" class=\"input\"\n");
      out.write("\t\t\t\t\t\t\trequired>\n");
      out.write("\t\t\t\t\t</div>\n");
      out.write("\t\t\t\t\t<br /> <label for=\"signup_password\">Password :</label>\n");
      out.write("\t\t\t\t\t<div>\n");
      out.write("\t\t\t\t\t\t<input id=\"signup_password\" type=\"password\" name=\"password\"\n");
      out.write("\t\t\t\t\t\t\tclass=\"input\" minlength=\"5\" maxlength=\"12\" required>\n");
      out.write("\t\t\t\t\t</div>\n");
      out.write("\t\t\t\t\t<div>\n");
      out.write("\t\t\t\t\t\t<input type=\"submit\" value=\"Sign Up\" class=\".btn signup_btn\">\n");
      out.write("\t\t\t\t\t</div>\n");
      out.write("\t\t\t\t</form>\n");
      out.write("\t\t\t\t");

					String error = request.getParameter("error");
					if (error != null) {
				
      out.write("\n");
      out.write("\t\t\t\t<br />\n");
      out.write("\t\t\t\t<div class=\"error_msg\" id=\"divemailalready\">Username/ Email address\n");
      out.write("\t\t\t\t\talready registered.</div>\n");
      out.write("\t\t\t\t");

					}
				
      out.write("\n");
      out.write("\t\t\t</div>\n");
      out.write("\n");
      out.write("\t\t</div>\n");
      out.write("\t\t<div id=\"footer\">\n");
      out.write("\t\t\t&copy; Milson Munakami | <b><a href=\"http://www.milson.com.np\"\n");
      out.write("\t\t\t\ttarget=\"_blank\">Milstein</a></b>\n");
      out.write("\t\t</div>\n");
      out.write("\t</div>\n");
      out.write("</body>\n");
      out.write("</html>");
    } catch (java.lang.Throwable t) {
      if (!(t instanceof javax.servlet.jsp.SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          try {
            if (response.isCommitted()) {
              out.flush();
            } else {
              out.clearBuffer();
            }
          } catch (java.io.IOException e) {}
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
        else throw new ServletException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}
