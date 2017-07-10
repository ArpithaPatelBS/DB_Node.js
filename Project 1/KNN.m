function outPut = KNN(filePathTraining, filePathTesting)
    XYtest = load(filePathTesting);
    XYtrain = load(filePathTraining);
    Ytest = double(XYtest(1, :));
    Xtrain = double(XYtrain(2:size(XYtrain, 1), :))';
    Ytrain = double(XYtrain(1, :))';
    Xtest = double(XYtest(2:size(XYtest, 1), :))';

    k=input('Please input the value for K in KNN classification\n');
    Actual=Ytest;
    Actual
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
        
    end
    fprintf('\n');
    
    
end