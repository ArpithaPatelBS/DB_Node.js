z=5;
%p=input('Please enter dimension\n');
inputFile=load('C:\Users\Patel\Desktop\DataMining\Final Demo All Projects\Project 4\PCD_LDA_Laplasian\SVM\ATnTDataSet.txt');
input=KFOLD_PCA(z,inputFile,50);
%input=KFOLD_LDA(z,inputFile,50);
%input=KFOLD_Laplace(z,inputFile,30);
acc = rand(1,z);
for m=1:z
    m
 TRAIN=cell2mat(input(1,m));
 TEST=cell2mat(input(2,m));
 dim=size(TRAIN,2);
    for i=1:size(TEST,1)
        TEL(i)=  TEST(i,dim);
    end
    for i=1:size(TRAIN,1)
        TL(i)=  TRAIN(i,dim);
    end
    Tlables=unique(TL);
TRAIN(:,dim)=[];
TEST(:,dim)=[];
data = zscore(TRAIN);              
numInst = size(data,1);
numLabels = max(Tlables);
TL=TL(:);
TEL=TEL(:);

model = cell(numLabels,1);
for k=1:numLabels
    model{k} = svmtrain(double(TL==k), TRAIN, '-t 2 -g 0.7 -b 1');
    
    %model{k} = svmtrain(double(TL==k), TRAIN, '-t 2 -c 1 -g 2 -b 1');
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



