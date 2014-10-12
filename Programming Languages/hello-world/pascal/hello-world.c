/* Output from p2c 1.21alpha-07.Dec.93, the Pascal-to-C translator */
/* From input file "hello-world.p" */


#include <p2c/p2c.h>


main(argc, argv)
int argc;
Char *argv[];
{
  PASCAL_MAIN(argc, argv);
  printf("Hello world!\n");
  exit(EXIT_SUCCESS);
}



/* End. */
