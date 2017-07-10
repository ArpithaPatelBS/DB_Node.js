function [ output_args ] = Laplace_Hand_Kfold( k, filePathTrainData,p )
%UNTITLED7 Summary of this function goes here
%   Detailed explanation goes here

   X=filePathTrainData(2:size(filePathTrainData,1),:)';
L=double(filePathTrainData(1, :))';
dist = squareform(pdist(X));
sigma = max(dist(:));

W = exp(-dist/sigma);

D = zeros(size(W));

for i=1:size(X,1)
    sum = 0;
    for j=1:size(X,1)
        sum = sum + W(i,j);
    end
   D(i,i) = sum;
end
 
L = D-W;

[eigvect,eigvalue] = eig(L,D);
 
eigvalue = diag(eigvalue);
 
[eigvalues_sorted,idx] = sort(eigvalue,'ascend');
 %p=20;
 U = eigvect(:,idx(2:p+1));
 
Ytrain=double(filePathTrainData(1, :));

Xtrain=vertcat(Ytrain,U')';
s=size(Xtrain,2)
    
    OutPutMatrix = cell(2,k)

    for m = 1:k
        OutPutMatrix(1,m) = mat2cell(rand( 26 * (39 - floor(39/k)), s), [26 * (39 - floor(39/k))],[s]);
        OutPutMatrix(2,m) = mat2cell(rand(26 * (floor(39/k)), s), [26 * (floor(39/k))],[s]);
    end
            
    a = 1;
    for i = 1 : k
        Test = rand(26 * (floor(39/k)), size(Xtrain,2));
        Train = rand(26 * (39 - floor(39/k)), size(Xtrain,2));
        testIncrementor = 1;
        trainIncrementor = 1;
        for j = 0:39:(size(Xtrain,1) - (k*floor(39/k)))
            for l = 1:39
                if(l >= a && l < a + floor(39/k))
                    Test(testIncrementor , :) = Xtrain(j+l , :);
                    testIncrementor = testIncrementor + 1;
                else
                    Train(trainIncrementor , :) = Xtrain(j+l , :);
                    trainIncrementor = trainIncrementor + 1;
                end
            end
        end
        a = a + floor(39/k);
        OutPutMatrix( 1 , i ) =  mat2cell(Train, [26 * (39 - floor(39/k))],[s]);
        OutPutMatrix( 2, i) = mat2cell(Test, [26 * (floor(39/k))],[s]);
    end

    output_args = OutPutMatrix;
end

