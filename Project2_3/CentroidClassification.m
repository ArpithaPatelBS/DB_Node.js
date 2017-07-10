function [] = CentroidClassification(z, inputFile)

    InputData = KFOLD(z, inputFile);
    %InputData = KFOLD_HandWritten(inputFile);
    Accuracy = rand(1 , z);
    
    for m = 1 : z

        XYtest = cell2mat(InputData( 2, m));
        XYtrain = cell2mat(InputData( 1, m));
        
        Ytest = double(XYtest(:, 1));
        Xtrain = double(XYtrain( : , 2:size(XYtrain, 2)));
        Ytrain = double(XYtrain(:, 1));
        Xtest = double(XYtest(: , 2:size(XYtest, 2)));
        
        


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
        %Actual
        outPut
        
        Count = 0;
        for n = 1 : size(Actual)
            if(Actual(n, 1) == outPut(1,n))
                Count = Count +1;
            end
        end
        
        Accuracy(1, m) = (Count/size(Xtest,1)) *100;
        Accuracy(1,m)

    end
    
    sumAccuracy = 0;
    for n = 1: size(Accuracy, 2)
        sumAccuracy = sumAccuracy +  Accuracy(1, n);
    end
    Average  = sumAccuracy / z;
    Average
    
end