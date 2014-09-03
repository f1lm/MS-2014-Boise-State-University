(* Example 6.49 *)

MODULE case_stmt;
FROM InOut IMPORT ReadInt, WriteString, WriteLn; 

VAR i : INTEGER;

BEGIN (* case_stmt *)
    ReadInt(i);
    IF i = 1 THEN
        WriteString("You typed 1.");
    ELSIF i IN {2, 7} THEN
        WriteString("You typed 2 or 7.");
    ELSIF i IN {3..5} THEN
        WriteString("You typed something between");
        WriteString(" 3 and 5.");
            (* multiple lines here are fine *)
    ELSIF (i = 10) THEN
        WriteString("You typed 10.");
    ELSE
        WriteString("You typed something else.");
    END;
    WriteLn;

    CASE i OF
        1:      WriteString("You typed 1.");
    |   2, 7:   WriteString("You typed 2 or 7.");
    |   3..5:   WriteString("You typed something between");
                WriteString(" 3 and 5.");
                    (* again, multiple lines here are fine *)
    |   10:     WriteString("You typed 10.");
        ELSE    WriteString("You typed something else.");
    END;
    WriteLn;
END case_stmt.
