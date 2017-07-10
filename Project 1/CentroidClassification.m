function outPut = CentroidClassification(filePathTrainData, filePatheTestData)
    XYtest = load(filePatheTestData);
    XYtrain = load(filePathTrainData);

    Xtrain = double(XYtrain(2:size(XYtrain, 1), :))';
    Xtest = double(XYtest(2:size(XYtest, 1), :))';

    Ytrain = double(XYtrain(1, :))';
    Ytest = double(XYtest(1, :));
    
    
    meanMatrix = rand(size(Xtest));
    
    prevY = 0;
    y = 0;
    trainSet = 1;
    
    for i = 1 : size(Ytrain) 
                     
       if( i == 1)
           meanMatrix(i, :) =  zeros(1 , 644 , 'double');
           prevY = Ytrain(i);
       else
           prevY = Ytrain(i-1);
       end
       
       
        y =  Ytrain(i);
       
             
       if(prevY ~= y)
           trainSet = trainSet + 1;
           meanMatrix(y, :) =  Xtrain(i, :);
       else 
          meanMatrix(y, :) = meanMatrix(y, :) + Xtrain(i, :);
       end
       
    end
   
    
    meanMatrix = meanMatrix / (size(Ytrain, 1) / trainSet);
        
    Dist = pdist2(meanMatrix,Xtest,'euclidean');        
    
    
    [minInRow, minInColumn] = min(Dist, [], 1);

    
    Actual=Ytest;
    outPut = minInColumn;  
    Actual
    outPut
    
end