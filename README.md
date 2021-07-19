
## How to start the app

Pretty simple as any react app, just enter the root project folder and run **npm install**, after that run **npm start**. I will provide you with a .env file, you can check how it should look like in .[EXAMPLE]env file.

## Technologies
- Javascript  
- React (redux, router)
- Firebase Realtime Database
- Firebase Authentication

## Styling
- CSS  
- Material UI

## Info
I wanted to finish all the tasks that you have given me, also the bonus ones.  
I was using firebase for the first time so it took me a little more time to finish the app.  
I needed to understand concepts of firebase backend and database, such as authentification,  
database rules, using web app as an object in code etc... But I succeeded in the end...

Real-time Database isn't that rich with its query options, for example you can't make robust pagination (if I used firebase  
pagination option I could only make next/back pagination, not page-based pagination), also you can't search by more than one property (so you need to make 3 queries on database for Lastname, name and email, than merge it to display data) etc...  

So I had 2 options, either use Firestore database (which I think has more robust options) or make filtering and sorting data on the client.  
I choose the former option, thinking that in that way I can show that I'm able to make these algorithms by myself. If you want, I can make  
another branch doing it with firebase's real-time database.


## Done
[x] Create a layout for the app with header and main area  
[x] Create Login and Signup components  
[x] Make authentification work, login and signup  
[x] Render errors if the email is duplicated, wrong password, etc...  
[x] Make component and form for adding contacts  
[x] Make Calendar work  
[x] Fetch Data and render it  
[x] Make Pagination on client  
[x] Make Sorting  
[x] Make Search on client  
[x] Make editing page (tried reusing AddContact page, but there were too many obstacles using Formik and Yup, I couldn't do it)  
[x] Make details page  
[x] Delete contact functionality  
[x] Update contact functionality  
[x] Add notifications for errors, also for succeded actions for better user experience    
[x] Add add to favorite functionality  
[x] Add /omiljeni route and filter data for that component  
[x] Deploy app on firebase hosting  

## Todo
[ ] Add fallback data to feed (contacts not avaliable)  
[ ] Add loading spiner for fetching data  
[ ] Put filtering data from useHook to some reducer action  
[ ] Refactor Formik on signup and login page to not use useFormik hook because of using same principles (useHook didn't work with calendar)  
[ ] Make animations example slide in contact when created etc...
