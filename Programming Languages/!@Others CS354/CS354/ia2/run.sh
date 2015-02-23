#!/bin/bash

echo "Begin Testing."
echo "Test 1:"
java Interpreter "x = 1; if x <> 2 then rd x"
echo "Test 2:"
java Interpreter "x = 0; while x < 5 do x = x + 1; wr x"
echo "Test 3:"
java Interpreter "x = 0; y = 10; while y > x do begin y = y - 1; x = x + 1; wr x; wr y end"
echo "Test 4:"
java Interpreter "x = 0; y = 100; z = 10; while x < y do begin x = x + z; wr x end"
echo "Test 5:"
java Interpreter "x = 0; while x < 10 do if x < 4 then begin x = x + 1; rd x end else begin x = x + 2; rd x end"
