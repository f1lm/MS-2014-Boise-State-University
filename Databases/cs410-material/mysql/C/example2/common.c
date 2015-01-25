

#include "common.h"



MYSQL * do_connect (char *host_name, char *user_name, char *password, 
                    char *db_name, unsigned int port_num, char *socket_name, 
                    unsigned int flags)
{
	MYSQL  *conn; /* pointer to connection handler */

  	conn = mysql_init (NULL); /* allocate, initialize connection handler */
  	if (conn == NULL)
  	{
    	print_error (NULL, "mysql_init() failed (probably out of memory)");
    	return (NULL);
  	}
#if defined(MYSQL_VERSION_ID) && MYSQL_VERSION_ID >= 32200 /* 3.22 and up */
  	if (mysql_real_connect (conn, host_name, user_name, password,
          					db_name, port_num, socket_name, flags) == NULL)
  	{
    	print_error (conn, "mysql_real_connect() failed");
    	return (NULL);
  	}
#else              /* pre-3.22 */
  	if (mysql_real_connect (conn, host_name, user_name, password,
          					port_num, socket_name, flags) == NULL)
  	{
    	print_error (conn, "mysql_real_connect() failed");
    	return (NULL);
  	}
  	if (db_name != NULL)    /* simulate effect of db_name parameter */
  	{
    	if (mysql_select_db (conn, db_name) != 0)
    	{
      		print_error (conn, "mysql_select_db() failed");
      		mysql_close (conn);
      		return (NULL);
    	}
  	}
#endif
  	return (conn);     /* connection is established */
}



void do_disconnect (MYSQL *conn)
{
  mysql_close (conn);
}

void print_error (MYSQL *conn, char *message)
{
  	fprintf (stderr, "%s\n", message);
  	if (conn != NULL)
  	{
    	fprintf (stderr, "Error %u (%s)\n",
        mysql_errno (conn), mysql_error (conn));
  	}
}

