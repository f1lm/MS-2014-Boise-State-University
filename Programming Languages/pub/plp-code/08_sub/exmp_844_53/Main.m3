(* Example 8.50 *)

MODULE Main;
FROM IO IMPORT OpenRead;
IMPORT Rd;
FROM Rd IMPORT Close;

PROCEDURE Parse(s : Rd.T) =
BEGIN
END Parse;

VAR
    myStream : Rd.T;
    myFileName : TEXT;

BEGIN
    myFileName := "foo";
    TRY
        myStream := OpenRead(myFileName);       (* protected block *)
        Parse(myStream);
    FINALLY                                     (* cleanup code *)
        Close(myStream);
    END;
END Main.
