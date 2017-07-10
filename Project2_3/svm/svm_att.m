z=5;
input=KFOLD(z, 'C:\Users\Patel\Desktop\DataMining\Final Demo All Projects\Project2_3\svm\ATnTDataSet.txt')
%input=KFOLD_HandWritten(z, 'F:\Spring 2016\Data Mining\Data Mining Project 2\Data Mining Project2_3 final\HandWrittenDataSet.txt')
acc = rand(1,z);
for m=1:z
    m
 TRAIN=cell2mat(input(1,m));
 TEST=cell2mat(input(2,m));
    for i=1:size(TEST,1)
        TEL(i)=  TEST(i,645);
    end
    for i=1:size(TRAIN,1)
        TL(i)=  TRAIN(i,645);
    end
    Tlables=unique(TL);
TRAIN(:,645)=[];
TEST(:,645)=[];
data = zscore(TRAIN);              
numInst = size(data,1);
numLabels = max(Tlables);
TL=TL(:);
TEL=TEL(:);

model = cell(numLabels,1);
for k=1:numLabels
    model{k} = svmtrain(double(TL==k), TRAIN, '-t 2 -g 0.7 -b 1');  % linear
    
    %model{k} = svmtrain(double(TL==k), TRAIN, '-t 0 -g 0.7 -b 1'); %
    %guasian
end

prob = zeros(size(TEST,1),numLabels);
for k=1:numLabels
    [~,~,p] = svmpredict(double(TEL==k), TEST, model{k},'-b 1');
    prob(:,k) = p(:,model{k}.Label==1);    
end
[~,pred] = max(prob,[],2);
%acc = sum(pred == TEL) ./ numel(TEST)    
C = confusionmat(TEL, pred)
dsum=0;
for x=1:size(C,1)
    for y=1:size(C,2)
    if x==y
        [TP]=C(x,y);
        dsum=dsum+C(x,y);
    end
    end
end
dsum;
totsum=0;
for x=1:size(C,1)
    for y=1:size(C,2)
        totsum=totsum+C(x,y);
    end
end
totsum;
acc(1,m)=dsum/totsum
acc
end

sumAccuracy = 0;
    for n = 1: size(acc, 2)
        sumAccuracy = sumAccuracy +  acc(1, n);
    end
    Average  = sumAccuracy / z;
    Average*100



