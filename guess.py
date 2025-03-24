import random
comp=random.randint(1,100)
count=1
while(True):
    count+=1
    you=int(input("enter your choice"))
    if (you==comp):
       print(f"GAME OVER IN {count} STEP")
       break
    elif(you>comp):
        print("lower number please")
    elif(you<comp):
        print("higher number please")
    else:
        print("somthing wrong")
print(f"COMPUTER COSEN {comp}")