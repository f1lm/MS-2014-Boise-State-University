#! /usr/bin/ruby
# Example 13.81, including "Executable class declarations" sidebar

def expensive_function()
    return false                        # placeholder
end

class My_class
    def initialize(a, b)
        @a = a;  @b = b;
    end
    if expensive_function()
        def get()
            return @a
        end
    else
        def get()
            return @b
        end
    end
end

my_object = My_class.new(2, 3)
print my_object.get(), "\n"             # prints 3
