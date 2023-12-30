make default arrays for docArray, picArray, binArray(empty), deskArray;

docArray can create, remove, sort
picArray can remove, sort
deskArray can sort only

binArray gains the removed objects, then can delete them

every create/remove/delete/sort calls the render of the current page

removing doesnt render recycle because you wont be in recycle at the time only 1 explorer can be open 

restoring can only be done inside recycle bin explorer so it saves the double rendering aswell

opening explorer/recycle shows the explorer window first then renders the appropriate file

because of this each file needs an ID that pretty much goes active/inactive, closing explorer sets all to inactive