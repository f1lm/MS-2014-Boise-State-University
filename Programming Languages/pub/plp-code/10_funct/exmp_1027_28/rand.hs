-- Examples 10.27 and 10.28

import System.Random ( mkStdGen, Random, RandomGen, StdGen, random,
                        randomIO, randoms, randomR, getStdGen, randomRIO )

randomInt :: StdGen -> Integer
randomInt gen = fst $ random gen

twoRandomInts :: StdGen -> ([Integer], StdGen)
    -- type signature: twoRandomInts is a function that takes an
    -- StdGen (the state of the RNG) and returns a tuple containing
    -- a list of Integers and a new StdGen.
twoRandomInts gen = let
        (rand1, gen2) = random gen
        (rand2, gen3) = random gen2
    in ([rand1, rand2], gen3)

twoMoreRandomInts :: IO [Integer]
    -- twoMoreRandomInts returns a list of Integers.  It also
    -- implicitly accepts, and returns, all the state of the IO monad.
twoMoreRandomInts = do
    rand1 <- randomIO
    rand2 <- randomIO
    return [rand1, rand2]

main = \seed ->
    let gen = mkStdGen seed             -- new RNG, seeded with argument
        ints = fst (twoRandomInts gen)  -- extract first element
    in do
        print ints                          -- of returned tuple
        moreInts <- twoMoreRandomInts
        print moreInts
    
