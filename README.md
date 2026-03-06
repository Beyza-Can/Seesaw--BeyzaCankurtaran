# Seesaw Simulation Project
LİNK: https://beyza-can.github.io/Seesaw--BeyzaCankurtaran/
YOUTUBE LİNK:https://www.youtube.com/watch?v=84I7YSEKUpo

    Project Overview

    This project is a simple seesaw simulation built with HTML, CSS, and JavaScript. The goal of the project is to simulate the physical behavior of a seesaw by allowing users to add weights and observe how the plank tilts based on torque calculations.

    The application dynamically calculates torque and tilt angle based on the position and weight of objects placed on the seesaw. It also logs the interactions so the user can follow how the system state changes over time.

    Thought Process and Design Decisions

    Before starting the implementation, I reviewed several example projects and other developers' solutions to understand common design approaches for similar simulations. This helped me form an initial idea about the layout and interaction flow of the application.

    For the UI design, I aimed to keep the interface simple and clear so that the user can easily understand the seesaw mechanics. Since I chose not to use Bootstrap or any UI framework, I implemented the layout using pure CSS. This required more manual positioning, especially for elements such as containers and log sections.

    The visual structure of the seesaw was implemented using simple shapes:

    The triangular base/The plank that rotates based on torque

    These parts were relatively straightforward compared to the logic behind the calculations.

    For the JavaScript architecture, I tried to separate responsibilities as much as possible by organizing the code around key behaviors such as:

    Adding weights,Calculating torque,Updating the seesaw angle,Updating the UI

    Since I had been away from coding for a while, I spent time planning which variables and functions should be defined first and how functions should interact with each other.

    One of the features I implemented was the use of the mousemove event, which allowed me to determine the exact position. This helped calculate where the weight should be placed on the plank.

    Trade-offs and Limitations

    There were several challenges during development:

    1)CSS Layout Challenges

    Because I couldnt use Bootstrap, positioning UI elements such as containers and log sections required more manual adjustments. I also encountered difficulties when trying to properly format and split text inside the log component.

    State Update Logic

    The most challenging part of the project was the update logic, where multiple values needed to be recalculated every time a new weight was added. This included:

    Calculating torques,Updating the tilt angle,Refreshing the UI,Updating logs

    The function responsible for updating the state became the largest and most complex part of the code.

    Variable Scope Issues

    Initially, I defined several constants at the top level of the script. However, I later discovered that some functions required their own scoped variables. Reusing global values in different update functions caused unexpected errors and debugging issues. To solve this, some values were redefined inside specific functions using let or const.

    Code Structure Considerations

    I also considered splitting the JavaScript into smaller files to keep the code cleaner and more modular. However, since the task requirements did not explicitly demand it and time was limited, I decided to keep the implementation within a single file.

    AI Assistance

    AI tools were used during development primarily as a learning and support resource.

    Since I had been away from programming for some time, I occasionally asked AI for guidance on:
    This README.md file

    Structuring functions

    Deciding which parts of the logic should be implemented first

    Troubleshooting errors

    Clarifying JavaScript behaviors

    AI assistance was especially helpful while implementing the weight-adding logic and the main update function, which recalculates and updates almost the entire simulation state.


    Development Approach

    To maintain clarity during development, I tried to:

    Make small and frequent commits/Implement functionality step by step instead of building everything at once

    This helped keep the development process manageable despite some of the challenges encountered.
