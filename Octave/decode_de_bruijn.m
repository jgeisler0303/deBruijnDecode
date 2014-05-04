function [j, L, T, K]= decode_de_bruijn(w, c, L, T, K)

r= 2;
n= length(w);

if ~exist('L', 'var')
    L=  {};
    K=  {};
    for i= 1:n-r
        L{i}= decodable_de_bruijn(c, i+r);
        K{i+1}= strfind(char(L{i}), char(ones(1, i+r)))-1; % zero based
        L{i}= L{i}(1:c^(i+r-1)-1);
    end
end
if ~exist('T', 'var')
    t= decodable_de_bruijn(c, r);
    K{1}= strfind(char(t), char(ones(1, r)))-1; % zero based
    t= [t t(1:r-1)];
    T= zeros(1, c^r);
    for i= 1:c^r
        T(sum(c.^(0:r-1).*t(i:i+r-1))+1)= i-1;
    end
end

if n==r
    j= T(sum(c.^(0:r-1).*w)+1); % zero based
    return
end

v= operator_D(w);
i= n-r-1;
%k= (c-1)*(c^(n-2)-1);
%if i==0
 %   k= 2;
%end
k= K{n-r}; % zero based
p= (c-1)*(c^(n-1)-1) + k; % zero based
if all(v==ones(1, n-1))
    e= L{n-r}(k+1) + (c-1)^2;
    j= p + mod(w(1)-e, c);
else
    f= decode_de_bruijn(v, c, L, T, K);
    if f>k
        f= f-1;
    end
    e= L{n-r}(f+1);
    j= f + (c^(n-1)-1)*mod(e-w(1), c);
    if j<0 || j>p-1
        j= j+c;
    end
end

    function v= operator_D(w)
        v= mod(diff(w), c);
    end
end
