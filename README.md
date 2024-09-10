# Popular Movies Library

## Overview

This project is a simple movie library application built with Next.js. It allows users to discover popular movies, view details, and read reviews. The application utilizes various modern web technologies and libraries to provide a seamless user experience.

## Features

- **Movie Discovery**: Browse through a list of popular movies.
- **Movie Details**: View detailed information about each movie, including ratings, release dates, and cast.
- **User Reviews**: Read and view user reviews for each movie.
- **Search Functionality**: Search for movies by title.

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/onecuriousmindset/popular-movies-library.git
   ```

2. Navigate to the project directory:

   ```bash
   cd popular-movies-library
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

4. Set up environment variables. Create a `.env.local` file in the root directory and add the following:

   ```plaintext
   NEXT_PUBLIC_API_URL=https://api.themoviedb.org/3
   NEXT_PUBLIC_MOVIE_DB_API_KEY=your_api_key
   NEXT_PUBLIC_MOVIE_IMAGE_URL=https://media.themoviedb.org/t/p/w440_and_h660_face
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

   or

   ```bash
   yarn dev
   ```

6. Open your browser and navigate to `http://localhost:3000`.

## Usage

- Use the search bar to find movies by title.
- Click on a movie card to view more details, including reviews and cast information.
- Sort movies based on popularity, rating, etc.
