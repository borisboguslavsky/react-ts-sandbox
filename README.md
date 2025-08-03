# Overview

This repo is collection of [React](https://github.com/facebook/react) applets written in [TypeScript](https://github.com/microsoft/TypeScript), using [material-ui](https://github.com/mui/material-ui) as a component library.

I use this repo as a sandbox environment to try out libraries, self-imposed coding challenges, and to familiarize myself with various of React+Typescript development.

# Live Demo

https://borisboguslavsky.github.io/react-ts-sandbox/

# Components

| Component               | Description                                                                                                                                                                               |
| :---------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Probability Editor      | A probability curve editor and visualizer, with a random number generator that adheres to the configured curve.                                                                           |
| X-State Vending Machine | A vending machine simulator that implements a state machine using [X-State](https://github.com/statelyai/xstate)                                                                          |
| Calculator              | A basic calculator app where users can add, subtract, multiply, and divide two numbers.                                                                                                   |
| TanStack Query          | A from that uses [TanStack Query](https://github.com/TanStack/query) to fetch data from the [swapi.info](https://swapi.info/) REST API and outputs the result.                            |
| React Hook Form         | A from that uses [React Hook Form](https://react-hook-form.com/) for state management, validation, and submission.                                                                        |
| Stopwatch               | A stopwatch component where users can pause/resume the timer and record lap times.                                                                                                        |
| ToDo List               | A basic ToDo list component where users can add and remove items to the list.                                                                                                             |
| Mock Login              | A login form with basic validation that sends a request to [JSON Placeholder](https://jsonplaceholder.typicode.com/) if the form is valid and outputs the response in the textarea below. |
| Context                 | A component with a nested child component that utilizes the useContext() hook to access/update app-wide state via a custom Provider component.                                            |
| Reducer                 | A series of text input fields that utilize the useReducer() hook to execute actions across all of them.                                                                                   |
