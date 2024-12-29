# DripTrack - Wardrobe Manager (Work in Progress)
<img src="frontend/src/assets/logo.png" height="100" />

## The Problem
So, Most of us have too many clothes, and often we don’t know what we’ve worn recently or what we should wear next. A good wardrobe manager could help organize everything better, track usage, and even suggest how to optimize it based on wear frequency.

## The Solution

I'm building a **full-stack MERN application** to solve this problem. The app will let users upload their clothes, categorize them, track how often they wear items, and sort everything based on how often it's worn. It should be easy to navigate with categories like "shirts," "pants," and "winter wear" in separate tabs.

### Key Features I'm Working On:

#### 1. **User Login (Authentication)**    `Status:Completed` 
   - **Problem**: I need to make sure users can log in and their data is safe.
   - **Solution**: Implement a secure login system with **JWT tokens** to manage user sessions. This way, each user’s wardrobe data is separate.
   - **Next steps**: Set up signup/login forms and connect them to an authentication system in the backend.

   ![Auth Screenshot](./Demo/Auth.png)  

#### 2. **Wardrobe Management (Adding Items)** `Status:Completed` 
   - **Problem**: Users need to upload their clothes and categorize them.
   - **Solution**: Provide a form where users can upload photos and manually assign categories like “shirts,” “pants,” and more.
   - **Next steps**: Build an upload form, connect it to a backend API that stores these images, and organize them into categories.

![Upload Screenshot](./Demo/Upload.png)  

![Upload Screenshot](./Demo/closet.png)  

#### 3. **Usage Tracking** `Status:Completed` 
   - **Problem**: How do users keep track of how often they wear an item?
   - **Solution**: Create a button that allows users to mark when they wear an item, which increments a counter for that item’s usage.
   - **Next steps**: Implement the usage tracking button and make sure the count updates in the database every time an item is worn.

   

   <img src="./Demo/count.png" height="200" />

#### 4. **Sorting by Usage** `Status:Completed` 
   - **Problem**: How can users see which items they wear the most or least?
   - **Solution**: Add sorting functionality that allows users to sort their wardrobe items by usage (ascending/descending).
   - **Next steps**: Create a dropdown to select the sort option, and fetch the sorted data from the backend.

 ![Upload Screenshot](./Demo/sort.png)
   

## Tech Stack

- **Frontend**: 
  - **React.js** 
  - **Vite** 
  - **Tailwind CSS** 

- **Backend**:
  - **Node.js** 
  - **Express.js** 
  - **MongoDB** 



## Challenges I Faced

1. **Managing Image Uploads**: Figuring out how to handle image uploads securely and efficiently.
2. **Real-Time Updates**: Keeping the wardrobe data up-to-date with real-time usage tracking.
3. **Mobile Responsiveness**: Ensuring the app looks good on all devices (mobile-first design with Tailwind).


### End Goal
To have a simple but effective wardrobe management app that helps people keep their clothes organized and track what they wear the most. Eventually, I might even add AI to recommend outfits based on what you wear most often.

Stay tuned! 🚀
