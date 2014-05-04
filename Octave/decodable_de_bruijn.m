function t= decodable_de_bruijn(c, n)

if length(n)>1
    s= n;
    n= length(s)^(1/c) + 1;
end

if n<=2
    t= de_bruijn(c, 2);
else
    n_= n-1;
    if ~exist('s', 'var')
        s= decodable_de_bruijn(c, n_);
    end
    k= strfind(char([s s(1:n_-1)]), char(ones(1, n_)));
    s_= [s(1:k-1) s(k+1:end)];
    s_hat= operator_D_inv(s_, 0, c);
    p= (c-1)*(c^n_ - 1)+k;
    e= s_hat(p);
    t= rho(p, e, s_hat);
end    

if nargout<1
    s_= [t t(1:n-1)]; for i= 1:length(t), a(i)= sum(c.^(0:n-1).*s_(i:i+n-1)); end
    fprintf('%s\n', char(t+double('0')));
    fprintf('is de bruijn: %d\n', all(sort(a)==0:c^n-1));
    
end

function s_= operator_D_inv(s, b, c)
w= mod(sum(s), c);
if w~=0
    s= repmat(s, 1, c/gcd(c, w));
end
s_= mod([0 cumsum(s(1:end-1))]+b, c);
end

function t= rho(p, e, s)
    t= [s(1:p-1) mod(e:e+c-1, c) s(p:end)];
end

end