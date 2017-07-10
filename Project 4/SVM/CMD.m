function [ output_args ] = CMD( k, filePathTrainData )
%UNTITLED2 Summary of this function goes here
%   Detailed explanation goes here

    XYtrain = load(filePathTrainData);

    Xtrain = double(XYtrain(2:size(XYtrain, 1), :))';

    Ytrain = double(XYtrain(1, :))';
    
    Data = Xtrain;
    distance = pdist(Data, 'euclidean');
    D = squareform(distance);
    
    [Y, eigvals] = cmdscale(D);
    
    %k =10;
    
    Lambda = diag(eigvals(1:k));
    Xnew = Y(:, 1:k) * (Lambda.^(1/2));
    
    
    Newdata = vertcat(Ytrain', Xnew');
    
    group_Count = 10;
    freedom = group_Count-1;
    group = 40;
    KFold = 5;
    svm(Xnew',group_Count,KFold,Ytrain',group,freedom,true);
end

