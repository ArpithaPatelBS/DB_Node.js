
% The following is a MATLAB code for Linear Regresion

% Following transform Xtrain and Xtest into double precision if they are not.



% The following is a MATLAB code for Linear Regresion

% Following transform Xtrain and Xtest into double precision if they are not.

function outPut =  AlgLinRegression(filePathTraining, filePathTest)
    % The following is a MATLAB code for Linear Regresion

    % Following transform Xtrain and Xtest into double precision if they are not.

    XYtest = load(filePathTest);
    XYtrain = load(filePathTraining);
    Xtrain = double(XYtrain(2:size(XYtrain, 1), :));

    %Ytrain = double(XYtrain(1, :));

    Xtest = double(XYtest(2:size(XYtest, 1), :));
    Ytest = double(XYtest(1, :));

    % Xtrain = double(Xtrain);
    %  Xtest = double(Xtest);
    
    
    Temp = double(XYtrain(1, :));
    Ytrain = double(XYtrain(1, :));
    Ytrain = rand(size(Xtest, 2), size(Ytrain, 2));
    
    size(Xtest, 2);
    size(Ytrain, 2);
    for i = 1 : size(Xtest, 2)        
        Ytrain(i  , :) =  zeros(1 , size(Ytrain, 2) , 'double');
        k = i -1;
        for j = 1 + k*9 : i*9
            Ytrain(i , j) = 1;
        end
        
    end


    B = pinv(Xtrain') *  double(Ytrain)'  ; % (XX')^{-1} X  * Y'
    Ytrain1 = B' * Xtrain;
    Ytest1 = B' * Xtest;

    [Ytest2value  Ytest2]= max(Ytest1,[],1);
    [Ytrain2value  Ytrain2]= max(Ytrain1,[],1);

   actual = Ytest;
   outPut = round(Ytest2);
actual   
outPut
end
