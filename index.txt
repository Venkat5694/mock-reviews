#! /usr/bin/env node

'use strict';


// data structs
let users = {};
let movies = {};
let years = {};
let genres = {};

// helpers
const isValidUser = (user) => {
        if(users[user]) {
            return true;
        }
        else {
            return false;
        }
};

const isValidMovie = (title, year) => {

        let title_entity = movies[title];
        if(title_entity) {
            if(title_entity[year]) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
}
const isValidReview = (user, title, year) => {
    let unique_title = movies[title];
    let movie_exists = 0;
    if (unique_title) {
        Object.keys(unique_title).forEach(entry => {
            if( entry === year ) {
                movie_exists = 1;
            }
        })
        if(movie_exists) {
            let reviews = unique_title[year].reviews;
            if(!reviews.length) {
                return true;
            }
            reviews.forEach(review => {
                if (review === user) {
                    return false;
                }
            });
        }
    }
    else {
        return false;
    }
};

const isCritic = (user) => {

};

const getMovie = (title, year) => {
    let movie_info= {
        'title':title,
        'year': year,
        'info': movies,
    }
    return movie_info;
}

// Drivers
const addMovie = (title, year, genre) => {
        title.trim();
        if(!title.length) {
            console.log('Title cannot be empty.');
        }
        else if(year.length !== 4 || !( parseInt(year) < 9999 && parseInt(year) > 0 )) {
            console.log('Year must be of the format YYYY.');
        }
        else {
            if(isValidMovie(title, year)) {
                console.log('Movie already exists.');
            }
            else {
                let info = {
                    rating: 0,
                    criticrating: 0,
                    reviews: [],
                    genre: genre,
                };
                if (!movies[title]) {
                    movies[title] = {};
                }
                movies[title][year] = info;
                genre.forEach(topic => {
                    if(!genres[topic]) {
                        genres[topic] = [];
                    }
                    genres[topic].push({title: title, year: year});
                });
                if(!years[year]) {
                    years[year] = [];
                }
                years[year].push({title: title});
                console.log(title);
            }
        }
};

const addUser = (name) => {
        if(isValidUser(name)) {
            console.log('User already exists.');
        }
        else {
                users[name] = 0;
                console.log('User ' + name + ' has been succesfully created');
        }
};

const addReview = (user, title, year, rating) => {
    if(isValidReview(user, title, year)) {
        if (users[user] >= 3 ) {
            rating *= 2;
            movies[title][year].criticrating += rating;
        }
        movies[title][year].rating += rating;
        movies[title][year].reviews.push(user);
        users[user] = users[user] + 1;
        console.log('\nSuccessfully added review by user ', user, ' for ', title, year, 'with rating ', rating);
    }
    else {
        console.log('Multiple reviews not allowed');
    }
};

const top_in_genre = (genre, critic) => {
    let all_movies = genres[genre];
    if(critic) {
        all_movies.sort((a, b) => { return movies[b.title][b.year].criticrating ||  - movies[a.title][a.year].criticrating});
    }
    else {
        all_movies.sort((a, b) => { return movies[b.title][b.year].rating - movies[a.title][a.year].rating});
    }
    all_movies.forEach(mov => {
        mov.criticrating = movies[mov.title][mov.year].criticrating;
        mov.rating = movies[mov.title][mov.year].rating;
    })
    console.log(all_movies);
}

const top_in_year = (year, critic) => {
    let all_movies = years[year];
    if(critic) {
        all_movies.sort((a, b) => { return movies[b.title][year].criticrating ||  - movies[a.title][year].criticrating});
    }
    else {
        all_movies.sort((a, b) => { return movies[b.title][year].rating - movies[a.title][year].rating});
    }
    all_movies.forEach(mov => {
        mov.criticrating = movies[mov.title][year].criticrating;
        mov.rating = movies[mov.title][year].rating;
        mov.year = year;
    })
    console.log(all_movies);
}

module.exports = {
    addUser: addUser,
    addMovie: addMovie,
    addReview: addReview,
};


addUser('abc');
addMovie('', '2006', ['Comedy']);
addUser('def');
addUser('abc');
console.log('\n\n');
addMovie('Don', '2006', ['Comedy']);
addMovie('Don', '2012', ['Comedy']);
addMovie('LunchBox', '2010', ['Drama']);
addMovie('Metro', '2008', ['Drama', 'Horror']);
addMovie('PK', '2010', ['Drama', 'Horror']);
console.log('\n\n');
addReview('abc', 'Don', '2006', 5);
addReview('abc', 'Don', '2006', 5);
addReview('abc', 'Don', '2012', 6);
addReview('abc', 'LunchBox', '2010', 4);
addReview('abc', 'Metro', '2008', 9);
addReview('abc', 'PK', '2010', 9);
console.log('\n\n');
addMovie('Don', '2006', ['Comedy']);
console.log('\n\n');
top_in_genre('Drama', false);
console.log('\n\n');
top_in_genre('Comedy', true);
console.log('\n\n');
top_in_year('2010', false);
console.log('\n\n');
console.log(users);
console.log(movies);
console.log(genres);
