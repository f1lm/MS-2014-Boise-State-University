/* srl info for sum */

#include "/usr/local/lib/sr/srmulti.h"
#include "/usr/local/lib/sr/sr.h"

static char SR_version[] = 
	"SR version 2.3.3";

int sr_max_co_stmts = 1000000;
int sr_max_classes = 1000000;
int sr_max_loops = 10000;
int sr_max_operations = 1000000;
int sr_max_processes = 1000000;
int sr_max_rmt_reqs = 1000000;
int sr_max_resources = 1000000;
int sr_max_semaphores = 1000000;
int sr_stack_size = 40000;
int sr_async_flag = 0;
char sr_exec_path[] = "/usr/local/lib/sr/srx";

int N_Sum = 0;  extern void R_Sum(), F_Sum();

Rpat sr_rpatt[] = {
    { "Sum", R_Sum, F_Sum },
};
int sr_num_rpats = 1;
