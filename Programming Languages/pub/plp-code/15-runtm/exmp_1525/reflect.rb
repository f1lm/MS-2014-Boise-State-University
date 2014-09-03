#! /usr/bin/ruby
# Example 15.25
# Note: the number of methods in library classes, and their location in
# the instance_methods array, can change from one version of Ruby to the
# next.  This code was tested in version 1.8.6 on MacOS 10.5

squares = {2=>4, 3=>9}
p squares.class                         # Hash
p Hash.public_instance_methods.length   # 98 -- Hashes have many methods
p squares.public_methods.length         # 98 -- those same methods
m = Hash.public_instance_methods[16]
p m                                     # "store"
p squares.method(m).arity               # 2 -- key and value to be stored
squares.store(1, 1)                     # static invocation
p squares                               # {1=>1, 2=>4, 3=>9}
squares.send(m, 0, 0)                   # dynamic invocation
p squares                               # {0=>0, 1=>1, 2=>4, 3=>9}
