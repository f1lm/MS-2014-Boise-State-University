#! /usr/bin/python
# Example 6.64 (Figure 6.5)

class BinTree:
    def __init__(self):
        self.data = self.lchild = self.rchild = None

    def insert(self, d):
        if self.data == None:
            self.data = d
        else:
            if d < self.data:
                if self.lchild == None:
                    self.lchild = BinTree()
                self.lchild.insert(d)
            else:
                if self.rchild == None:
                    self.rchild = BinTree()
                self.rchild.insert(d)

    def preorder(self):
        if self.data != None:
            yield self.data
        if self.lchild != None:
            for d in self.lchild.preorder():
                yield d
        if self.rchild != None:
            for d in self.rchild.preorder():
                yield d

myTree = BinTree()
myTree.insert(5)                  #        5 
myTree.insert(3)                  #     3     11
myTree.insert(11)                 #    2     7
myTree.insert(7)
myTree.insert(2)

for d in myTree.preorder():
    print d
