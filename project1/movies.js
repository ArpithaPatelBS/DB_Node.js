, download ? (Y/N)? ->")
              if message == 'y':
                  
                  s.send('OK')
                  directoryFilename = filename.split('/')
                  f= open(os.path.join('C:\Users\Amit\Downloads', directoryFilename[len(directoryFilename)-1]) , 'wb')
                  data = s.recv(1024)
                  totalRecv = len(data)
                  f.write(data)
                  while totalRecv < filesize:
                      data = s.recv(1024)
                      totalRecv += len(data)
                      f.write(data)

                      
                  print "Download Complete!"
              else:
                  print " Request Canceled !!"
                  
          else:
              print "File Does not exist!"

      
    
    except:
      print "Peer disconnected and file cannot be downloaded"
    s.close()

  def RetrFile(self,name, sock):
        fName = sock.recv(1024)
        
        filename = ntpath.basename(fName)
        

        
        sub_dir = ''
        directoryArray = fName.split('/')
        
        directoryLen= len(directoryArray)
        size = 0
        while size < directoryLen - 1:
               sub_dir +=  directoryArray[size] + '/'
               size = size+1
        
        
        
              
                              
        filefoundBit = 0

        filepath = os.path.join(sub_dir, filename)
        if os.path.isfile(filepath):
              filefoundBit = 1
              fileSize = os.path.getsize(filepath)
               

                      

       
        
        if filefoundBit:
            sock.send("EXISTS " + repr(fileSize))
            userResponse = sock.recv(1024)
            if userResponse[:2] == 'OK':
                
               
                
                
                with open(filepath, "rb") as f:
                    
                    bytesToSend = f.read()
                    
                    sock.send(bytesToSend)
                    while bytesToSend != "":
                        bytesToSend = f.read()
                        sock.send(bytesToSend)
                        
        else:
            sock.send("ERR")
        print ' File transfer complete! '
        sock.close()
  
      
      


    
  #after retrieve
        
  def search_button(self):
        var = self.receivedChats.get(0, END)
        var1 = self.browseField.get()
        a=[str(x) for x in var]
        #print a
        for j in a:
          b = j.strip()
          c = ntpath.basename(b)
          if var1 == c:
              print c
              print "success"
              print "file found"
        self.receivedChats.curselection()
             

    

   #end of code
 
  def removeClient(self, clientsoc, clientaddr):
      print self.allClients
      self.friends.delete(self.allClients[clientsoc])
      del self.allClients[clientsoc]
      print self.allClients
  
  def setStatus(self, msg):
    self.statusLabel.config(text=msg)
    print msg
      
def main():  
  root = Tk()
  app = ChatClient(root)
  root.mainloop()  

if __name__ == '__main__':
  main()
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               import os

sub_dir = ''
str = 'C://Users/Patel/Desktop/testText.txt'
directoryArray = str.split('/')
directoryLen= len(directoryArray)
size = 0
while size < directoryLen - 1:
       sub_dir +=  directoryArray[size] + '/'
       size = size+1
print sub_dir                              
              
                              
filefoundBit = 0
fileSize = 0

print "last name " , directoryArray[len(directoryArray) - 1]

for filename in os.listdir(sub_dir):
       print "file " , os.path.join(sub_dir, filename)
       if os.path.isfile(sub_dir + filename):
              filefoundBit = 1
              fileSize = os.path.getsize(os.path.join(sub_dir, filename))

print filefoundBit
print fileSize

for filename in os.listdir(sub_dir):
       with open(sub_dir+filename, "r") as f:
              print "ok done"
              bytesToSend = f.readlines()
              for byteInfo in bytesToSend:
                     print byteInfo.decode('hex')
              while bytesToSend != "":
                     bytesToSend = f.readlines()
                     for byteInfo in bytesToSend:
                            print byteInfo.decode('hex')
              f.close()              
                     
          