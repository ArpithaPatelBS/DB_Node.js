function [ output_args ] = F_Statistics(alpha, filePathTrainData)

    XYtrain = load(filePathTrainData);

    Xtrain = double(XYtrain(2:size(XYtrain, 1), :));

    Ytrain = double(XYtrain(1, :));
    
   
   
    for i=1:644
        overAllMean(i,1) = mean(Xtrain(i, :));
    end
   
    
    
    for j=1:644
        k=1;
        for i = 1:10:400
          sampleMean(j,k) =mean(Xtrain(j, i : i+9));
          k = k+1;
        end
    end
    
    
    for j=1:644
        Between_Group_Sum(j,1)=0;
        for i = 1:10:400
          Between_Group_Sum(j,1) = Between_Group_Sum(j) + 10*(mean(Xtrain(j,i:i+9))-overAllMean(j,1))^2;
        end
    end
    Between_Group_Sum_Mean_Square = Between_Group_Sum/(10-1);
    
   
    for j = 1:644
    With_in_Group(j,1) = 0;
    k=0;
    for i=1:400
        if mod(i,10)==1
            k= k+1;
        end
        With_in_Group(j,1) =  With_in_Group(j,1) + (Xtrain(j,i)-sampleMean(j,k))^2;
    end
    end

    With_in_Group_Sum_Mean = With_in_Group/(400-10);


    Fstatiscics = Between_Group_Sum_Mean_Square./With_in_Group_Sum_Mean;

     
   sortedValue = sort(Fstatiscics,'descend');

    for i=1:alpha
        XTrainInput(i,:) = Xtrain(find(sortedValue(i,:)==Fstatiscics),:);
    end

     Newdata = vertcat(Ytrain, XTrainInput); 
     
     KNN_KFOLD(Newdata', Ytrain, alpha);
     %CentroidClassification(Newdata', Ytrain, alpha);
     %AlgLinRegression(Newdata', Ytrain, alpha);
end