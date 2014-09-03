/* C code for Section CD 7.3.4 (Examples 7.122 through 7.133) */

typedef struct element {
    char name[2];
    int atomic_number;
    double atomic_weight;
    _Bool metallic;
    _Bool naturally_occurring;
    union {
        struct {
            char *source;
            double prevalence;
        } natural_info;
        double lifetime;
    } extra_fields;
} element;

int main() {
    element copper;
    copper.name[0] = 'C';
    copper.name[1] = 'u';
    copper.naturally_occurring = 1;
    copper.extra_fields.natural_info.source
        = "elemental form and smelting from ore";
}
