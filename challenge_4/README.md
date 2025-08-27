# Challenge 4: Cross-Site Request Forgery (CSRF)

This challenge demonstrates a Cross-Site Request Forgery (CSRF) vulnerability. CSRF is a type of web security vulnerability that tricks a user into performing an unwanted action in an application where they are currently logged in.

## The Security Principle

Web applications that use session cookies to authenticate users can be vulnerable to CSRF. If a sensitive action (like changing an email or password) is handled by an endpoint that only validates the session cookie, an attacker can create a webpage on a different domain that sends a request to that endpoint. If a logged-in user visits the attacker's page, their browser will automatically include the session cookie with the request, and the server will treat the request as legitimate. The standard defense is to use anti-CSRF tokens.

## How to Run the Application

1.  Navigate to the `challenge_4` directory.
2.  Install the dependencies: `npm install`
3.  Start the server: `npm start`
4.  The vulnerable application will be running at `http://localhost:3002`.

## Your Objective: Security Assessment

Your task is to demonstrate the CSRF vulnerability by changing the user's email address without their direct interaction on the settings page.

1.  **Login to the Application**: Open a browser tab and navigate to `http://localhost:3002`. Click the "Login" button. You will be redirected to the settings page. Note that your email is `user@example.com`.
2.  **Open the Proof-of-Concept Page**: In a **new browser tab**, open the proof-of-concept file located at `challenge_4/poc_page/index.html`. (You can open this file directly in your browser).
3.  **Observe the Result**: The proof-of-concept page will automatically send a hidden request to the vulnerable application.
4.  **Verify the Change**: Go back to your first tab (the one with the settings page at `http://localhost:3002`) and refresh the page. You should see that your email address has been changed to `hacked@example.com`.

This exercise shows how an application can be manipulated by a request from an external source if proper CSRF protections are not in place.
