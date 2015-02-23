var CLIENT_CACHE_GUID_COOKIE_NAME = 'web_client_cache_guid';

var ClientCache =
{
    clear : function()
    {
      sessionStorage.clear();
    },

    setItem : function( key, value )
    {
      this._validateSession();
      sessionStorage.setItem( key, value );
    },
    
    getItem : function(key)
    {
      this._validateSession();
      return sessionStorage.getItem( key );
    },

    removeItem : function( key )
    {
      this._validateSession();
      sessionStorage.removeItem( key );
    },

    _validateSession : function()
    {
      var guidCookie = getCookie( CLIENT_CACHE_GUID_COOKIE_NAME );
      if ( guidCookie == null || guidCookie != sessionStorage.getItem( CLIENT_CACHE_GUID_COOKIE_NAME ) )
      {
        sessionStorage.clear();
        if ( guidCookie != null )
        {
          sessionStorage.setItem( CLIENT_CACHE_GUID_COOKIE_NAME, guidCookie );
        }
      }
    }
};