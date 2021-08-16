import {cover1, cover2, cover3, cover4, cover5} from '../images/images';

export default class BookstoreService {

    data = [
            {   id: 0,
                title: "Lord of the Rings",
                author: "J.R.R. Tolkien",
                price: 25,
                genre: "fantasy",
                coverImage: cover1 
            },
            {
                id: 1,
                title: "Oliver Twist",
                author: "Charles Dickens",
                price: 12,
                genre: "criminal",
                coverImage: cover2
            },
            {
                id: 2,
                title: "Utopia",
                author: "Tomas Moore",
                price: 14,
                genre: "fantasy/novela",
                coverImage: cover3
            },
            {
                id: 3,
                title: "Holy Bible",
                author: "Moses",
                price: 32,
                genre: "legend",
                coverImage: cover4
            },
            {
                id: 4,
                title: "20000 under the sea",
                author: "Jules Verne",
                price: 17,
                genre: "science fiction",
                coverImage: cover5
            }
        ]

        getBooks() {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(this.data);
                }, 1000);
            })
        }        
}