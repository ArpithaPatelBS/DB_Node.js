function [ output_args ] = FStatistics_HandWritten( alpha, filePathTrainData)

    XYtrain = load(filePathTrainData);

    Xtrain = double(XYtrain(2:size(XYtrain, 1), :));

    Ytrain = double(XYtrain(1, :));
    
   
   
    for i=1:320
        overAllMean(i,1) = mean(Xtrain(i, :));
    end
   
    
    
    for j=1:320
        k=1;
        for i = 1:39:1014
          sampleMean(j,k) =mean(Xtrain(j, i : i+38));
          k = k+1;
        end
    end
    
    
    for j=1:320
        Between_Group_Sum(j,1)=0;
        for i = 1:39:1014
          Between_Group_Sum(j,1) = Between_Group_Sum(j) + 39*(mean(Xtrain(j,i:i+38))-overAllMean(j,1))^2;
        end
    end
    Between_Group_Sum_Mean_Square = Between_Group_Sum/(39-1);
    
   
    for j = 1:320
    With_in_Group(j,1) = 0;
    k=0;
    for i=1:1014
        if mod(i,39)==1
            k= k+1;
        end
        With_in_Group(j,1) =  With_in_Group(j,1) + (Xtrain(j,i)-sampleMean(j,k))^2;
    end
    end

    With_in_Group_Sum_Mean = With_in_Group/(1014-39);


    Fstatiscics = Between_Group_Sum_Mean_Square./With_in_Group_Sum_Mean;

     
   sortedValue = sort(Fstatiscics,'descend');

    for i=1:alpha
        XTrainInput(i,:) = Xtrain(find(sortedValue(i,:)==Fstatiscics),:);
    end

     Newdata = vertcat(Ytrain, XTrainInput); 
     
     KNN_KFOLD_HandWritten(Newdata', Ytrain, alpha);
     %CentroidClassification_HandWritten(Newdata', Ytrain, alpha);
     %AlgLinRegression_HandWritten(Newdata', Ytrain, alpha);
end

