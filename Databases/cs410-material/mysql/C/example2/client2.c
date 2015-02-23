

#include <stdio.h>
#include <mysql.h>
#include "common.h"

#define MAXLENGTH 128

#define def_host_name  NULL  /* host to connect to (default = localhost) */
#define def_user_name  NULL  /* user name (default = your login name) */
#define def_password  NULL   /* password (default = none) */
#define def_port_num  0      /* use default port */
#define def_socket_name NULL /* use default socket name */
#define def_db_name   NULL   /* database to use (default = none) */

MYSQL  *conn; /* pointer to connection handler */

int main (int argc, char *argv[])
{
 	char *password;

	password = get_tty_password(NULL); /* mysql function */

  	conn = do_connect (def_host_name, def_user_name, password, def_db_name,
                  		def_port_num, def_socket_name, 0);
  	if (conn == NULL)
    	exit (1);

	printf("Connection was successful!\n");
  	/* do the real work here */

  	do_disconnect (conn);
  	exit (0);
}

/* :vim set tabstop=4 */
