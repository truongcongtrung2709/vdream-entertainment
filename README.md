# VDream-entertainment


Welcome to VDream-entertainment! This is a Next.js project that utilizes environment variables to call APIs.


## Getting Started


To get started with this project, follow these steps:


1. Clone the repository to your local machine:
   

   `
   git clone https://github.com/truongcongtrung2709/vdream-entertainment.git
   `


3. Navigate into the project directory:
   

  `cd vdream-entertainment`



3.Create a .env file in the root of the project based on the provided .env.example. Replace the placeholder values with your actual API keys and other environment variables.


  .env file:


    # HOST
    NEXT_PUBLIC_HOST_API=https://vdreamentertainment.com
    
    # ASSETS
    NEXT_PUBLIC_ASSETS_API=https://api-dev-minimal-v510.vercel.app



4. Install dependencies using npm or yarn:


   `npm run dev`


  # or


   `yarn dev`


5. Open http://localhost:8082 in your browser to view the project.


## Building for Production

#To build the project for production, run the following command:


  `npm run build`
  

  # or
  

  `yarn build`
  
  
## Deploying to Production
  # Once the project is built, you can deploy it to your production environment. Here are the general steps:
  
  
    Configure your production environment with the necessary environment variables, similar to how you did for the development environment.
  
    Serve the built project using a suitable web server. You can use tools like Vercel, Netlify, or host it on your own server.
  
    Make sure to set up continuous deployment (if available) to automatically deploy updates when changes are pushed to your repository.
    
  
  # For more detailed instructions on deploying with specific platforms, refer to their documentation.
  
## Contributing

  Contributions are welcome! If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request.
