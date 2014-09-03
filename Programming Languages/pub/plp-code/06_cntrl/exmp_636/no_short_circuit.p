(* Example 6.36 (Figure 6.3) *)

{$B+}   (* This is a pragma [compiler directive] for gpc that tells
           it to use the non-short-circuiting version of the Boolean
           operators, as required by the language definition.
           [By default gpc is non-conforming.] *)

program no_short_circuit (doc_file, input, output);

const
    strlen = 80;

type
    string = array[1..strlen] of char;

var
    doc_file : text;
    total_misspellings : integer;
    w : string;

function tally(word : string) : integer;
    (* Look up word in hash table.  If found, increment tally; If not
        found, enter with a tally of 1.  In either case, return tally. *)
begin
    (* This code is only a placeholder *)
    writeln ('tally called');
    tally := 3
end;

function misspelled(word : string) : Boolean;
    (* Check to see if word is mis-spelled and return appropriate
        indication.  If yes, increment global count of mis-spellings. *)
begin
    (* This code is also a placeholder *)
    writeln ('misspelled called');
    misspelled := false
end;

function get_word (var f : text) : string;
var
    i : integer;
    temp : string;
begin
    i := 1;
    while (i <= strlen) and (not eoln(f)) do begin
        read(f, temp[i]);
        i := i + 1
    end;
    readln(f);
    get_word := temp
end;

begin
    assign(doc_file, 'doc_file');
        (* Association of Pascal files variables with external systems
           files is nonstandard.  This program uses Borland Pascal syntax,
           which gpc supports. *)
    reset(doc_file);
    total_misspellings := 0;
    while not eof(doc_file) do begin
        w := get_word(doc_file);
        if (tally(w) = 10) and misspelled(w) then
            writeln(w)
    end;
    writeln(total_misspellings)
end.
