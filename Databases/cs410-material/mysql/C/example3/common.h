
#ifndef __COMMON_H
#define __COMMON_H

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <mysql.h>

MYSQL * do_connect (char *host_name, char *user_name, char *password, 
                    char *db_name, unsigned int port_num, char *socket_name, 
					unsigned int flags);


void do_disconnect (MYSQL *conn);
void print_error (MYSQL *conn, char *message);


#endif /* __COMMON_H */
