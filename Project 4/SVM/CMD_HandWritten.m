function [ output_args ] = CMD_HandWritten( z, filePathTrainData )
%UNTITLED2 Summary of this function goes here
%   Detailed explanation goes here

    XYtrain = load(filePathTrainData);

    Xtrain = double(XYtrain(2:size(XYtrain, 1), :))';

    Ytrain = double(XYtrain(1, :))';
    
    Data = Xtrain;
    distance = pdist(Data, 'euclidean');
    D = squareform(distance);
    
    [Y, eigvals] = cmdscale(D);
    
    k =z;
    
    Lambda = diag(eigvals(1:k));
    Xnew = Y(:, 1:k) * (Lambda.^(1/2));
    
    
    Newdata = vertcat(Ytrain', Xnew');
    
    group_Count = 39;
    freedom = group_Count-1;
    group = 26;
    KFold = 5;

    
    svm(Xnew',group_Count,KFold,Ytrain',group,freedom,false);
end

