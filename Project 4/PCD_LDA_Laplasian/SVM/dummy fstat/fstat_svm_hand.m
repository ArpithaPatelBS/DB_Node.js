function []=fstat_svm(z, filePathInput)
 XYtrain=load(filePathInput) ;
 X = double(XYtrain(1:size(XYtrain, 1), :));
 Y = double(XYtrain(1, :));

g = 26;
new_X = FStats_func(X,39,1014,39-1,320,20); %X,num_images,X(size,2),num_images-1, X(size,1),Dim

k_Fold = z;

SVM_func_libsvm(new_X,39,k_Fold,Y,g,39-1,true);
end
