function s= de_bruijn(k, n)
a= zeros(1, k*n);
s= [];
db(1, 1);

% s(s==1)= -1;
% s(s==k-1)= 1;
% s(s==-1)= k-1;

if nargout<1
    fprintf('%s\n', s+'0');
    s_= [s s(1:n-1)]; for i= 1:length(s), a(i)= sum(k.^(0:n-1).*s_(i:i+n-1)); end
    all(sort(a)==0:k^n-1)
end



function db(t, p)
if t>n
    if mod(n, p)==0
        for j= 1:p
            s= [s a(j+1)];
        end
    end
else
    a(t+1)= a(t-p+1);
    db(t+1, p);
    for j= a(t-p+1)+1:k-1
        a(t+1)= j;
        db(t+1, t);
    end
end
end

end