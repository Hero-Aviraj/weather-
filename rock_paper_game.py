import random
you=input("enter your choice between[R,P,S]").lower()
comp=random.choice([1,2,3])
comp={'r':1,'p':2,'s':3}
if(comp==you):
    print("GAME IS DRAW")
elif(comp=='r'and you=="p"):
    print("YOU WINN")
elif(comp=='p'and you=='s'):
    print("YOU WINN")
elif(comp=='s'and you=='r'):  
    print("YOU WINN")
elif(comp=='s'and you=="p"):
    print("oponent winn")
elif(comp=='p'and you=='r'):
    print("opponent WINN")
elif(comp=='r'and you=='s'):  
    print("opponent WINN")  
else:
    print("somthing is wrong")                