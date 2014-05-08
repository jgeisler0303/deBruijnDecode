#include "decodableDeBruijnData.h"

#define R 2

uint8_t w[N];

static void operatorD(uint8_t n) {
  for(uint8_t i= 1; i<n; i++) {
    w[i-1]= w[i]-w[i-1];
    if(w[i-1]<0) w[i-1]+= C;
  }
}

uint32_t decodeDeBruijn(uint8_t n) {
  if(n==R)
    return T[w[0] + C*w[1]];
  
  uint8_t w0= w[0];
  n--;
  uint8_t nR= n-R;
  operatorD(n);
  
  uint8_t k;
  if(nR==0)
    k= 2;
  else
    k= (C-1)*(powC_N[nR+1]-1);

  uint32_t p= (C-1)*powC_N[nR] + k;
  uint32_t e;
  uint32_t f;
  uint32_t j;

  uint8_t allOnes= 1;
  for(uint8_t i= 0; i<n; i++)
    if(w[i]!=1) allOnes= 0;
    
  if(allOnes) {
    e= w0-L[idxL[nR] + k] + powC_2;
    if(e<0) e+= C;
    j= p + e;
  } else {
    f= decodeDeBruijn(n);
    if(f>k)
      f--;

    e= L[idxL[nR] + f]-w0;
    if(e<0) e+= C;
    
    j= f + (powC_N[nR] - 1)*e;
    if(j<0 || j>p-1)
      j+= C;
  }
  
  return j;
}
