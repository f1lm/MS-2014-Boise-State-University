

#include <stdio.h>
#include <mysql.h>
#include "common.h"

#define MAXLENGTH 256
#define MAX_QUERY_LENGTH 4096

#define def_host_name  NULL  /* host to connect to (default = localhost) */
#define def_user_name  NULL  /* user name (default = your login name) */
#define def_password  NULL   /* password (default = none) */
#define def_port_num  0      /* use default port */
#define def_socket_name NULL /* use default socket name */
#define def_db_name   NULL   /* database to use (default = none) */


void process_result_set(MYSQL *conn, MYSQL_RES * res_set)
{
	MYSQL_ROW    row;
	unsigned int  i;

	printf("\n");
  	while ((row = mysql_fetch_row (res_set)) != NULL)
  	{
    	for (i = 0; i < mysql_num_fields (res_set); i++)
    	{
      		if (i > 0)
        		fputc ('\t', stdout);
      		printf ("%s", row[i] != NULL ? row[i] : "NULL");
    	}
    	fputc ('\n', stdout);
  	}
	printf("\n");
  	if (mysql_errno (conn) != 0)
    	print_error (conn, "mysql_fetch_row() failed");
  	else
    	printf ("%lu rows returned\n", (unsigned long) mysql_num_rows (res_set));
}


int main (int argc, char *argv[])
{
	char db_name[MAXLENGTH];
 	char *password;
	char query[MAX_QUERY_LENGTH];
	MYSQL  *conn; /* pointer to connection handler */
	MYSQL_RES *res_set;

	password = get_tty_password(NULL); /* mysql function */
	strcpy(db_name, "company");
  	conn = do_connect (def_host_name, def_user_name, password, def_db_name,
                  		def_port_num, def_socket_name, 0);
  	if (conn == NULL)
    	exit (1);

	printf("Connection was sucessful!\n");
  	/* do the real work here */

	if (mysql_query (conn, "SHOW TABLES FROM company") != 0)
  		print_error (conn, "mysql_query() failed");
	else
	{
  		res_set = mysql_store_result (conn);  /* generate result set */
  		if (res_set == NULL) {
      		print_error (conn, "mysql_store_result() failed");
  		} else {
   		 	/* process result set, then deallocate it */
    		process_result_set (conn, res_set);
    		mysql_free_result (res_set);
  		}
	}

	/* The following query does not return results */
	strcpy(query, "use company");
	if (mysql_query (conn, query) != 0) {
  		print_error (conn, "mysql_query() failed");
	} else {
  		printf ("USE statement succeeded\n");
	}
	strcpy(query, ""); /* clear query buffer */

	
	/* The following query returns results that  */
	/* we use process_query  to process. */
	strcpy(query, "select * from employee");
	if (mysql_query (conn, query) != 0) {
  		print_error (conn, "mysql_query() failed");
	} else {
  		res_set = mysql_store_result (conn);  /* generate result set */
  		if (res_set == NULL) {
      		print_error (conn, "mysql_store_result() failed");
  		} else {
   		 	/* process result set, then deallocate it */
    		process_result_set (conn, res_set);
    		mysql_free_result (res_set);
  		}
	}

  	do_disconnect (conn);
  	exit (0);
}

/* :vim set tabstop=4 */
