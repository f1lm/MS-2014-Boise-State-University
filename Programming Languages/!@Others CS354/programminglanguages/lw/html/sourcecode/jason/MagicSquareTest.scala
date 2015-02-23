// Tests if an n x n grid of numbers determined by user input is a magic square. A magic
// square occurs when every row, column, and full-length diagonal adds to the same number.
//
//@author: Jason Allen
object MagicSquareTest {

	def main(args: Array[String]) {

		// determine how large the 2D array for the magic square must be from user input
		println("Enter the number of rows/columns for the square to be tested (n): ")
		val n = readInt()
		var numbers = Array.ofDim[Int](n, n)

		// read values for magic square in from user
		// use until, rather than to, to avoid OutOfBoundsException (until is like <=)
		for (row <- 0 until n) {
			for (column <- 0 until n) {
				println("Enter the number at row " + (row + 1) + ", column " + (column + 1) + ": " )
				numbers(row)(column) = readInt()
			}
		}

		// show the magic square being tested
		println("\nThe square being tested looks like this:" )
		for (row <- 0 until n) {
			for (column <- 0 until n) {
				print(numbers(row)(column) + " ")
			}
			println()
		}

		// isMagicSquare and firstRowSum must be used as vars, not vals, since they will need
		// to be referenced many times as the square is investigated
		var isMagicSquare = true
				var firstRowSum = 0
				for (column <- 0 until n) {
					firstRowSum += numbers(0)(column)
				}

		// check if all rows add to the same sum as the first row
		for (row <- 0 until n) {
			var sum = 0
					for (column <- 0 until n) {
						sum += numbers(row)(column)
					}
			if (sum != firstRowSum) {
				isMagicSquare = false
			}
		}

		// check if all columns add to the same sum as the first row
		for (column <- 0 until n) {
			var sum = 0
					for (row <- 0 until n) {
						sum += numbers(row)(column)
					}
			if (sum != firstRowSum) {
				isMagicSquare = false
			}
		}

		// check if the left to right diagonal adds to the same sum as
		// the first row
		var sum = 0
				for (row <- 0 until n) {
					for (column <- 0 until n) {
						if (row == column) {
							sum += numbers(row)(column)
						}
					}
				}
		if (sum != firstRowSum) {
			isMagicSquare = false;
		}

		// check if the right to left diagonal adds to the same sum as
		// the first row
		sum = 0
				var column = n - 1
				for (row <- 0 until n) {
					sum += numbers(row)(column)
							column -= 1
				}
		if (sum != firstRowSum) {
			isMagicSquare = false;
		}

		// print the result
		if (isMagicSquare) {
			System.out.println("\nIt's a magic square!");
		}
		else {
			System.out.println("\nNot a magic square.");
		}
	}
}