/* Example 7.60 */

char days1[][10] = {        /* contiguous layout */
    "Sunday", "Monday", "Tuesday",
    "Wednesday", "Thursday",
    "Friday", "Saturday"
};

char *days2[] = {           /* row-pointer layout */
    "Sunday", "Monday", "Tuesday",
    "Wednesday", "Thursday",
    "Friday", "Saturday"
};

int main() {
    /* note identical syntax in the following */

    days1[2][3] == 's';  /* in Tuesday */
    days2[2][3] == 's';  /* in Tuesday */
}
