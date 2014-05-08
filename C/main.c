
#include <stdio.h>
#include <inttypes.h>
#include "decodableDeBruijnData.h"
#include "decodableDeBruijn.h"

uint8_t w_[N];

uint8_t incW(uint8_t i) {
  if(i==N) return 1;
  
  w_[i]++;
  if(w_[i]==C) {
    w_[i]= 0;
    return incW(i+1);
  }
  return 0;
}

int main() {
  uint32_t i= 0;
  uint32_t at;

  for(uint8_t j= 0; j<N; j++) w_[j]= 0;

  do {
    for(uint8_t j= 0; j<N; j++) w[j]= w_[j];
    
    at= decodeDeBruijn(N);

    printf("no %05d, [", i);
    for(uint8_t j= 0; j<N; j++)
      printf("%d", w_[j]);
    printf("] found at %5d, decoded at %5d\n", locDB[i], at);
    
    i++;
  } while(!incW(0));

  return 0;

}

