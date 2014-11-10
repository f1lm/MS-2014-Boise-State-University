/* 2013-03-18 Server & Management */
.layout.active .layout-region.right-sidebar {
	min-width: 0 !important;
	width: 230px !important;
}
.content-fragment.blog-feedback-list .content-list-name {
	font-size: inherit;
}
html {
	font-size: 1em;
}
a:focus {outline: medium;}
body {
  color: #424242;
  font-size: 0.8125em/*12px*/ !important;
  line-height: 1.25 !important;
  padding: 0 3px 0 4px;
}

body, html {
	font-family: 'Segoe UI','Lucida Grande',Verdana,Arial,Helvetica,sans-serif;
}

a:link, a:visited, a:active {
  color: #00749e;
  font-weight: normal;
  outline: none;
  text-decoration: none;
}
a:hover, a:focus {
	text-decoration: underline;
}
a:visited {
  color: #707070;
}

img,
a img {
  border: 0;
}

h2 a {
	color: #707070;
}

h2 a:hover {
	text-decoration: none;
}

.header-fragments,
.content-fragment-page,
.layout-region.header {
  background: none;
  padding: 0;
}

/* Begin sign in, sign out, settings */
.wireframe-header-fragment-outer.wireframe-top-bar {
  height: auto;
  overflow: hidden;
}

.wireframe-header-fragment-outer.wireframe-top-bar a {
  font-size: 12px !important;
}

.header-fragment.welcome-message {
  height: auto;
  line-height: 19px;
  overflow: hidden;
}

.header-fragment.login-logout .navigation-list {
  line-height: 19px;
}

.header-fragment.login-logout,
.header-fragment.user-welcome-without-login,
.header-fragment.login-logout .navigation-item a,
.header-fragment.user-welcome-without-login a,
.header-fragment.user-welcome-without-login .navigation-item a,
.header-fragment.user-welcome-without-login .user-name {
  color: #717171;
  height: auto;
  font-weight: normal;
  margin: 0;
  padding: 0;
  text-decoration: none;
}

.header-fragment.user-welcome-without-login .navigation-list {line-height: 1; position: relative; top: -5px; margin-top: 13px\9/*IE adjustment*/;}
@-moz-document url-prefix() {.header-fragment.user-welcome-without-login .navigation-list {margin-top: 13px;}}
*:first-child+html .header-fragment.user-welcome-without-login .navigation-list {line-height: 1.35; top: -12px;}
*:first-child+html .header-fragment.user-welcome-without-login {top: -5px;}


.header-fragments .navigation-list .navigation-item {padding: 0;}

.header-fragment.login-logout {margin-top: 5px;}
.header-fragment.user-welcome-without-login  {max-width: 247px; width: auto;}
.header-fragment.user-welcome-without-login .avatar {
    left: 0;
    position: relative;
}

.header-fragment.user-welcome-without-login .avatar,
.header-fragment.user-welcome-without-login .user-name,
.header-fragment.user-welcome-without-login .navigation-list
{
	float: left;
}
.header-fragment.login-logout,
.header-fragment.user-welcome-without-login {position: relative; top: 3px; height: 28px;}
.header-fragment.user-welcome-without-login .user-name {width: auto; max-width: 164px; margin: 1px 10px 0 2px;}
.header-fragment.user-welcome-without-login .user-name a.internal-link.view-user-profile {display: block; line-height: 1.18; height: 27px; display: table-cell; vertical-align: middle;}


.header-fragment.user-welcome-without-login .avatar img {
}

.header-fragment.login-logout .navigation-item a {
  margin: 0 10px 0 7px;
}

.header-fragment.login-logout .navigation-item .internal-link.live-id-button a {
	margin-right: 0;
}

.header-fragment.login-logout .navigation-item a:hover,
.header-fragment.user-welcome-without-login a:hover,
.header-fragment.user-welcome-without-login .navigation-item a:hover {
  text-decoration: underline;
}
/* End sign in, sign out, settings */
.site-banner .internal-link.edit-page, .site-banner .internal-link.save-page {
  top: -55px;
}

.layout,
.page-tabs,
.admin-bar .navigation-list,
.admin-bar fieldset.field-list,
.wireframe-header-fragment-inner,
.poweredby-wrapper,
.footer-fragments,
.footer-fragments-header,
.footer-fragments-footer,
.header-fragments {
	background: none;
	margin: 0 auto;
	min-width: 0;
	max-width: 960px;
	width: 960px;
}

.header-fragments {
	margin: 18px auto 9px;
}

.footer-fragments {
	border-top: solid 1px #ccc;
}

.header-left {
  float: left;
}

.header-emblem {
  float: left;
  padding-top: 7px;
}

.header-emblem a {
  display: block;
  height: 36px;
  width: 36px;
}

h1.header-title {
  font-size: 24px;
  font-weight: bold;
  line-height: 30px;
  margin: 0 0 0 44px;
  padding: 0;
}

h1.header-title a {
  color: #000;
  font-weight: bold !important;
  text-decoration: none;
}

.header-subtitle {
  font-size: 12px;
  line-height: 15px;
  margin: 0 0 0 44px;
  padding: 0;
}

.header-subtitle a {
  color: #717171;
  text-decoration: none;
}

.header-right {
  float: right;
}

.header-product-logos {
  padding-top: 8px;
}

.content-fragment-page {
	margin: 0 auto 30px;
}

.layout-region-inner.header .html-content .html-content,
.layout-region-inner.header .html-content .raw-html {
  display: none;
}

.layout-content.header-top-content-left-sidebar-right .layout-region.content {
  background: #fff;
  width: 720px;
  line-height: 1.45;
  overflow: visible;
  float: left;
}
.layout-content.header-top-content-left-sidebar-right .layout-region.content, .content-fragment.blog-post-list .content-list.standard .post-summary, .abbreviated-post .post-summary {line-height: 1.45;}

.full-post .post-content p {
	font-size: 1em;
}

/* Begin breadcrumbs */
.layout-region.header .content-fragment.blog-bread-crumbs {
  display: none;
}
#stb-breadcrumbs {max-width: 645px; position: relative;}
#stb-breadcrumbs .breadcrumb-list {font-size: 14px; position: absolute; top: -34px;}
#stb-breadcrumbs .breadcrumb-list .breadcrumb-item {margin: 0;}
#stb-breadcrumbs .breadcrumb-list .breadcrumb-item a {font-weight: normal;}
/* End breadcrumbs */

.content-fragment.blog-post-list div.filter {
  border-bottom: 1px solid #d0d2d3;
  font-size: 12px;
  line-height: 16px;
  margin: 0;
  padding: 5px 0;
}

.content-fragment.blog-post-list .filter .view-type {
  left: 0;
  top: 5px;
}

.content-fragment.blog-post-list .filter .view-type .filter-option {
  margin: 0;
  padding: 4px;
}

.content-fragment.blog-post-list .filter .view-type .filter-option.selected {
  border: 0;
  background: #00368a;
}

.content-fragment.blog-post-list .filter .view-type .filter-option a {
  padding: 14px 0 0 0;
  width: 14px;
}

.content-fragment.blog-post-list .filter .view-type .filter-option a.view-list {
  background-image: url(http://blogs.technet.com/cfs-filesystemfile.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-00-94-25/8713.icon_2D00_viewtypes.png);
}

.content-fragment.blog-post-list .filter .view-type .filter-option.selected a.view-list {
  background-position: 0 -14px;
}

.content-fragment.blog-post-list .filter .view-type .filter-option a.view-detail-list {
  background-image: url(http://blogs.technet.com/cfs-filesystemfile.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-00-94-25/8713.icon_2D00_viewtypes.png);
  background-position: 0 -28px;
}

.content-fragment.blog-post-list .filter .view-type .filter-option.selected a.view-detail-list {
  background-position: 0 -42px;
}

.content-fragment.blog-post-list .filter .query-type {
  color: #adaeaf;
  padding: 4px 0;
  text-align: right;
}

.content-fragment.blog-post-list .query-type span.filter-label {
  color: #adaeaf;
  font-weight: normal;
}

.content-fragment.blog-post-list .query-type span.filter-option.selected a {
  color: #00368a;
  font-weight: bold;
  text-decoration: none;
}

.abbreviated-post {
  padding: 12px 0;
}

.abbreviated-post .post-author, .abbreviated-post .post-date, .abbreviated-post .post-application, .abbreviated-post .post-actions {
    font-size: 0.917em/*11px*/;
}

.content-fragment.blog-post-list .content-list.standard .post-application {
  display: none;
}

.content-fragment.blog-post-list .content-list.standard .content-item h4.post-name, .content-fragment.with-header .content-fragment-header div, .content-fragment-page.postlist .content-fragment.blog-banner .application-banner .application-name {
  line-height: 1.5;
  margin-bottom: 8px;
  overflow: hidden;
  font-weight: normal;
  margin-right: 0;
}

.content-fragment-page.post .content-fragment.blog-post .full-post {
  margin-top: 0;
}

.content-fragment.blog-post .full-post .post-name {
  font-size: 2em/*24px*/;
  line-height: 1.25;
  font-weight: normal;
  margin: 0 0 15px;
}

.content-fragment.blog-post-list .content-list.standard .content-item .post-name {
  font-size: 1.538461538461538em/*20px*/;
  margin-bottom: 0;
}

.content-fragment.blog-post-list .content-list.standard .content-item .post-name a {
  text-decoration: none;
}
a.internal-link.view-post {
    display: inline;
}
.content-fragment.blog-post-list .content-list.standard .content-item .post-attributes .attribute-list .post-reply-count .attribute-value,
*:first-child+html a.internal-link.view-post {
    display: inline;
	zoom: 1;
}

.content-fragment.blog-post-list .content-list.standard .content-item .post-name a:hover {
  text-decoration: underline;
}

.content-fragment.blog-post-list .content-list.standard .post-attributes,
.content-fragment.blog-post-list .content-list.standard .content-item .post-attributes .attribute-list .post-reply-count .attribute-value,
.content-fragment.blog-post-list .content-list.standard .content-item .post-attributes .attribute-list .post-reply-count .attribute-name,
.abbreviated-post .post-author, .abbreviated-post .post-date, .abbreviated-post .post-application, .abbreviated-post .post-actions {
  color: #707070;
  display: inline;
  font-weight: normal;
}

.content-fragment.blog-post-list .content-list.standard .content-item .post-attributes, .content-fragment.blog-post-list .content-list.standard .post-rating {
    margin-left: 6px;
    padding-right: 0;
}

.content-fragment.blog-post-list .content-list.standard .content-item .post-attributes .attribute-list .post-reply-count .attribute-value {
    font-size: 0.917em/*11px*/;
	margin-left: 21px;
	padding-left: 18px;
	min-height: 15px;
	display: inline-block;
}

.content-fragment.blog-post-list .content-list.standard .content-item .post-attributes .attribute-list .post-reply-count .attribute-value,
.content-fragment.blog-post .full-post .post-attributes {
  background: url(http://blogs.technet.com/cfs-filesystemfile.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-00-94-25/7282.icon_2D00_comments.png) 0 50% no-repeat;
  border: 0;
}

.abbreviated-post .avatar,
.content-fragment.blog-post .full-post .post-author .avatar {
  display: none;
}

.content-fragment.blog-post-list .content-list.standard .post-attributes {
  display: inline;
  position: static;
  top: 0;
  left: 0;
}

.content-fragment.blog-post-list .content-list.standard .post-rating {
  color: #707070;
  float: right;
  position: static;
  padding-top: 5px;
  top: 0;
  left: 0;
}

.content-fragment.blog-post .full-post .post-rating {
  margin-top: -13px;
}

//.content-fragment.blog-post-list .content-list.standard .post-rating,
//.content-fragment.blog-post .full-post .post-rating

.content-fragment.blog-post-list .content-list.standard .post-attributes {
	position: static;
	top: 0;
	text-transform: lowercase;
}

.content-fragment.blog-post .full-post .post-author,
.content-fragment.blog-post .full-post .post-date,
.content-fragment.blog-post .full-post .post-attributes {
  color: #707070;
  display: block;
  float: left;
  margin: 0 0 12px;
  padding: 0 16px;
  font-weight: normal;
}

.content-fragment.blog-post .full-post .post-author {
  background: url(http://blogs.technet.com/cfs-filesystemfile.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-00-94-25/2477.icon_2D00_author.png) 0 50% no-repeat;
}

.content-fragment.blog-post .full-post .post-date {
  background: url(http://blogs.technet.com/cfs-filesystemfile.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-00-94-25/1033.icon_2D00_date.png) 0 50% no-repeat;
}

.content-fragment.blog-post .full-post .post-date .value {
  margin: 0;
}



.content-fragment.blog-post .full-post .post-attributes .attribute-list {
  background: none;
  font-size: 12px;
  margin: 0;
}

.content-fragment.blog-post .full-post .post-attributes .attribute-list .post-reply-count .attribute-value {
  font-size: 12px;
  font-weight: normal;
  margin: 0;
}

.content-fragment.blog-post-list .content-list.standard .post-attributes .post-reply-count .attribute-value {
  margin-left: 0;
}

.abbreviated-post .attribute-list-header,
.abbreviated-post .attribute-list-footer {
  display: none;
}

.content-fragment.blog-post-list .content-list.standard .post-summary, 
.abbreviated-post .post-summary {
  padding-top: 6px;
}

.abbreviated-post .post-content {
  overflow: hidden;
  padding-bottom: 50px;
  border-bottom: 1px solid #d0d2d3;
}

.content-fragment.blog-post .full-post .post-content {
  border-top: 1px solid #d0d2d3;
  clear: both;
  margin-top: 24px;
  padding: 0;
}

.post-content,
.post-content span {
}

.post-content span {
  /*font-family: Segoe, "Segoe UI", Helvetica, Arial, sans-serif !important;*/
}

.captcha-blog-post-comment-form {
  background: #f0f3f8;
  overflow: hidden;
  padding: 20px;
}
.message.success {
  border: 0;
  background-color: #f0f3f8;
}

fieldset.field-list {
  margin: 0;
}

.captcha-blog-post-comment-form .field-list-description,
.content-fragment.blog-feedback-list .content-list-name .internal-link.rss
{
	color: #00368a;
	font: bold 16px/1.214 'Segoe UI Bold','Segoe UI','Lucida Grande',Verdana,Arial,Helvetica,sans-serif;
}

.captcha-blog-post-comment-form .field-list-description {
  display: block;
  padding-bottom: 10px;
}

.captcha-blog-post-comment-form ul {
  clear: both;
  list-style: none;
  margin: 0;
  padding: 0;
}

.captcha-blog-post-comment-form li {
  margin: 0 0 1em;
  padding: 0;
}

.captcha-blog-post-comment-form input {
  border: 1px solid #ccc;
  display: block;
  font-size: 13px;
  margin-top: 2px;
  padding: 5px;
}

.captcha-blog-post-comment-form input[type=text] {
  width: 50%;
}

.captcha-blog-post-comment-form textarea,
.field-item.post-body .field-item-input textarea {
  border: 1px solid #ccc;
  font-family: 'Segoe UI','Lucida Grande',Verdana,Arial,Helvetica,sans-serif;
  font-size: 13px;
  margin-top: 2px;
  padding: 5px;
  width: 668px;
}

.content-fragment.captcha-blog-post-comment-form .internal-link.add-reply {
  background: #00368a;
  border: 0;
  color: #fff;
  display: block;
  float: left;
  font-size: 1.333em;
  line-height: 1;
  margin-left: 0;
  padding: 8px 22px;
  text-decoration: none;
  vertical-align: middle;
}

.content-fragment.captcha-blog-post-comment-form .internal-link.add-reply:hover {background: #01265f;}

.content-fragment.captcha-blog-post-comment-form .internal-link.add-reply span {
  display: none;
}

.blog-feedback-list {
  padding: 20px 0 120px;
}

.content-fragment.blog-feedback-list .content-list-name .internal-link.rss {
  color: #00368a;
  display: inline-block;
  margin: 0;
  padding-bottom: 10px;
  text-decoration: none;
}
*:first-child+html .content-fragment.blog-feedback-list .content-list-name .internal-link.rss {display: inline; zoom: 1;}

.content-fragment.blog-feedback-list .content-list-name .internal-link.rss span {
  display: none;
}

.blog-feedback-list .full-post-header {
  display: none;
}

.content-fragment.blog-feedback-list .content-list {
  clear: both;
  list-style: none;
  margin: 0;
  padding: 0;
}

.blog-feedback-list li {
  border-top: 1px solid #ccc;
  margin: 0;
  padding: 0;
}

.blog-feedback-list .post-actions li {
  border: 0;
}

.content-fragment.blog-feedback-list .wireframe-full-post-outer {
  margin-left: 42px;
}

.content-fragment.blog-feedback-list .full-post {
  border: 0;
  margin: 0;
  padding: 0;
}

.content-fragment.blog-feedback-list .full-post .post-content {
  border: 0;
  margin: 0;
  padding: 0;
}

.blog-feedback-list .post-author {
  float: left;
  height: 32px;
  line-height: 32px;
  padding-top: 10px;
}

.blog-feedback-list .post-author a {
  font-weight: bold;
}

.content-fragment.blog-feedback-list .full-post .post-author .avatar {
  border: 0;
  left: -42px;
  margin: 0;
  padding: 0;
  top: 10px;
}

.content-fragment.blog-feedback-list .full-post .post-date {
  top: 19px;
  color: #2a2a2a;
}

.blog-feedback-list .post-content {
  clear: both;
}

.profile-usercard {
  display: none;
}

.content-fragment.blog-post-list .pager ,
.content-fragment.blog-feedback-list .pager,
.content-fragment-page.taglist .pager {
	padding: 15px 0 10px;
	float: left;
	border-top: solid 1px #ccc;
	width: 720px;
	text-align: left;
}
.content-fragment.blog-post-list .pager {
	margin: -42px 0 0;
}

.copyright-info {padding-left: 0;}
.footer-fragments {margin-bottom: 50px;}

.pager a:link,
.pager a:visited,
.pager a:active {
  background: 0;
  border: 0;
  font-size: 1em;
  margin: 0 0 0 15px;
  padding: 0;
  text-decoration: none;
}
.pager a.selected {font-weight: bold !important;}
.pager a.selected:hover{cursor: default; text-decoration: none;}
.pager span.summary + a {margin-left: 0;}

.pager a:hover {text-decoration: underline;}
.content-list.standard {
	padding-bottom: 70px;
}

.layout-content.header-top-content-left-sidebar-right .layout-region.right-sidebar .content-fragment.blog-post-list .content-list.simple .post-name {
	font-size: inherit;
}

.layout-content.header-top-content-left-sidebar-right .layout-region.right-sidebar {
	float: right;
	padding-left: 0;
	width: 220px;
}

.content-fragment {
  margin: 0;
}

.right-sidebar .content-fragment {
  margin-bottom: 20px;
}

.right-sidebar .content-fragment.tag-cloud,
.right-sidebar .content-fragment.blog-archive-list {
  margin-bottom: 0;
}
.content-fragment-page.taglist .right-sidebar .content-fragment.tag-cloud ul.tag-list {margin-bottom: 20px;}

.content-fragment.search-form .field-item {
  padding: 0;
}

.content-fragment.search-form .search .field-item-input {
  background: #fff;
  border: 1px solid #ccc;
  height: 28px;
  width: 218px;
}

.content-fragment.search-form .search input.searchField {
  background: #fff;
  float: left;
  height: 28px;
  margin: 0;
  outline: 0;
  padding: 0 5px;
  width: 180px;
}

.content-fragment.search-form .search input.search-button {
  background: #fff url(http://blogs.technet.com/cfs-filesystemfile.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-00-94-25/6076.icon_2D00_search.png) 50% 50% no-repeat;
  clear: right;
  cursor: pointer;
  float: left;
  height: 28px;
  margin-left: 0;
  width: 28px;
}

.content-fragment.search-form .field-list-footer {
  font-size: 11px;
}

.content-fragment.search-form .field-list-footer label {
  margin-right: 0;
}

#ThisBlogText {
  margin-right: 12px;
}

.content-fragment.with-header .content-fragment-header,
.content-fragment.with-header.no-wrapper-with-spacing .content-fragment-header {
  border: 0;
  padding: 0;
}

.content-fragment.with-header .content-fragment-header div, 
.content-fragment.link-list .content-list-name {
  border-bottom: 1px solid #ccc;
  font: bold 1.167em/*14px*//1.214/*17px*/ 'Segoe UI Bold','Segoe UI','Lucida Grande',Verdana,Arial,Helvetica,sans-serif;
  margin: 0 0 12px;
  padding: 0 0 6px;
}

.right-sidebar .link-list ul.content-list {
  margin-bottom: 20px;
}

.content-fragment.link-list .full-post .post-content {
  display: block;
  font-size: 12px;
}

.content-fragment.blog-news .page-content {
  font-size: 12px;
}

.content-fragment.no-wrapper-with-spacing .content-fragment-content {
  padding: 0;
}

.layout-region.right-sidebar ul.content-list li.content-item {
	margin: 12px 0 0;
	padding: 0;
}
.layout-region.right-sidebar .blog-archive-list ul.content-list li.content-item {
  margin-top: 6px;
}
.layout-region.right-sidebar ul.navigation-list li.navigation-item:first-child {
  margin: 0;
  padding: 0 0 .25em 0;
}
.layout-region.right-sidebar ul.content-list li.content-item:first-child {
  margin: 0;
  padding: 0;
}

.content-fragment.blog-links .navigation-item .internal-link {
  display: block;
  padding-left: 19px;
  position: relative;
}

.content-fragment.blog-links .navigation-item .internal-link span {
  display: none;
}

.content-fragment.blog-links .navigation-item .internal-link {
  line-height: 16px;
  min-height: 16px;
}

.content-fragment.blog-links .navigation-item .internal-link.view-application {
  background: url(http://blogs.technet.com/cfs-filesystemfile.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-00-94-25/7345.icon_2D00_home.png) 0 50% no-repeat;
}

.content-fragment.blog-links .navigation-item .internal-link.view-contact {
  background: url(http://blogs.technet.com/cfs-filesystemfile.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-00-94-25/5100.icon_2D00_email.png) 0 50% no-repeat;
}

.content-fragment.blog-links .navigation-item .internal-link.rss {
  background: url(http://blogs.technet.com/cfs-filesystemfile.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-00-94-25/3365.icon_2D00_rss.png) 0 50% no-repeat;
}

.content-fragment.blog-links .navigation-item .internal-link.add-post,
.content-fragment.blog-links .navigation-item .internal-link.edit-post {
  background: url(http://blogs.technet.com/cfs-filesystemfile.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-00-94-25/8078.icon_2D00_write.png) 0 50% no-repeat;
}

.content-fragment.blog-links .navigation-item .internal-link.edit-application,
.content-fragment.blog-links .navigation-item .internal-link.view-control-panel {
  background: url(http://blogs.technet.com/cfs-filesystemfile.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-00-94-25/6064.icon_2D00_settings.png) 0 50% no-repeat;
}

.sidebar-tiles {
  clear: both;
  list-style: none;
  margin: 0;
  overflow: hidden;
  padding: 0;
}

.sidebar-tiles li {
  float: left;
  margin: 0 5px 5px 0;
  padding: 0;
}

.sidebar-tiles li.last {
  margin-right: 0;
}

.sidebar-tiles .facebook {

}

.sidebar-tiles a {
  background: #424242;
  color: #fff;
  display: block;
  font-size: 11px;
  height: 17px;
  margin: 0;
  padding: 53px 0 0 5px;
  text-decoration: none;
  width: 65px;
}

.sidebar-tiles a:hover,
.sidebar-tiles a:focus {
	background-color: #01265f;
}

a.sidebar-tile-subscribe {
  background: #ea700d url(http://blogs.technet.com/cfs-filesystemfile.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-00-94-25/0045.icon_2D00_tile_2D00_rss.png) 50% 50% no-repeat;
}

a.sidebar-tile-home {
  background: #00368a url(http://blogs.technet.com/cfs-filesystemfile.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-00-94-25/5417.home.png) 50% 50% no-repeat;
}

a.sidebar-tile-twitter {
  background: #55acee url(http://blogs.technet.com/cfs-file.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-00-94-25/twitter_2D00_tile.png) 50% 50% no-repeat;
}
a.sidebar-tile-comments {
  background: #006bc2 url(http://blogs.technet.com/cfs-filesystemfile.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-00-94-25/5415.icon_2D00_comments_2D00_large.png) 50% 50% no-repeat;
}
a.sidebar-tile-facebook {
  background: #3b5998 url(http://blogs.technet.com/cfs-filesystemfile.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-00-94-25/2055.facebook.png) 50% 50% no-repeat;
}
a.sidebar-tile-contact {
  background: #00368a url(http://blogs.technet.com/cfs-filesystemfile.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-00-94-25/5340.icon_2D00_email_2D00_large.png) 50% 50% no-repeat;
}

a.sidebar-tile-google {
  background: #c70c0c url(http://blogs.technet.com/cfs-filesystemfile.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-00-94-25/2047.icon_2D00_google.png) 50% 50% no-repeat;
}

a.sidebar-tile-linkedin {
  background: #0084b4 url(http://blogs.technet.com/cfs-filesystemfile.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-00-94-25/4762.icon_2D00_linkedin.png) 50% 50% no-repeat;
}

.sidebar-bio img {
  float: left;
}

.sidebar-bio p {
  margin: 0 0 0 78px;
}

.sidebar-video {
  margin-bottom: 15px;
}

.sidebar-video-thumb {
  background: #000;
  margin-bottom: 5px;
  text-align: center;
}

.sidebar-videos-more {
  margin: 0;
  text-align: right;
}

.sidebar-videos-more a {
  color: #424242 !important;
}

.content-fragment.blog-post-list .content-list.simple .abbreviated-post {
  padding: 0;
  margin: 0;
}

.content-fragment.blog-post-list .content-list.simple .post-name {
  margin: 0;
}

.content-fragment.blog-post-list .content-list.simple .content-item .post-date .label {
  display: inline;
}

.layout-content.header-top-content-left-sidebar-right .layout-region.right-sidebar .content-fragment.blog-post-list .content-list .post-date .value {
  display: inline;
}

#MicrosoftTranslatorWidget{
  background: none !important;
  border: 0 !important;
  font-size: 12px !important;
  overflow: hidden !important;
  width: 220px !important;
}

*:first-child+html #MicrosoftTranslatorWidget div:first-child, 
*:first-child+html #MicrosoftTranslatorWidget div:first-child + div {
  filter: 0 !important; /* IE7 fix */
}

#MicrosoftTranslatorWidget #MSTWContent {
  background: none !important;
}

#MicrosoftTranslatorWidget #MSTWHeader {
  background: none !important;
  border: 0 !important;
}

#MicrosoftTranslatorWidget #MSTWHeader .MSTWBox {
  background: none !important;
}

#MicrosoftTranslatorWidget #MSTWHeaderText {
  color: #00368a !important;
  font: bold 1.166em/*14px*//1.214/*17px*/ 'Segoe UI Bold','Segoe UI','Lucida Grande',Verdana,Arial,Helvetica,sans-serif;
}

#MicrosoftTranslatorWidget #MSTWHeader .MSTWBox:first-child {
  border-bottom: 1px solid #ccc !important;
  display: block;
  margin-bottom: 6px;
  padding-top: 0 !important;
  padding-bottom: 2px;
}

#MicrosoftTranslatorWidget #MSTWContent a#MSTWBrandLink span,
#MicrosoftTranslatorWidget #MSTWContent a#MSTWBrandLink span sup {
  color: #424242 !important;
}

#MicrosoftTranslatorWidget #MSTWContent a#MSTWBrandLink span,
#MicrosoftTranslatorWidget #MSTWContent a#MSTWBrandLink span sup {
  font-size: 11px !important;
}

#MicrosoftTranslatorWidget #MSTWContent a#MSTWBrandLink span sup {
	vertical-align: middle !important;
}

#MicrosoftTranslatorWidget #MSTWFooter .MSTWBox {
  padding: 0 !important;
  margin-top: 5px;
}

#MicrosoftTranslatorWidget #MSTWHeader,
#MSTWShareButton,
#MSTWGetButton {
  border: 0 !important;
}

a#MSTWGoButton {
  border: 0 !important;
  background: transparent url(http://blogs.technet.com/cfs-filesystemfile.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-00-94-25/5810.icon_2D00_go.png) 0 50% no-repeat !important;
  width: 14px !important;
  height: 14px !important;
  margin: 3px 0 0 2px !important;
}
*:first-child+html a#MSTWGoButton {overflow: visible !important;}

a#MSTWGetButton {
  background: transparent url(http://blogs.technet.com/cfs-filesystemfile.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-00-94-25/2311.icon_2D00_code.png) 0 50% no-repeat !important;
  margin: 0 5px 0 0 !important;
  width: 15px !important;
  height: 16px !important;
}

a#MSTWShareButton {
  background: transparent url(http://blogs.technet.com/cfs-filesystemfile.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-00-94-25/5100.icon_2D00_email.png) 0 50% no-repeat !important;
  margin: 0 !important;
  width:16px !important;
  height:16px !important;
}

#MSTWShareImage,
#MSTWGetImage,
#MSTWGoImage {
  display: none;
}

.content-fragment.blog-post .full-post .post-tags {
  background: url(http://blogs.technet.com/cfs-filesystemfile.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-00-94-25/6646.icon_2D00_tag.png) 0 50% no-repeat;
  font-size: 12px;
  font-weight: normal;
  line-height: 16px;
  margin-left: 0;
  padding-left: 18px;
}

.share-widgets {
  padding: 40px 0;
}
.fb_edge_widget_with_comment {
	z-index: 10000;
	position: relative;
}
.share-widget {
  float: left;
  height: 28px;
  margin: 0 0 5px 0;
}

.share-widget.facebook {
  padding-top: 4px;
  width: 110px !important;
}

.share-widget.linkedin {
  margin-right: 30px;
  padding-top: 4px;
}

.share-widget.delicious {
  background: #f9fafa;
  border: 1px solid #ddd;
  font-size: 12px;
  height: 16px;
  padding: 5px;
  -ms-border-radius: 3px;
  -o-border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  width: 130px;
}

.share-widget.delicious a {
  font-size: 12px;
  text-decoration: none;
}

.tag-cloud li.level-1 {
    font-size: 1.834em/*22px*/;
}
.tag-cloud li.level-2 {
    font-size: 1.5em/*18px*/;
}
.tag-cloud li.level-3 {
    font-size: 1.333em/*16px*/;
}
.tag-cloud li.level-4 {
    font-size: 1.167em/*14px*/;
}
.tag-cloud li.level-5 {
    font-size: 1em/*12px*/;
}
.tag-cloud li.level-6 {
    font-size: 0.917em/*11px*/;
}
.tag-cloud .tag-list li {
    display: inline;
    line-height: 28px;
    margin-right: 8px;
	font-weight: normal;
}
.tag-cloud .tag-list a {
    font-weight: normal;
}

/* Begin hiding nav menu widgets in edit mode */
	.layout.active .layout-region.header .content-fragment-management:first-child + .content-fragment-management + .content-fragment-management,
	.layout.active .layout-region.header .content-fragment-management:first-child + .content-fragment-management + .content-fragment-management + .content-fragment-management 
	{display: none;}
/* End hiding nav menu widgets in edit mode */

/* Begin CSS for expand-collapse blog archive list and tag list */
	.content-fragment.blog-archive-list .content-list .content-item:first-child, 
	.content-fragment.blog-archive-list .content-list .content-item:first-child + .content-item, 
	.content-fragment.blog-archive-list .content-list .content-item:first-child + .content-item + .content-item, 
	.content-fragment.blog-archive-list .content-list .content-item:first-child + .content-item + .content-item +.content-item, 
	.content-fragment.blog-archive-list .content-list .content-item:first-child + .content-item + .content-item +.content-item +.content-item {
		display:block !important;
	}
	ul.tag-list li.tag-item.level-1,
	ul.tag-list li.tag-item.level-2,
	ul.tag-list li.tag-item.level-3  {
		display: inline !important; /* Show most popular tags -- other 3 tag levels are hidden by jquery */
	}
	.layout-region.right-sidebar .content-fragment.raw-html.side-bottom-border-only .content-fragment-content {
		border:0;
		background-color:transparent;
		left: 12px;
		margin: 0;
		position: relative;
		top: -35px;
	}
	.layout-region.right-sidebar .content-fragment.raw-html.side-bottom-border-only {
		border: 0 none;
		box-shadow: none;
		margin: 0;
		position: relative;
		top: -19px;
		height:0;
	}
	a#TagMoreLink,
	a#TagLessLink,
	a#ArchiveMoreLink,
	a#ArchiveLessLink	{
		display: block;
		margin-top: 10px;
		color: #424242 !important;
	}
	a span.arrowhead {color: #aaa !important;}
	.content-fragment.tag-cloud ul.tag-list,
	.content-fragment.blog-archive-list .content-list {
		margin-bottom: 0.25em;
	} 
/* End CSS expand-collapse blog archive list and tag list */

/* Begin STB about right rail section */
	.user-defined-markup .about img {float: left; max-width: 70px;}
	.user-defined-markup .about p {top: -3px; margin: 0; position: relative; float: right; width: 140px;}
/* End STB about right rail section */

/* Begin STB about right rail section */
	.user-defined-markup ul.web-links {padding: 0; margin: 0;}
	.user-defined-markup ul.web-links li {margin-top: 12px;}
	.user-defined-markup ul.web-links li:first-child {margin-top: 0;}
/* End STB about right rail section */



/* Begin STB header */

	/* Begin global STB header */
		.layout-region.header {z-index: 9998;}
		#stb-header a h2 {font: 100 3em/*36px*//1.166/*42px*/ 'Segoe UI Light','Segoe UI','Lucida Grande',Verdana,Arial,Helvetica,sans-serif; margin: 11px 0 20px; color: #00368a; position: relative; top: 3px;}
		.stb-nav {padding: 0; margin: 0; width: 960px; min-height: 59px; clear: both;}
		#stb-header a {color: #fff;}
		#stb-header a, #stb-header a:hover {text-decoration: none;}
		.stb-nav > li > a {border-right: solid 1px #fff;}
		.stb-nav li > a {height: 49px; width: 101px; font-size: 13px; display: inline-block; padding: 5px 9px;}
		.stb-nav-drop li > a {width: 169px; height: auto; min-height: 10px; padding: 7px 10px 8px;}
		.stb-nav-drop > b {width: 70px; display: inline-block;  background: #fff; clear:both; height: 1px; position: absolute; right: 0; top: 0;}
		.stb-nav li {list-style-type: none;}
		.stb-nav > li {float: left; width: 120px;}
		.stb-nav-drop {display: none; width: 189px; padding: 0; position: absolute; z-index: 9999;}

		.stb-nav-drop > li {width: 189px;}
		.stb-nav-drop a {display: block; width: 171px; min-height: 11px; padding: 11px 9px 9px;}
		.stb-nav-drop.expanded {display: block;}
		*:first-child+html .stb-nav-drop.expanded {display: block; margin-left: -123px; top: 131px;}
		.stb-nav > li > a.menu-title {position: relative;}
		a.menu-title b {background: url(http://blogs.technet.com/cfs-filesystemfile.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-00-94-25/5050.arrow.png) 0 0 no-repeat; display: inline-block; width: 7px; height: 4px; position: absolute; right: 10px; bottom: 11px;}
		.description-container .description {max-width: 600px; float: left;}
		.description-container a.logo {background:url(http://blogs.msdn.com/cfs-filesystemfile.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-01-53-06/4237.VisualStudio.png); width: 220px; height: 37px; display: block; float: right; margin: 23px 0 20px;}
		.description p.tagline {margin: -12px 0 20px;}

		.layout-region-inner.header .raw-html .user-defined-markup, .layout-content .layout-region .layout-region-inner, .layout-region.content .raw-html .user-defined-markup {overflow: visible; clear: both;}
		
		*:first-child+html .stb-nav > li , 
		*:first-child +html .stb-nav li > a,
		*:first-child+html a.menu-title b, 
		*:first-child+html .stb-nav-drop > b, 
		*:first-child+html .vs-logo {display: inline; zoom: 1;}
	/* End global STB header */

	/* Begin STB Tier 3 header */
		.stb-nav {background: #00368a;}		
		.stb-nav > li > a.menu-title:hover, .stb-nav .stb-nav-drop, .stb-nav > li > a.menu-title.expanded {background: #01265f;}
		.menu-title.expanded {.field_wrapper:after { content: "."; display: block; height: 0; clear: both; visibility: hidden; }}
		.stb-nav-drop > li > a:hover, .stb-nav > li > a.menu-title {background: #00368a;}
		.stb-nav-drop a {border-left: 0 !important;}
		.description-container .description  h2, .content-fragment.with-header .content-fragment-header div, .content-fragment.link-list .content-list-name {color: #00368a;}
    .content-fragment.with-header .content-fragment-header div a {color: #00368a; font-weight: bold;}
	/* End STB Tier 3 header */

/* Begin STB videos */
	.sxp-video {margin-top: 25px;}
	.sxp-video:first-child {margin-top: 0;}
	.sxp-thumbnail img {max-width: 220px; display: block; margin: 0 0 5px;}
	.sxp-title {margin: 10px 0 0;}
/* End STB videos */

.right-sidebar .content-fragment.temporary-rss-feed-item-list .simple .abbreviated-post .post-name {font-size: 1em;}

/* Begin tabs and container for sxp */
	.layout-region.content .sxp-title {font-size: 1.333em/*16px*/;}
	.sxp-feed p.sxp-time-author-comments {margin: 4px 0 -8px;}
	.sxp-feed {margin-bottom: 15px;}
	.sxp-feed p {margin: 0;}
	.sxp-feed .sxp-time {color: #707070;}
	.sxp-feed .sxp-comments {margin-left: 21px; padding-left: 16px; background: url(http://blogs.technet.com/cfs-filesystemfile.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-00-94-25/7282.icon_2D00_comments.png) 0 4px no-repeat;}
	#sxp-feed-container-all {}
	#sxp-feed-container-news {display: none;}  
	#sxp-feed-container ul {padding: 0 0 0 15px;}
	#sxp-tabs {margin: 0 0 30px; width: 718px; background: #00368a; height: 32px; padding: 0 !important; border-bottom: solid 1px #ccc; font-size: 1.167em;}
	#sxp-tabs li {list-style-type: none; height: 32px; position: relative; float: left; border: solid #CCC; border-width: 0 1px 1px 0;}
	#sxp-tabs a {color: #fff; background: #00368a; height: 100%; line-height: 34px; padding: 0 20px; display: block; margin-left: 0;}
	#sxp-tabs a:hover {text-decoration: none;}
	#sxp-tabs a:first-child + a {left: -3px;}
	#sxp-tabs a:hover {background: #01265f;}
	#sxp-tabs .selected {margin-top: -4px; height: 36px;}
	#sxp-tabs .selected a, #sxp-tabs .selected a:hover {background: #01265f;}
	#sxp-tabs .selected span {z-index: 805; position: absolute; bottom: -7px; width: 100%; height: 7px; background: transparent url(http://blogs.technet.com/cfs-file.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-00-94-25/1856.sxp_2D00_tab_2D00_selected.png) no-repeat 50% 0;}
	#all-rss-link {float: right; margin: 0 15px 0 0; padding: 0 15px 0 0; position: relative; top: -21px; }
	#all-rss-link span {margin: 0 0 0 4px; display: inline-block; background: url(http://blogs.technet.com/cfs-filesystemfile.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-00-94-25/2110.metroRSS.png) 0 0; height: 14px; width: 14px;}
	.feedPager {border-top: solid 1px #ccc; margin: 30px 0 20px; padding: 12px 0;}
	.feedPager a.pagerLink.currentPage {font-weight: bold; color: #000;}
	.feedPager a.pagerLink.currentPage:hover {cursor: default;}
	.feedPager a.pagerLink {margin-left: 15px;}
	.feedPager a.pagerLink:first-child {margin-left: 0;}
	.content-fragment.raw-html:first-child .user-defined-markup {overflow: visible;}
/* End tabs and container for sxp */	
	
/* Begin Telligent RSS widget */	
	.content-fragment.temporary-rss-feed-item-list .content-list .content-item {float: left; width: 214px; margin-left: 38px;}
	.content-fragment.temporary-rss-feed-item-list .content-list .content-item:first-child {margin-left: 0;}
	.content-fragment.temporary-rss-feed-item-list .content-fragment-header .internal-link.rss {display: none;}
	.content-fragment.temporary-rss-feed-item-list .simple .abbreviated-post {margin: 0;}
	.content-fragment.temporary-rss-feed-item-list {margin-bottom: 25px; display: inline-block;}
	*:first-child+html #all-rss-link span, *:first-child+html .content-fragment.temporary-rss-feed-item-list {zoom: 1; display: inline;}
/* End Telligent RSS widget */

/* Begin MSDN Subscriptions */
	#msdn-subscriptions-img {background: url(http://blogs.msdn.com/cfs-filesystemfile.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-01-53-06/8737.msdn_2D00_subscriptions.png); width: 174px; height: 21px; display: inline-block; border: 0; margin: 9px 0 0;}
	#msdn-subscriptions-content {clear: both;}
	#msdn-subscriptions-buy {text-decoration: none;}
	#msdn-subscriptions-content ul {padding: 0; margin: 0;}
	#msdn-subscriptions-content li {list-style-type: none; padding: 0; margin: 12px 0 0;}
	*:first-child+html #msdn-subscriptions-img {display: inline; zoom: 1;}
/* End MSDN Subscriptions */


.profile-usercard .profile-header .profile-display-name {line-height: 1.2; max-height: 19px;}
.twtr-timeline, .twtr-doc {-moz-border-radius: 0; -webkit-border-radius: 0 !important; border-radius: 0 !important; /* Twitter widget -- removing rounded corners -- */}

.content-fragment-page.post #fb-root div:first-child {top: -30000px !important;}

/*Use the following only when a blog description is used under the title*/ *:first-child+html .stb-nav-drop.expanded {top: 58px;}

/* Begin Sidebar RSS icon */
.content-fragment-header div {overflow:hidden;}
.content-fragment-header div a.rss-left {display: block; float: left; width: 200px;}
.content-fragment-header div a.rss-right {display: block; float: right; padding-top: 2px;}
/* End Sidebar RSS icon */

.wlWriterHeaderFooter {float: right !important; margin-top: 20px !important;}

/* Facebook widget overflow fix */
.post-content {
  background: #fff;
  z-index: 1;
}
.share-widgets {
  z-index: 0;
}