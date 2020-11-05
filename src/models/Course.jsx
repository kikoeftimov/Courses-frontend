import {Category} from "./Category";
import {Author} from './Author';

export class Course{
    
    id: number;

    name: string;

    description: string;

    price: float;

    category: Category;

    imageBase64: string;

    author: Author;
}