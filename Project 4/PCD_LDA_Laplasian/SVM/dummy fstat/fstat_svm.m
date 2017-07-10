function []=fstat_svm(z, filePathInput)
 XYtrain=load(filePathInput) ;
 X = double(XYtrain(1:size(XYtrain, 1), :));
 Y = double(XYtrain(1, :));
% sc = 39;
% tfs = 1014;
% di = sc-1;
% fn = 320;
% feat = 50;
% g = 26;

g = 40;
new_X = FStats_func(X,10,400,10-1,644,50); %X,num_images,X(size,2),num_images-1, X(size,1),Dim

k_Fold = z;

SVM_func_libsvm(new_X,10,k_Fold,Y,g,10-1,true);
end
