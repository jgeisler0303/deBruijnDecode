c= 2;
n= 3;

t= decodable_de_bruijn(c, n);
t= [t t(1:n-1)];
for i= 1:c^n
    w= zeros(1, n);
    i_= i-1;
    for j= n:-1:1
        w(j)= mod(i_, c);
        i_= floor(i_/c);
    end
    j_= strfind(char(t), char(w))-1;
    if isempty(j_)
        j_= -1;
    else
        if length(j_)>1
            fprintf('j(2)= %d ', j_(2));
             j_= j_(1);
         end
    end
   [j, L, T, K]= decode_de_bruijn(w, c);
   
   fprintf('pattern no %d (%s) found at %d decoded at %d (correct %d)\n', i, char(w+double('0')), j_, j, j==j_); 
end
 