! Fortran code from Section 7.4.1 (Examples 7.48 through 7.51)
! This is Fortran 90

program Fortran_arrays

character, dimension (1:26) :: upper
character (26) upper2    ! shorthand notation
integer i, j

real, dimension (10,10) :: mat

do i = 1, 26
    upper(i) = char(i-1 + ichar('A'))
end do

do i = 1, 10
    do j = 1, 10
        mat(i, j) = (i-1)*10 + (j-1)
    end do
end do

print*, upper(10), mat(3, 4)
!          J          23

end program Fortran_arrays
