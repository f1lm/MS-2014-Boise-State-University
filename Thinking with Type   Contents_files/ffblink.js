var d = document, e = d.documentElement,
s = d.createElement('style');
if (e.style.MozTransform === ''){ // gecko 1.9.1 inference
  s.textContent = 'body{visibility:hidden}';
  e.firstChild.appendChild(s);
  function f(){ s.parentNode && s.parentNode.removeChild(s); }
  addEventListener('load',f,false);
  setTimeout(f,3000); 
};