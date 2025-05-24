# Test for Frontend applicants

### Background

This repository contains my solution to the frontend developer test provided by Smart Management AS. The application accesses resources through their provided API, allowing authenticated users to retrieve information about items linked to specific projects, with the ability to view related events for each item.

### Architecture

The application is built with React, using a component-based structure to separate concerns and organize functionality. The main entry point is the `Start` component, which manages user access starting with the `Login` component. After login, different types of information are displayed through dedicated components: `ProjectList`, `ItemList`, and `EventList`.