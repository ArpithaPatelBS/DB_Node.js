function outPut = KNN_KFOLD_HandWritten_LDA(z, inputFile)
    inputFile=load(inputFile);
    k=input('Please input the value for K in KNN classification\n');
    p=input('Please enter dimension\n');
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

%Xtrain=X';
Xtrain=vertcat(Ytrain,U')';
s=size(Xtrain,2);
    
    for m = 1 : z

        XYtest = cell2mat(InputData( 2, m));
        XYtrain = cell2mat(InputData( 1, m));
        
        Ytest = double(XYtest(:, 1));
        Xtrain = double(XYtrain( : , 2:size(XYtrain, 2)));
        Ytrain = double(XYtrain(:, 1));
        Xtest = double(XYtest(: , 2:size(XYtest, 2)));
        
        Count = 0;
        Actual=Ytest;
        %Actual
        fprintf('Output =\n');
        for j = 1:size(Xtest,1)
            dist= [];
            for i = 1:size(Ytrain,1)
                diff=Xtrain(i,:)-Xtest(j,:);
                d=sqrt(sum(diff.^2));
                dist = [dist; [d Ytrain(i)]];
            end
            dist = sortrows(dist);
            count = 1;
            final = [];

            dist;
            while count<=k        
               values = dist(count, :);
               final = [final values(1, 2)];
               count = count + 1;  
            end
            M=mode(final);
            %fprintf('The predicted class for the image %d is: %d\n',j,M);
            if (j==1)
                fprintf('     %d    ',M);
            else
                fprintf('%d     ',M);
            end    
            
            if( M == Actual( j,1) )
                Count = Count +1;
            end
                  

        end
        
        Accuracy(1, m) = (Count/size(Xtest,1)) *100;
        Accuracy(1,m)
        fprintf('\n');
       
    end
    
    sumAccuracy = 0;
    for n = 1: size(Accuracy, 2)
        sumAccuracy = sumAccuracy +  Accuracy(1, n);
    end
    Average  = sumAccuracy / z;
    Average
end