C   Examples 7.139 through 141
C   This is Fortran 77

      program tio

      character s*20
      integer n
      real r (10)

      character(len=20) :: fmt

      s = "abcdefghijklmnopqrst"
      n = 2
      do 10 i = 1, 10
        r(i) = i
 10   continue

      write (6, '(A20, I10, 10F8.2)'), s, n, r
c   6 is standard output


      write (6, 100), s, n, r
100   format (A20, I10, 10F8.2)


      fmt = "(A20, I10, 10F8.2)"
      write (6, fmt), s, n, r


      write (6, *), s, n, r


      print*, s, n, r          ! * means default format


      read 100, s, n, r
      print*, s, n, r

      read*, s, n, r           ! * means default format
      print*, s, n, r

      end
