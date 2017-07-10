

function [] =  AlgLinRegression_HandWritten(z, filePathInput)
    

   inputFile = load(filePathInput);
    p=input('Please enter dimension\n');
    %InputData = KFOLD_HandWritten_PCA(z, inputFile,p);
    InputData = Laplace_Hand_Kfold(z,inputFile,p);
    %InputData = KFOLD_HandWritten_LDA(z, inputFile,p);
    

    Accuracy = rand(1 , z);
    

    for m = 1 : z
    
        XYtest = cell2mat(InputData(2, m));
        XYtrain = cell2mat(InputData(1, m));

        Ytest = double(XYtest(:, 1))';
        Xtrain = double(XYtrain( : , 2:size(XYtrain, 2)))';
        Xtest = double(XYtest(: , 2:size(XYtest, 2)))';
            %Ytrain = rand(40, size(Xtrain, 2));
            Ytrain = rand(26, size(Xtrain, 2));
            size(Xtest, 2);
            size(Ytrain, 2);
            %for i = 1 : 40
            for i = 1 : 26
                Ytrain(i  , :) =  zeros(1 , size(Ytrain, 2) , 'double');
                k = i -1;
                %for j = 1 + k*7 : i*7
                for j = 1 + k*size(Xtrain,2)/26 : i*size(Xtrain,2)/26
                    Ytrain(i , j) = 1;
                end

            end

        
            B = pinv(Xtrain') *  double(Ytrain)'  ; % (XX')^{-1} X  * Y'
            Ytrain1 = B' * Xtrain;
            Ytest1 = B' * Xtest;

            [Ytest2value  Ytest2]= max(Ytest1,[],1);
            [Ytrain2value  Ytrain2]= max(Ytrain1,[],1);

           Actual = Ytest;
           outPut = round(Ytest2);
           %actual   
           outPut
           
           Count = 0;
            for n = 1 : size(Actual, 2)
                if(Actual(1, n) == outPut(1,n))
                    Count = Count +1;
                end
            end

            Accuracy(1, m) = (Count/size(Actual,2)) *100;
            Accuracy(1,m)
    end
    
    sumAccuracy = 0;
    for n = 1: size(Accuracy, 2)
        sumAccuracy = sumAccuracy +  Accuracy(1, n);
    end
    Average  = sumAccuracy / z;
    Average
    
    
end
