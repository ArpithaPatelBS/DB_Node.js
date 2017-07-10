    XYtrain = load('C:\Users\Patel\Desktop\DataMining\Final Demo All Projects\Project2_3\ATnTDataSet.txt');
    %XYtrain = load('C:\Users\Patel\Desktop\DataMining\Final Demo All Projects\Project2_3\HandWrittenDataSet.txt');
    
    Xtrain = double(XYtrain(1:size(XYtrain, 1), :))';
    Ytrain = double(XYtrain(1, :))';
    A = Xtrain(: , (2:size(Xtrain, 2)));
    idx = kmeans(A,40);
    %idx = kmeans(A,26);
    [C, order]=confusionmat(Ytrain, idx');
    C
    value=munkres(-C)
    value
    
    
    z = C(:, value);
    total = trace(z);
    accuracy  = 100* (total/400);
    %accuracy  = 100* (total/1014);
    accuracy
    
   
   
  