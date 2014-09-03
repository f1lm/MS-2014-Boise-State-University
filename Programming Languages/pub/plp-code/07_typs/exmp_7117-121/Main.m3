(* Examples 7.117 - 7.119 *)

MODULE Main;

TYPE
    element = RECORD
        name : TEXT;
        atomic_number : INTEGER;
        atomic_weight : REAL;
        metallic : BOOLEAN;
    END;

    mineral = RECORD
        chemical_composition : RECORD
            elements : ARRAY [1..50] OF element;
        END;
    END;

    foo = RECORD
        bar : RECORD
            glarch : RECORD
                field1 : INTEGER;
                field3 : INTEGER;
                field7 : INTEGER;
            END;
        END;
    END;

VAR
    ruby : mineral;
    x, y : foo;
    r, s, t, n, val : REAL;

BEGIN
    WITH e = ruby.chemical_composition.elements[1] DO
        e.name := "Al";
        e.atomic_number := 13;
        e.atomic_weight := 26.98154;
        e.metallic := TRUE;
    END;

    WITH f = x.bar.glarch, g = y.bar.glarch DO
        f.field1 := g.field1;
        f.field3 := g.field3;
        f.field7 := g.field7;
    END;

    WITH d = (27.0 * r + 42.0 * s) / (t*t*t + r/s) DO
        IF d # 0.0 THEN val := n/d ELSE val := 0.0 END;
    END;
END Main.
