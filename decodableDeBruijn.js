var s;
var n;
var c;
var T;
var K;
var L;

function DeBruijn(c, n) {
  this.c= c;
  this.n= n;
  this.a= new Array(c*n);
  this.s= new Array();
  for(var j= 0; j<c*n; j++)
    this.a[j]= 0;
  this.generate(1, 1);
}

DeBruijn.prototype.generate= function(t, p) {
  // console.log("t: "+ t + ", p: " + p + ", c: " + this.c);
  if(t>this.n) {
    if((this.n%p)==0) {
      for(var j= 0; j<p; j++)
	this.s.push(this.a[j+1]);
      // console.log(this.a.join(" "));
    }
  } else {
    this.a[t]= this.a[t-p];
    this.generate(t+1, p);
    for(var j= this.a[t-p]+1; j<this.c; j++) {
      // console.log("j: "+ j + ", a: " + this.a.join(" "));
      
      this.a[t]= j;
      this.generate(t+1, t);
    }
  }
}

function mod(n, m) {
  n= n%m;
  if(n<0) n+= m;
  return n;
}

function gcd(a,b) {
    if (a < 0) a = -a;
    if (b < 0) b = -b;
    if (b > a) {var temp = a; a = b; b = temp;}
    while (true) {
        a %= b;
        if (a == 0) return b;
        b %= a;
        if (b == 0) return a;
    }
}

function sum(a) {
  var s= 0;
  for(var i= 0; i<a.length; i++)
    s+= a[i];
  return s;
}

function diff(a) {
  var s= new Array(a.length-1);
  for(var i= 1; i<a.length; i++)
    s[i-1]= a[i]-a[i-1];
    
  return s;
}

function cumsum(a) {
  for(var i= 1; i<a.length; i++)
    a[i]= a[i-1]+a[i];
    
  return a;
}
function wordIndex(w, c) {
  var idx= 0;
  var b= 1;
  // w.reverse();
  for(var i= 0; i<w.length; i++) {
    idx+= b*w[i];
    b*= c;
  }

  return idx;
}

function findWord(s, w) {
  var k;
  var n= w.length;
  var s_= s.concat(s.slice(0, n));
  var wi= 0;
  for(k= 0; k<s.length && wi!=n; k++)
    for(wi= 0; wi<n && s_[k+wi]==w[wi]; wi++);
  
  k--;
  if(k>=s.length)
    k= -1;
  return k;
}

function findOnes(s, n) {
  var w= new Array(n);
  for(var i= 0; i<n; i++)
    w[i]= 1;
  return findWord(s, w);
}

function decodableDeBruijn(c, n) {
  
  function operator_D_inv(s, b, c) {
    w= sum(s)%c;
    // console.log("w= " + w);
    if(w!=0) {
      var s_= s;
      for(var i= 0; i<c/gcd(c, w)-1; i++)
	s= s.concat(s_);
    }
    // console.log("s= " + s);
    s= cumsum(s.slice(0, -1));
    // console.log("s= " + s);
    s.unshift(0);
    // console.log("s= " + s);
    for(var i= 0; i<s.length; i++)
      s[i]= mod(s[i]+b, c);
      
    return s;
  }

  function rho(p, e, s) {
    var s_= s;
    s= s.slice(0, p);
    // console.log("s= " + s);
    var e_= new Array();
    for(var i= e; i<e+c; i++)
      e_[i-e]= i%c;
    // console.log("e_= " + e_);
    s= s.concat(e_);
    // console.log("s_.slice(p)= " + s_.slice(p));
    s= s.concat(s_.slice(p));
    
    return s;
  }
  
  var t;
  if(n<=2) {
    db= new DeBruijn(c, 2);
    t= db.s;
    var t_= t.concat(t.slice(0, 2));
    for(var i= 0; i<Math.pow(c, 2); i++)
      T[wordIndex(t_.slice(i, i+2), c)]= i;

  } else {
    var n_= n-1;
    s= decodableDeBruijn(c, n_);
    // console.log("generating for n= " + n + ", n_= " + n_);
    var k= findOnes(s, n_);
    // console.log("k= " + k);
    
    var s_= s.slice(0, k).concat(s.slice(k+1));
    var s_hat= operator_D_inv(s_, 0, c);
    // console.log("s_hat= " + s_hat);

    p= (c-1)*(Math.pow(c, n_) - 1) + k;
    // console.log("(c-1)*(Math.pow(c, n_) - 1)= " + n_);
    // console.log("p= " + p);
    e= s_hat[p];
    // console.log("e= " + e);
    t= rho(p, e, s_hat);
    L[n-3]= t.slice(0, Math.pow(c, n_)-1);
  }    

  K[n-2]= findOnes(t, n);
  return t;
}

function decodeDeBruijn(w, c) {
  function operator_D(w, c) {
    var dw= diff(w);
    for(var i= 0; i<dw.length; i++)
      dw[i]= mod(dw[i], c);
      
    return dw;
  }
  
  var r= 2;
  var n= w.length;

  if(n==r) {
    return T[wordIndex(w, c)];
  }
  
  var v= operator_D(w, c);
  var i= n-r-1;
  var k= K[n-r-1];
  var p= (c-1)*(Math.pow(c, n-1) - 1) + k;
  var allOnes= true;
  for(var i= 0; i<n-1; i++)
    if(v[i]!=1) allOnes= false;
    
  var e;
  var j;
  if(allOnes) {
    e= L[n-r-1][k] + Math.pow(c-1, 2);
    j= p + mod(w[0]-e, c);
  } else {
    var f= decodeDeBruijn(v, c);
    if(f>k) {
      f= f-1;
    }

    e= L[n-r-1][f];
    j= f + (Math.pow(c, n-1) - 1) * mod(e-w[0], c);
    if(j<0 || j>p-1) {
      j= j+c;
    }
  }
  return j;
}
