(* Figure 7.16 *)

MODULE variants;

TYPE
    string_ptr = POINTER TO ARRAY [1..80] OF CHAR;

    element = RECORD
        name : ARRAY [1..2] OF CHAR;
        metallic : BOOLEAN;
        CASE naturally_occurring : BOOLEAN OF
            TRUE :
                source : string_ptr;
                prevalence : REAL;
          | FALSE :
                lifetime : REAL;
        END;
        atomic_number : INTEGER;
        atomic_weight : REAL;
    END;

BEGIN

END variants.
