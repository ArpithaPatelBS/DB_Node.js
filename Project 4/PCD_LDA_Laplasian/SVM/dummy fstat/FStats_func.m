function newMat = FStats_func(X,sc,tfs,di,fn,feat)

for i=1:fn
    mean_of_all_features(i,1) = mean(X(i,:));
end

for j=1:fn
totalSum(j,1)=0;
for i = 1:sc:tfs
  totalSum(j,1) = totalSum(j) + 10*(mean(X(j,i:i+di))-mean_of_all_features(j,1))^2;
end
end
bgv = totalSum/(sc-1);

for j=1:fn
k=1;
for i = 1:sc:tfs
  mean_of_grp(j,k) =mean(X(j,i+di));
  k = k+1;
end
end

for j = 1:fn
newSum(j,1) = 0;
k=0;
for i=1:tfs
    if mod(i,sc)==1
        k= k+1;
    end
    newSum(j,1) =  newSum(j,1) + (X(j,i)-mean_of_grp(j,k))^2;
end
end

wgv = newSum/(tfs-sc);
    
fvalue = bgv./wgv;

sortedFvalue = sort(fvalue,'descend');

for i=1:feat
    newMat(i,:) = X(find(sortedFvalue(i,:)==fvalue),:);
end

end