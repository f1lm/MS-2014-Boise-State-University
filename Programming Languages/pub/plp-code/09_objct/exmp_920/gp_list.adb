-- (part of) Ada code for Example 9.20 (Figure 9.2)

package body gp_list is
    procedure initialize
        (self : access gp_list_node) is
    begin
        self.prev := gp_list_node_ptr(self);
        self.next := gp_list_node_ptr(self);
        self.head_node := gp_list_node_ptr(self);
    end initialize;

    procedure finalize
        (self : access gp_list_node) is
    begin
        if not singleton (self) then
            raise list_err;
        end if;
    end finalize;
    
    function predecessor
        (self : access gp_list_node)
        return gp_list_node_ptr is
    begin
        if self.prev = gp_list_node_ptr(self)
                or self.prev = self.head_node then
            return null;
        else
            return self.prev;
        end if;
    end predecessor;
    
   function successor
        (self : access gp_list_node)
        return gp_list_node_ptr is
    begin
        if self.next = gp_list_node_ptr(self)
                or self.next = self.head_node then
            return null;
        else
            return self.next;
        end if;
    end successor;
    
    function singleton
        (self : access gp_list_node)
        return boolean is
    begin
        return self.prev = gp_list_node_ptr(self);
    end singleton;
    
    procedure insert_before
        (self : access gp_list_node; new_node : gp_list_node_ptr) is
    begin
        if not singleton (new_node) then
            raise list_err;
        end if;
        self.prev.next := new_node;
        new_node.prev := self.prev;
        new_node.next := gp_list_node_ptr(self);
        self.prev := new_node;
        new_node.head_node := self.head_node;
    end insert_before;
    
    procedure remove
        (self : access gp_list_node) is
    begin
        if singleton (self) then
            raise list_err;
        end if;
        self.prev.next := self.next;
        self.next.prev := self.prev;
        self.prev := gp_list_node_ptr(self);
        self.next := gp_list_node_ptr(self);
        self.head_node := gp_list_node_ptr(self);
    end remove;

    ------

    procedure initialize
        (self : access list) is
    begin
        initialize (self.head_node'Access);
    end initialize;
    
    procedure finalize
        (self : access list) is
    begin
        if not singleton (self.head_node'Access) then
            raise list_err;
        end if;
    end finalize;
    
    function empty
        (self : access list)
        return boolean is
    begin
        return singleton (self.head_node'Access);
    end empty;
    
    function head
        (self : access list)
        return gp_list_node_ptr is
    begin
        return successor (self.head_node'Access);
    end head;
    
    procedure append
        (self : access list; new_node : gp_list_node_ptr) is
    begin
        insert_before (self.head_node'Access, new_node);
    end append;
end gp_list;
