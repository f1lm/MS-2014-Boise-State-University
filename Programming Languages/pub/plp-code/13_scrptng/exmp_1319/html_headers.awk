#! /usr/bin/awk -f
# Example 13.19 (Figure 13.2)
# usage: ./html_headers.awk test.html

/<[hH][123]>/ {
    # execute this block if line contains an opening tag
    do {
        open_tag = match($0, /<[hH][123]>/)
        $0 = substr($0, open_tag)       # delete text before opening tag

        while (!/<\/[hH][123]>/) {      # print interior lines
            print                       # in their entirety
            if (getline != 1) exit
        }
        close_tag = match($0, /<\/[hH][123]>/) + 4

        print substr($0, 0, close_tag)  # print through closing tag
        $0 = substr($0, close_tag + 1)  # delete through closing tag
    } while (/<[hH][123]>/)             # repeat if more opening tags
}
