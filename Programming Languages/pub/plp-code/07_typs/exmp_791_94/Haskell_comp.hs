-- Example 7.94

comp = [i * i | i <- [1..100], i `mod` 2 == 1]

-- load this file with
--      :load Haskell_comp
-- then type
--      comp
