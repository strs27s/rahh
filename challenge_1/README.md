# Challenge 1: Insecure Cookie

This challenge demonstrates a common vulnerability where a web application uses a predictable cookie to manage sessions.

## The Vulnerability

The application sets a cookie `userId` with a simple, predictable integer value (e.g., 1, 2, 3) when a user logs in. An attacker can exploit this by manipulating the cookie value in their browser to impersonate other users and access their private information.

## How to Run

1.  Navigate to the `challenge_1` directory.
2.  Install the dependencies: `npm install`
3.  Start the server: `npm start`
4.  Open your browser and go to `http://localhost:3000`.

## Your Mission

1.  Login to the application as `user1`. The password can be anything.
2.  You will be redirected to your profile page, where you can see your name and a secret message.
3.  Your goal is to view the profile of `user2`.
4.  To do this, you will need to use your browser's developer tools to inspect and modify the cookies for the page. Find the `userId` cookie and change its value to `2`.
5.  Refresh the page. You should now see the profile of `user2`.

This challenge teaches you that session identifiers should be long, random, and unpredictable to prevent session hijacking attacks.
