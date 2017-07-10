function svm(X,sc,kFold,Y,g,di,faceImages)

N = size(X,2);
Accuracy = 0;

YfirstClass = Y(:,1:sc);
sizeOfClass = size(YfirstClass,2);
% kFold = 5;

YFinalLabel = zeros(size(Y));
temp = false;
if faceImages
    lastItem = floor(sizeOfClass/kFold);
else
    lastItem = ceil(sizeOfClass/kFold);
end
remainder = mod(sizeOfClass,kFold);

classIndex = 1;
for i = 1:lastItem:sizeOfClass
    if i==1 && remainder~=0 && faceImages
        indices(i:i+lastItem-1+remainder) = classIndex;
        temp = true;
        classIndex = classIndex+1;
    else    
    if temp
        i=i+1;
    end
    indices(i:i+lastItem-1) = classIndex;
    classIndex = classIndex+1;
    end
end


for i = sc+1:sc:N
    indices(i:i+di) = indices(1:sc);
end

for crossval = 1:kFold
    Xtest = X(:,indices==crossval);
    Xtrain = X(:,indices~=crossval);
    Ylabel = Y(:,indices~=crossval);
    YtestingLabel = Y(:,indices==crossval);
    
    N = size(Xtrain,1);
    M = size(Xtrain,2);
    Z = size(Xtest,2);
    
    Xtrain = double(Xtrain);
    Xtest = double(Xtest);
    finalLabel = 0;

        
    svmStruct = svmtrain(Ylabel',Xtrain','-s 0 -t 0');
    [svmResult, accuracy, ~]=svmpredict(YtestingLabel', Xtest', svmStruct);
    
    svmResult = svmResult';
    sizeTestingLabel = size(YtestingLabel,2);
    sameLabels = 0;
    for j = 1:sizeTestingLabel
        if YtestingLabel(1,j) == svmResult(1,j)
            sameLabels = sameLabels+1;
        end
    end
    Accuracy(crossval) = sameLabels/sizeTestingLabel;
    YFinalLabel(:,indices==crossval) = svmResult;
end
for i=1:kFold
    fprintf('Accuracy for fold %d is %.2f\n ',i, Accuracy(i)*100);
end
OverallAccuracy = (size(find(YFinalLabel==Y),2))/(size(Y,2))*100
end