-- Example 3.33
-- Note that min is predefined in Haskell 98;
-- hence we use a different name.

min2 a b = if a < b then a else b

-- try:
--  min2 3 4
--  min2 3.5 1.2
--  min2 "ab" "cd"
