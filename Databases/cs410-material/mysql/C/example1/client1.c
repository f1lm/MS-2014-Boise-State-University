
#include <stdio.h>
#include <stdlib.h>
#include <mysql.h>

#define MAXLENGTH 128

#define def_host_name  NULL /* host to connect to (default = localhost) */
#define def_user_name  NULL /* user name (default = your login name) */
#define def_password   NULL /* password (default = none) */
#define def_db_name    NULL /* database to use (default = none) */

MYSQL  *conn;        /* pointer to connection handler */

int main (int argc, char *argv[])
{
	char password[MAXLENGTH];
  	conn = mysql_init (NULL);
  	if (conn == NULL)
  	{
    	fprintf (stderr, "mysql_init() failed (probably out of memory)\n");
    	exit (1);
  	}
	system("stty -echo");
  	printf("Enter password:");
  	scanf("%s", password);
	system("stty echo");
	printf("\n");

  	if (mysql_real_connect (
        conn,          /* pointer to connection handler */
        def_host_name, /* host to connect to */
        def_user_name, /* user name */
        password,  /* password */
        def_db_name,   /* database to use */
        0,             /* port (use default) */
        NULL,          /* socket (use default) */
        0)             /* flags (none) */
      == NULL)
  	{
    	fprintf (stderr, "mysql_real_connect() failed:\nError %u (%s)\n",
              mysql_errno (conn), mysql_error (conn));
    	exit (1);
  	}

  	mysql_close (conn);
  	exit (0);
}
